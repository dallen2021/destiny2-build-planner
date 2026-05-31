const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const manifestRoutes = require("./routes/manifest");

// Import services
const { updateManifest } = require("./services/manifestService");

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3000;
const sessionSecret =
  process.env.SESSION_SECRET || "temporary-session-secret-change-me";
const sessionStore = process.env.MONGODB_URI
  ? MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 24 * 60 * 60, // 24 hours
    })
  : undefined;

if (!process.env.SESSION_SECRET) {
  console.warn("SESSION_SECRET is not set; using a temporary fallback secret.");
}

if (!process.env.MONGODB_URI) {
  console.warn(
    "MONGODB_URI is not set; using the default in-memory session store."
  );
}

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
        ],
        scriptSrcAttr: ["'unsafe-inline'"], // ADD THIS LINE
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "https://www.bungie.net", "data:"],
        connectSrc: ["'self'", "https://www.bungie.net"],
      },
    },
  })
);

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // stricter limit for auth endpoints
  skipSuccessfulRequests: true,
});

app.use("/api/", limiter);
app.use("/auth/", authLimiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    ...(sessionStore && { store: sessionStore }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// API Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/manifest", manifestRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: require("./package.json").version,
  });
});

// Metrics endpoint (optional)
app.get("/metrics", (req, res) => {
  res.json({
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    pid: process.pid,
    versions: process.versions,
  });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));

  // Catch all handler
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Don't leak error details in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong!"
      : err.message;

  res.status(err.status || 500).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

async function startServer() {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);

    // Update manifest on startup for local/server deployments. Vercel imports
    // the app as a function, so avoid long startup work there.
    try {
      console.log("Checking for manifest updates...");
      await updateManifest();
    } catch (error) {
      console.error("Failed to update manifest on startup:", error);
    }

    // Schedule manifest updates every 6 hours
    setInterval(
      async () => {
        try {
          console.log("Checking for manifest updates...");
          await updateManifest();
        } catch (error) {
          console.error("Failed to update manifest:", error);
        }
      },
      6 * 60 * 60 * 1000
    );
  });
}

if (require.main === module) {
  startServer();
}

module.exports = app;
