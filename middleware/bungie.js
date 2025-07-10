const axios = require('axios');

const BUNGIE_API_ROOT = 'https://www.bungie.net/Platform';
const TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token/';

// Axios instance for Bungie API
const bungieApi = axios.create({
    baseURL: BUNGIE_API_ROOT,
    headers: {
        'X-API-Key': process.env.BUNGIE_API_KEY
    }
});

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (!req.session.tokens || !req.session.tokens.access_token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    
    // Check if token is expired
    if (req.session.tokens.expires_at < Date.now()) {
        // Try to refresh token
        return refreshAccessToken(req, res, next);
    }
    
    next();
}

// Refresh access token
async function refreshAccessToken(req, res, next) {
    if (!req.session.tokens || !req.session.tokens.refresh_token) {
        return res.status(401).json({ error: 'No refresh token available' });
    }
    
    try {
        const response = await axios.post(
            TOKEN_URL,
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: req.session.tokens.refresh_token,
                client_id: process.env.BUNGIE_CLIENT_ID,
                client_secret: process.env.BUNGIE_CLIENT_SECRET
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-Key': process.env.BUNGIE_API_KEY
                }
            }
        );
        
        const { access_token, refresh_token, expires_in } = response.data;
        
        // Update tokens in session
        req.session.tokens = {
            ...req.session.tokens,
            access_token,
            refresh_token,
            expires_at: Date.now() + (expires_in * 1000)
        };
        
        next();
        
    } catch (error) {
        console.error('Token refresh error:', error.response?.data || error.message);
        return res.status(401).json({ error: 'Failed to refresh token' });
    }
}

// Make authenticated API request
async function makeApiRequest(endpoint, options = {}) {
    const { session, method = 'GET', data = null, params = {} } = options;
    
    if (!session || !session.tokens) {
        throw new Error('No authentication session');
    }
    
    try {
        const response = await bungieApi({
            url: endpoint,
            method: method,
            headers: {
                'Authorization': `Bearer ${session.tokens.access_token}`
            },
            data: data,
            params: params
        });
        
        // Check for Bungie API errors
        if (response.data.ErrorCode !== 1) {
            throw new Error(response.data.Message || 'Bungie API error');
        }
        
        return response.data.Response;
        
    } catch (error) {
        // Handle specific Bungie error codes
        if (error.response) {
            const errorCode = error.response.data?.ErrorCode;
            const errorMessage = error.response.data?.Message;
            
            switch (errorCode) {
                case 99: // WebAuthRequired
                case 401: // Unauthorized
                    throw new Error('Authentication required');
                case 1665: // PrivacyRestriction
                    throw new Error('Privacy settings prevent access');
                case 1601: // DestinyAccountNotFound
                    throw new Error('Destiny account not found');
                case 1652: // DestinyUnexpectedError
                    throw new Error('Unexpected Destiny error');
                default:
                    throw new Error(errorMessage || `Bungie API error: ${errorCode}`);
            }
        }
        
        throw error;
    }
}

// Rate limiting for API requests
const rateLimitDelay = 100; // ms between requests
let lastRequestTime = 0;

async function rateLimitedApiRequest(endpoint, options) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < rateLimitDelay) {
        await new Promise(resolve => setTimeout(resolve, rateLimitDelay - timeSinceLastRequest));
    }
    
    lastRequestTime = Date.now();
    return makeApiRequest(endpoint, options);
}

// Get item instance details
async function getItemInstance(itemInstanceId, session) {
    return makeApiRequest(
        `/Destiny2/ItemInstance/${itemInstanceId}/`,
        { session }
    );
}

// Get profile with components
async function getProfile(membershipType, membershipId, components, session) {
    return makeApiRequest(
        `/Destiny2/${membershipType}/Profile/${membershipId}/`,
        { 
            params: { components },
            session 
        }
    );
}

// Get character with components
async function getCharacter(membershipType, membershipId, characterId, components, session) {
    return makeApiRequest(
        `/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/`,
        { 
            params: { components },
            session 
        }
    );
}

module.exports = {
    ensureAuthenticated,
    makeApiRequest,
    rateLimitedApiRequest,
    getItemInstance,
    getProfile,
    getCharacter
};