# Peapod Fundraiser - Deployment Guide

## Quick Start on Digital Ocean Droplet

### 1. Initial Server Setup

SSH into your Digital Ocean droplet:
```bash
ssh root@your-droplet-ip
```

Install Node.js (if not already installed):
```bash
# Using NodeSource for latest LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

Install PM2 globally:
```bash
npm install -g pm2
```

### 2. Deploy the Application

Create application directory:
```bash
mkdir -p /var/www/peapod-fundraiser
cd /var/www/peapod-fundraiser
```

Upload your files (from your local machine):
```bash
# Option 1: Using SCP
scp -r /Users/zachbabb/Work/planet-nine/peapod-fundraiser/* root@your-droplet-ip:/var/www/peapod-fundraiser/

# Option 2: Using rsync (recommended)
rsync -avz --exclude 'node_modules' /Users/zachbabb/Work/planet-nine/peapod-fundraiser/ root@your-droplet-ip:/var/www/peapod-fundraiser/

# Option 3: Clone from git (if you've pushed to a repo)
git clone your-repo-url .
```

Install dependencies:
```bash
cd /var/www/peapod-fundraiser
npm install
```

### 3. Start with PM2

Start the application:
```bash
# Option 1: Using package.json script
npm run pm2:start

# Option 2: Using ecosystem config (recommended)
pm2 start ecosystem.config.js

# Option 3: Direct command
pm2 start server.js --name peapod-fundraiser
```

Save PM2 process list (auto-restart on reboot):
```bash
pm2 save
pm2 startup
# Follow the instructions output by the startup command
```

### 4. Manage the Application

Check status:
```bash
pm2 status
pm2 logs peapod-fundraiser
pm2 monit
```

Common commands:
```bash
# Restart
pm2 restart peapod-fundraiser

# Stop
pm2 stop peapod-fundraiser

# View logs
pm2 logs peapod-fundraiser --lines 100

# Real-time monitoring
pm2 monit
```

### 5. Configure Nginx (Optional but Recommended)

Install Nginx:
```bash
sudo apt-get update
sudo apt-get install -y nginx
```

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/peapod-fundraiser
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:4040;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/peapod-fundraiser /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Setup SSL with Let's Encrypt (Recommended)

Install Certbot:
```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

Get SSL certificate:
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Auto-renewal is configured automatically. Test it:
```bash
sudo certbot renew --dry-run
```

### 7. Firewall Configuration

If using UFW:
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

## Environment Variables

You can customize the port by setting the PORT environment variable:

```bash
# In ecosystem.config.js, modify:
env: {
    NODE_ENV: 'production',
    PORT: 4040  // Change this if needed
}
```

## Updating the Site

When you need to update content:

1. Edit `fundraising-data.json` locally
2. Upload the updated file:
```bash
scp fundraising-data.json root@your-droplet-ip:/var/www/peapod-fundraiser/
```

3. No restart needed! The changes will be visible immediately.

For code changes (HTML/CSS/JS):
```bash
# Upload changed files
rsync -avz changed-file.html root@your-droplet-ip:/var/www/peapod-fundraiser/

# Restart if needed (usually not required for static files)
pm2 restart peapod-fundraiser
```

## Troubleshooting

### Check if server is running
```bash
pm2 status
curl http://localhost:4040/health
```

### View logs
```bash
pm2 logs peapod-fundraiser
# or
tail -f /var/www/peapod-fundraiser/logs/error.log
tail -f /var/www/peapod-fundraiser/logs/output.log
```

### Server not starting
```bash
# Check Node.js version
node --version  # Should be >= 14

# Check dependencies
cd /var/www/peapod-fundraiser
npm install

# Try running directly
node server.js
```

### Port already in use
```bash
# Find process using port 4040
sudo lsof -i :4040

# Kill the process if needed
sudo kill -9 <PID>
```

## Monitoring

Set up PM2 monitoring (optional):
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## Backup

Regular backups of fundraising data:
```bash
# From your local machine
rsync -avz root@your-droplet-ip:/var/www/peapod-fundraiser/fundraising-data.json ./backups/fundraising-data-$(date +%Y%m%d).json
```

## Quick Reference

```bash
# Start
pm2 start ecosystem.config.js

# Stop
pm2 stop peapod-fundraiser

# Restart
pm2 restart peapod-fundraiser

# Logs
pm2 logs peapod-fundraiser

# Monitor
pm2 monit

# Status
pm2 status

# Health check
curl http://localhost:4040/health
```

## Security Notes

1. Keep Node.js and npm updated
2. Use Nginx as a reverse proxy
3. Enable SSL with Let's Encrypt
4. Configure firewall (UFW)
5. Regularly update packages: `npm audit fix`
6. Consider using a non-root user for running the app
7. Set up automated backups

## Support

For issues, check:
- PM2 logs: `pm2 logs peapod-fundraiser`
- System logs: `/var/log/nginx/error.log`
- Health endpoint: `http://your-server:4040/health`
