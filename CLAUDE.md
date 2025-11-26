# Peapod Fundraiser Website

## Overview

A colorful, responsive fundraising website for Peapod Playschool built with vanilla HTML, CSS, and JavaScript. Features a playful design inspired by the Peapod sticker branding with green, teal, and orange colors.

## Key Features

- **📅 Event Management**: Display upcoming fundraising events chronologically
- **🛍️ Product Showcase**: Stickers ($3) and t-shirts ($15) with images
- **🎨 Auction Items**: 15+ donated items organized by category with filtering
- **💰 Donation Integration**: Prominent donation links throughout the site
- **📱 Fully Responsive**: Works on desktop, tablet, and mobile
- **🎨 Peapod Branding**: Color palette extracted from the official sticker design
- **🖼️ Visual Events**: Support for event images (like the clothing swap poster)

## File Structure

```
peapod-fundraiser/
├── index.html              # Main landing page
├── auction.html            # Auction items page with filtering
├── styles.css              # Peapod-branded styles
├── script.js               # Main page JavaScript
├── auction.js              # Auction page JavaScript
├── fundraising-data.json   # All event/product/auction data
├── server.js               # Express server for deployment
├── package.json            # Node.js dependencies
├── ecosystem.config.js     # PM2 configuration
├── sticker.jpg             # Official Peapod sticker
├── swap.png                # Clothing swap event poster
├── README.md               # User documentation
├── DEPLOYMENT.md           # Deployment instructions
└── CLAUDE.md               # This file
```

## Color Palette

Colors extracted from the Peapod sticker (sticker.jpg):

```css
--color-primary: #A8C573;      /* Lime Green - main pea */
--color-secondary: #527548;    /* Dark Green - outlines/text */
--color-accent-1: #E87646;     /* Orange - left pea */
--color-accent-2: #7BC4BC;     /* Teal - top pea */
--color-accent-3: #C8DDB5;     /* Light Green - accents */
```

## Data Structure

### Events (`fundraising-data.json`)

Events are stored chronologically and displayed with:
- Date (parsed as local time to avoid timezone issues)
- Time
- Location
- Description
- Optional image (like swap.png)
- Optional badges (benefit, order deadline, etc.)

**Current Events:**
1. **Dine Out Night** - December 18, 2025 at Threshold Brewing
2. **Pie Sale** - December 19, 2025 (order by 12/3)
3. **Clothing Swap** - January 17, 2026, 9am-12pm (with poster image)
4. **Main Auction** - February 28, 2026 (featured event)

### Products

- **Stickers**: $3, contact @sarahgretz on Venmo
- **T-Shirts**: $15, DM Zach (Finn's Dad)

Both include images displayed at 66% width to prevent cropping.

### Auction Items

15 items organized by category:
- Workshop (ice dyeing)
- Lessons (guitar, music)
- Vacation (Bend, Arch Cape, short-term rental)
- Party (swim parties, Literacy Lady)
- Services (haircuts, house cleaning)
- Handmade (leather belt, mud kitchen)
- Membership (FLIP Museum)
- Spiritual (tarot session)
- Consulting (startup accelerator)

Each item includes donor attribution, value (when available), and detailed description.

## Technical Details

### Date Handling

**Important**: Dates are parsed as local time to avoid timezone conversion issues:

```javascript
// Parse "2026-01-17" as local date, not UTC
const [year, month, day] = event.date.split('-').map(Number);
const eventDate = new Date(year, month - 1, day);
```

This prevents dates from shifting (e.g., Feb 28 → Feb 27) due to UTC to Pacific conversion.

### BDO Integration

The website is designed to fetch data from the BDO service:
1. JavaScript first attempts to fetch from `plr.allyabase.com/plugin/allyabase/bdo/emoji/🌱🎉💚`
2. Falls back to local `fundraising-data.json` if BDO is unavailable
3. Allows updates via Slack or other integrations

To upload data to BDO: Run `node upload-to-bdo.js` for instructions.

### Responsive Design

- **Desktop**: Multi-column grid layouts
- **Tablet**: Flexible 2-column grids
- **Mobile**: Single column, stacked layout
- Sticky donation banner on desktop, relative on mobile

## Deployment

### Quick Deploy to Digital Ocean

```bash
# Upload files
rsync -avz --exclude 'node_modules' peapod-fundraiser/ root@your-ip:/var/www/peapod-fundraiser/

# SSH and setup
ssh root@your-ip
cd /var/www/peapod-fundraiser
npm install
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Runs on port **4040** by default.

See `DEPLOYMENT.md` for complete instructions including Nginx reverse proxy and SSL setup.

## Updating Content

### Add New Event

Edit `fundraising-data.json`:

```json
{
  "id": "new-event",
  "title": "Event Title",
  "date": "2026-03-15",
  "time": "2:00 PM - 5:00 PM",
  "location": "Event Location",
  "description": "Event description...",
  "type": "event-type",
  "imageUrl": "optional-image.png",
  "featured": false
}
```

### Add New Auction Item

```json
{
  "id": "new-item",
  "title": "Item Title",
  "donor": "Donor Name",
  "value": 100,
  "description": "Item description...",
  "category": "services"
}
```

**Categories**: workshop, lessons, vacation, party, services, handmade, membership, spiritual, consulting

### Update on Live Server

```bash
# From local machine
scp fundraising-data.json root@your-ip:/var/www/peapod-fundraiser/

# No restart needed - changes are immediate!
```

## Contact Information

### For Orders
- **Stickers**: @sarahgretz on Venmo
- **T-Shirts**: DM Zach (Finn's Dad)

### For Donations
- **Online**: https://givingtuesday.mightycause.com/organization/Pea-Pod-Family-Resource-Center
- **Check**: Make payable to "Pea Pod Family Resource Center", give to Max or put in playroom lockbox
- **Tax Receipts**: Ask Sarah or Max

### For Committee
- **Auction Committee**: Contact Sarah Gretz (Hadley's Mom)
- **Volunteers**: Luke Z, Saki, and more!

## Development Notes

### Key Design Decisions

1. **Local Date Parsing**: Prevents timezone issues by treating ISO dates as local time
2. **66% Image Width**: Prevents tall images (stickers, posters) from getting cropped
3. **Sticker Color Palette**: Maintains brand consistency across the site
4. **Sticky Donation Banner**: Ensures donation link is always visible
5. **Category Filtering**: Makes auction browsing easier with visual feedback
6. **Event Images**: Optional images displayed full-width at top of event cards

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features used
- CSS Grid and Flexbox layouts
- No build step required

### Performance

- Minimal dependencies (just Express for server)
- Static file serving
- Client-side rendering
- Small asset sizes (sticker.jpg ~200KB, swap.png ~300KB)

## Future Enhancements

Potential improvements:
- Admin interface for updating data
- Slack webhook integration for automatic updates
- Online bidding system for auctions
- Email newsletter signup
- Photo gallery from past events
- Event RSVP functionality
- Real-time donation counter

## Maintenance

### Regular Tasks

1. **Update Events**: Add/remove events as they occur
2. **Update Auction Items**: Add new donations as they come in
3. **Monitor Server**: Check `pm2 status` and `pm2 logs`
4. **Backup Data**: Regularly backup `fundraising-data.json`
5. **SSL Renewal**: Certbot auto-renews, but verify occasionally

### Troubleshooting

**Dates showing wrong day?**
- Check date format in JSON is `YYYY-MM-DD`
- Verify date parsing logic uses local time (not UTC)

**Images not loading?**
- Ensure image files are in the root directory
- Check file names match exactly (case-sensitive)
- Verify server is serving static files

**PM2 not restarting?**
- Run `pm2 startup` and follow instructions
- Check `pm2 logs` for errors

## License

Built for Pea Pod Family Resource Center by the Peapod community.

## Last Updated

November 24, 2024 - Created complete fundraising website with:
- 4 events (Dec 2025 - Feb 2026)
- 2 products (stickers and t-shirts)
- 15 auction items across 9 categories
- Full deployment setup for Digital Ocean
- Peapod sticker color palette integration
