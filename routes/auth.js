const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const router = express.Router();

// Bungie OAuth endpoints
const BUNGIE_AUTH_URL = "https://www.bungie.net/en/OAuth/Authorize";
const BUNGIE_TOKEN_URL = "https://www.bungie.net/platform/app/oauth/token/";

// Generate state for CSRF protection
function generateState() {
  return crypto.randomBytes(32).toString("hex");
}

// OAuth login route
router.get("/login", (req, res) => {
  const state = generateState();
  req.session.oauthState = state;

  const params = new URLSearchParams({
    client_id: process.env.BUNGIE_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.OAUTH_REDIRECT_URI,
    state: state,
  });

  const finalRedirectUrl = `${BUNGIE_AUTH_URL}?${params.toString()}`;

  res.redirect(finalRedirectUrl);
});

// OAuth callback route
router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  // Verify state for CSRF protection
  if (!state || state !== req.session.oauthState) {
    return res.status(400).json({ error: "Invalid state parameter" });
  }

  // Clear the state from session
  delete req.session.oauthState;

  if (!code) {
    return res.status(400).json({ error: "No authorization code provided" });
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post(
      BUNGIE_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.BUNGIE_CLIENT_ID,
        client_secret: process.env.BUNGIE_CLIENT_SECRET,
        redirect_uri: process.env.OAUTH_REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-API-Key": process.env.BUNGIE_API_KEY,
        },
      }
    );

    const { access_token, refresh_token, expires_in, membership_id } =
      tokenResponse.data;

    // Store tokens in session
    req.session.tokens = {
      access_token,
      refresh_token,
      expires_at: Date.now() + expires_in * 1000,
      membership_id,
    };

    // Get user info
    const userResponse = await axios.get(
      "https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "X-API-Key": process.env.BUNGIE_API_KEY,
        },
      }
    );

    req.session.user = userResponse.data.Response;
    const bungieNetUser = req.session.user.bungieNetUser;

    // --- START: MODIFIED BLOCK ---
    // Construct the definitive Bungie display name from the bungieNetUser object
    const bungieName =
      bungieNetUser.bungieGlobalDisplayName || bungieNetUser.displayName;
    const bungieCode = bungieNetUser.bungieGlobalDisplayNameCode;
    const fullBungieName = bungieCode
      ? `${bungieName}#${bungieCode}`
      : bungieName;

    // Find primary Destiny membership
    const destinyMemberships = req.session.user.destinyMemberships;
    if (destinyMemberships && destinyMemberships.length > 0) {
      // Prefer the membership with a crossSaveOverride or the primary one
      const primaryMembership =
        destinyMemberships.find(
          (m) => m.membershipId === req.session.user.primaryMembershipId
        ) || destinyMemberships[0];

      req.session.destinyMembership = {
        membershipType: primaryMembership.membershipType,
        membershipId: primaryMembership.membershipId,
        displayName: fullBungieName, // Use the correctly constructed Bungie name
      };
    }
    // --- END: MODIFIED BLOCK ---

    // Redirect to success page
    res.redirect(process.env.CLIENT_URL + "?auth=success");
  } catch (error) {
    console.error(
      "OAuth callback error:",
      error.response?.data || error.message
    );
    res.redirect(process.env.CLIENT_URL + "?auth=error");
  }
});

// Refresh token route
router.post("/refresh", async (req, res) => {
  if (!req.session.tokens || !req.session.tokens.refresh_token) {
    return res.status(401).json({ error: "No refresh token available" });
  }

  try {
    const response = await axios.post(
      BUNGIE_TOKEN_URL,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: req.session.tokens.refresh_token,
        client_id: process.env.BUNGIE_CLIENT_ID,
        client_secret: process.env.BUNGIE_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-API-Key": process.env.BUNGIE_API_KEY,
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Update tokens in session
    req.session.tokens = {
      ...req.session.tokens,
      access_token,
      refresh_token,
      expires_at: Date.now() + expires_in * 1000,
    };

    res.json({ success: true });
  } catch (error) {
    console.error(
      "Token refresh error:",
      error.response?.data || error.message
    );
    res.status(401).json({ error: "Failed to refresh token" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ success: true });
  });
});

// Get current user info
router.get("/user", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  res.json({
    user: req.session.user,
    destinyMembership: req.session.destinyMembership || null,
  });
});

// Check authentication status
router.get("/status", (req, res) => {
  const isAuthenticated = !!(
    req.session.tokens && req.session.tokens.access_token
  );
  const tokenExpired =
    isAuthenticated && req.session.tokens.expires_at < Date.now();

  res.json({
    authenticated: isAuthenticated && !tokenExpired,
    user: req.session.user || null,
    destinyMembership: req.session.destinyMembership || null,
  });
});

module.exports = router;
