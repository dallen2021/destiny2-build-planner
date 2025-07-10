# Destiny 2 Build Planner - Production Setup Guide

This is a production-ready Destiny 2 Build Planner with full Bungie API integration, similar to Destiny Item Manager.

## Features

- ✅ Secure OAuth 2.0 authentication with Bungie.net
- ✅ Real-time inventory loading from your Destiny 2 account
- ✅ Automatic manifest updates with SQLite caching
- ✅ Server-side API proxy for security
- ✅ Session management with MongoDB
- ✅ Rate limiting and security headers
- ✅ Docker support for easy deployment
- ✅ Production-ready error handling

## Prerequisites

- Node.js 18+ (or Docker)
- MongoDB (or Docker)
- A registered Bungie.net application
- SSL certificate (for production)

## Quick Start

### 1. Register a Bungie Application

1. Go to [https://www.bungie.net/en/Application](https://www.bungie.net/en/Application)
2. Create a new application
3. Set the OAuth redirect URL to: `https://your-domain.com/auth/callback`
4. Note down:
   - API Key
   - OAuth Client ID
   - OAuth Client Secret

### 2. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd destiny2-build-planner

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
nano .env
```

### 3. Configure Environment

Edit `.env` file:

```env
# Required configurations
NODE_ENV=production
PORT=3000
CLIENT_URL=https://your-domain.com
MONGODB_URI=mongodb://localhost:27017/d2-builder
SESSION_SECRET=generate-a-long-random-string-here
BUNGIE_API_KEY=your-api-key
BUNGIE_CLIENT_ID=your-client-id
BUNGIE_CLIENT_SECRET=your-client-secret
OAUTH_REDIRECT_URI=https://your-domain.com/auth/callback
ADMIN_API_KEY=generate-another-random-string
```

### 4. Build Frontend

Place the production HTML file in the `public` directory:

```bash
mkdir -p public/js
# Copy the provided index.html to public/
# Copy the api.js to public/js/
```

### 5. Start the Application

#### Option A: Using Node.js directly

```bash
# Development
npm run dev

# Production
npm start
```

#### Option B: Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Production Deployment

### 1. Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up -d
```

This will start:
- Node.js application server
- MongoDB for session storage
- Nginx reverse proxy (optional)

### 2. Manual Deployment

#### Install PM2 for process management:

```bash
npm install -g pm2

# Start the application
pm2 start server.js --name d2-builder

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Configure Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. SSL Setup

For production, you must use HTTPS:

```bash
# Using Let's Encrypt with Certbot
sudo certbot --nginx -d your-domain.com
```

## API Endpoints

### Authentication
- `GET /auth/login` - Start OAuth flow
- `GET /auth/callback` - OAuth callback
- `POST /auth/logout` - Logout user
- `GET /auth/status` - Check auth status

### Inventory Management
- `GET /api/inventory` - Get user's inventory
- `GET /api/character/:id` - Get character data
- `POST /api/transfer` - Transfer items
- `POST /api/equip` - Equip items

### Manifest
- `GET /manifest/item/:hash` - Get item definition
- `POST /manifest/items` - Get multiple item definitions
- `GET /manifest/stats` - Get stat definitions
- `GET /manifest/mods/armor` - Get armor mods

## File Structure

```
destiny2-build-planner/
├── server.js              # Main server file
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── api.js            # API proxy routes
│   └── manifest.js       # Manifest data routes
├── services/
│   └── manifestService.js # Manifest management
├── middleware/
│   └── bungie.js         # Bungie API middleware
├── public/
│   ├── index.html        # Main frontend
│   └── js/
│       └── api.js        # Client API service
├── data/
│   └── manifest/         # Manifest cache directory
├── .env                  # Environment variables
├── package.json          # Dependencies
├── Dockerfile            # Docker configuration
└── docker-compose.yml    # Docker Compose config
```

## Security Considerations

1. **Never expose secrets**: All API keys and secrets are server-side only
2. **Use HTTPS**: Required for OAuth and secure cookies
3. **Rate limiting**: Implemented to prevent API abuse
4. **CORS**: Configured to only allow your domain
5. **Session security**: HTTP-only cookies with secure flag
6. **Input validation**: All user inputs are validated

## Monitoring & Maintenance

### Logs

```bash
# View application logs
pm2 logs d2-builder

# Or with Docker
docker-compose logs -f app
```

### Manifest Updates

The manifest updates automatically every 6 hours. To manually update:

```bash
# Using the admin endpoint
curl -X POST https://your-domain.com/manifest/update \
  -H "X-Admin-Key: your-admin-api-key"
```

### Database Backup

```bash
# Backup MongoDB
mongodump --uri="mongodb://localhost:27017/d2-builder" --out=./backup

# Restore
mongorestore --uri="mongodb://localhost:27017/d2-builder" ./backup/d2-builder
```

## Troubleshooting

### Common Issues

1. **"Not authenticated" errors**
   - Check if cookies are enabled
   - Verify OAuth redirect URL matches exactly
   - Ensure HTTPS is working

2. **Manifest download fails**
   - Check disk space
   - Verify Bungie API key is valid
   - Check network connectivity

3. **OAuth callback fails**
   - Verify redirect URI in Bungie app settings
   - Check CLIENT_URL in .env matches your domain
   - Ensure session secret is set

### Debug Mode

Set `NODE_ENV=development` in `.env` for detailed error messages.

## Performance Optimization

1. **Enable caching**: The manifest service caches definitions
2. **Use CDN**: Serve static files through a CDN
3. **Enable compression**: Gzip responses in Nginx
4. **Database indexes**: Ensure MongoDB indexes are created

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Check the [Bungie API documentation](https://bungie-net.github.io/)
- Review server logs for errors
- Ensure all environment variables are set correctly

## Credits

Built with:
- Express.js for the backend
- SQLite for manifest storage
- MongoDB for session management
- Bungie.net API for game data