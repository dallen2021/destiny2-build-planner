# Deployment Checklist

## Pre-Deployment

- [ ] **Bungie Application Setup**
  - [ ] Created application at https://www.bungie.net/en/Application
  - [ ] Noted API Key
  - [ ] Noted OAuth Client ID
  - [ ] Noted OAuth Client Secret
  - [ ] Set correct redirect URL

- [ ] **Server Requirements**
  - [ ] Node.js 18+ installed
  - [ ] MongoDB installed or accessible
  - [ ] Minimum 2GB RAM
  - [ ] 10GB+ disk space for manifest
  - [ ] Domain name configured
  - [ ] SSL certificate obtained

- [ ] **Environment Configuration**
  - [ ] Copied `.env.example` to `.env`
  - [ ] Set all required environment variables
  - [ ] Generated strong SESSION_SECRET (32+ chars)
  - [ ] Generated strong ADMIN_API_KEY
  - [ ] Verified MongoDB connection string
  - [ ] Set correct CLIENT_URL
  - [ ] Set correct OAUTH_REDIRECT_URI

## Deployment Steps

### Option 1: Docker Deployment

- [ ] **Docker Setup**
  ```bash
  docker-compose up -d
  ```
  - [ ] Verified all containers are running
  - [ ] Checked logs for errors
  - [ ] Tested MongoDB connection

### Option 2: Manual Deployment

- [ ] **Application Setup**
  ```bash
  npm install --production
  mkdir -p data/manifest
  chmod 755 data/manifest
  ```

- [ ] **Process Management**
  ```bash
  pm2 start server.js --name d2-builder
  pm2 save
  pm2 startup
  ```

- [ ] **Systemd Service** (Alternative to PM2)
  ```bash
  sudo cp d2-builder.service /etc/systemd/system/
  sudo systemctl daemon-reload
  sudo systemctl enable d2-builder
  sudo systemctl start d2-builder
  ```

## Web Server Configuration

- [ ] **Nginx Setup**
  - [ ] Installed Nginx
  - [ ] Configured SSL certificates
  - [ ] Added server block configuration
  - [ ] Enabled gzip compression
  - [ ] Set up rate limiting
  - [ ] Configured security headers
  - [ ] Tested configuration: `nginx -t`
  - [ ] Reloaded Nginx: `systemctl reload nginx`

- [ ] **SSL/TLS**
  - [ ] Obtained SSL certificate (Let's Encrypt recommended)
  - [ ] Configured automatic renewal
  - [ ] Tested HTTPS access
  - [ ] Verified redirect from HTTP to HTTPS

## Post-Deployment Verification

- [ ] **Application Health**
  - [ ] Access https://your-domain.com/health
  - [ ] Verify response shows "healthy"

- [ ] **Authentication Flow**
  - [ ] Click "Connect to Bungie.net"
  - [ ] Complete OAuth flow
  - [ ] Verify redirect back to application
  - [ ] Check user info displayed

- [ ] **Manifest Download**
  - [ ] Check logs for manifest download
  - [ ] Verify manifest.db exists in data/manifest/
  - [ ] Test item definition endpoint

- [ ] **API Functionality**
  - [ ] Load inventory successfully
  - [ ] Filter armor items
  - [ ] Select and apply armor to build

## Security Checklist

- [ ] **Environment Security**
  - [ ] `.env` file has restricted permissions (600)
  - [ ] No secrets in git repository
  - [ ] All secrets are strong and unique

- [ ] **Network Security**
  - [ ] Firewall configured (only 80/443 open)
  - [ ] MongoDB not exposed externally
  - [ ] Rate limiting active
  - [ ] CORS properly configured

- [ ] **Application Security**
  - [ ] HTTPS enforced
  - [ ] Security headers configured
  - [ ] Session cookies secure flag set
  - [ ] Input validation active

## Monitoring Setup

- [ ] **Logging**
  - [ ] Application logs accessible
  - [ ] Error logs monitored
  - [ ] Access logs configured

- [ ] **Backups**
  - [ ] MongoDB backup scheduled
  - [ ] Backup restoration tested
  - [ ] Off-site backup configured

- [ ] **Monitoring**
  - [ ] Uptime monitoring configured
  - [ ] SSL certificate expiry alerts
  - [ ] Disk space monitoring
  - [ ] Memory usage monitoring

## Performance Optimization

- [ ] **Caching**
  - [ ] Nginx caching enabled for static files
  - [ ] Manifest definitions cached
  - [ ] CDN configured (optional)

- [ ] **Database**
  - [ ] MongoDB indexes created
  - [ ] Connection pooling configured

## Troubleshooting Commands

```bash
# Check application status
pm2 status
pm2 logs d2-builder

# Check system services
systemctl status d2-builder
systemctl status nginx
systemctl status mongod

# View logs
journalctl -u d2-builder -f
tail -f /var/log/nginx/error.log

# Test endpoints
curl https://your-domain.com/health
curl https://your-domain.com/manifest/status

# Check disk space
df -h
du -sh data/manifest/

# MongoDB connection test
mongosh mongodb://localhost:27017/d2-builder --eval "db.serverStatus()"
```

## Rollback Plan

- [ ] Previous version tagged in git
- [ ] Database backup available
- [ ] Rollback procedure documented
- [ ] Downtime window communicated

## Final Verification

- [ ] All features working as expected
- [ ] No errors in logs
- [ ] Performance acceptable
- [ ] Security scan completed
- [ ] Documentation updated
- [ ] Team notified of deployment

## Notes

_Add any deployment-specific notes here_

---

Deployment completed by: ________________

Date: ________________

Version: ________________