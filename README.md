# Pea Pod Fundraising Website

A colorful, playful, and responsive website for managing Peapod playschool fundraising events, auctions, and donations.

## Features

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Planet Nine Style**: Colorful gradients, playful animations, and modern design
- **Event Management**: Display upcoming fundraising events chronologically
- **Product Showcase**: Highlight stickers, t-shirts, and other merchandise
- **Auction Preview**: Browse donated auction items by category
- **Donation Integration**: Prominent donation links throughout the site
- **BDO Integration**: Data can be stored and updated via plr.allyabase.com/plugin/allyabase/bdo

## File Structure

```
peapod-fundraiser/
├── index.html              # Main landing page
├── auction.html            # Auction items page
├── styles.css              # Planet Nine-inspired styles
├── script.js               # Main page JavaScript
├── auction.js              # Auction page JavaScript
├── fundraising-data.json   # Structured fundraising data
├── upload-to-bdo.js        # Helper script for BDO uploads
└── README.md               # This file
```

## Data Structure

The `fundraising-data.json` file contains:

- **Events**: Upcoming fundraising events (dine-outs, pie sales, auctions)
- **Products**: Merchandise for sale (stickers, t-shirts)
- **Auction Items**: Silent auction and raffle items organized by category
  - Workshops
  - Lessons
  - Vacations
  - Parties
  - Services
  - Handmade items
  - Memberships
  - Spiritual services
  - Consulting
- **Suggestions**: Community ideas for future fundraisers
- **Donation Info**: Multiple donation methods with instructions
- **Committee Info**: Volunteer information

## Usage

### Local Development

1. Open `index.html` in a web browser
2. The site will load data from `fundraising-data.json`

### Serving the Site

You can serve this with any static web server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## BDO Integration

The website is designed to fetch data from the BDO service at `plr.allyabase.com/plugin/allyabase/bdo`.

### How It Works

1. The JavaScript first tries to fetch from the BDO service using an emojicode
2. If the BDO service is unavailable, it falls back to `fundraising-data.json`
3. This allows updates to be made via Slack or other integrations

### Uploading Data to BDO

To upload the fundraising data to the BDO service:

```bash
node upload-to-bdo.js
```

This script provides instructions for:
1. Creating a user with fount-js or sessionless-node
2. Uploading the data with a public key
3. Getting an emojicode for easy access
4. Updating the JavaScript files with the emojicode

### Example BDO URL

Once uploaded, data can be accessed at:
```
https://plr.allyabase.com/plugin/allyabase/bdo/emoji/🌱🎉💚
```

Update this emojicode in both `script.js` and `auction.js` after uploading.

## Customization

### Colors

The Planet Nine color palette is defined in CSS variables at the top of `styles.css`:

```css
:root {
    --color-primary: #FF6B9D;     /* Pink */
    --color-secondary: #C44569;   /* Dark pink */
    --color-accent-1: #FFC75F;    /* Yellow */
    --color-accent-2: #4ECDC4;    /* Teal */
    --color-peapod: #88D498;      /* Green */
    /* ... and more */
}
```

### Adding New Events

Edit `fundraising-data.json` and add to the `events` array:

```json
{
    "id": "new-event",
    "title": "New Fundraising Event",
    "date": "2025-03-15",
    "time": "6:00 PM - 9:00 PM",
    "location": "Event Location",
    "description": "Description of the event",
    "type": "event-type",
    "featured": false
}
```

### Adding New Auction Items

Edit `fundraising-data.json` and add to the `auctionItems` array:

```json
{
    "id": "new-item",
    "title": "New Auction Item",
    "donor": "Donor Name",
    "value": 100,
    "description": "Item description",
    "category": "services"
}
```

Available categories: `workshop`, `lessons`, `vacation`, `party`, `services`, `handmade`, `membership`, `spiritual`, `consulting`

## Donation Links

The main donation link is prominently displayed throughout the site:
```
https://givingtuesday.mightycause.com/organization/Pea-Pod-Family-Resource-Center
```

This can be updated in both HTML files.

## Merchandise

### Stickers
- **Price**: $3.00
- **Contact**: @sarahgretz on Venmo

### T-Shirts
- **Price**: $15.00
- **Image**: https://peaceloveandredistribution.com/images/1ffbbd52-8f2c-4d82-ac60-c821065fc94f

## Events Calendar

### Upcoming Events

1. **Dine Out Night at Threshold Brewing**
   - December 18, 2024, 4-9 PM
   - 10% of purchases go to Peapod

2. **Willamette Valley Pie Sale**
   - Orders due: December 3, 2024
   - Pickup: December 19, 2024

3. **Main Auction Event** (Featured)
   - February 28, 2025, 2-5 PM
   - Taborspace Dining Room
   - Silent auction, raffle, and more!

## Contact Information

For questions about:
- **Donations**: Contact Sarah or Max for tax receipts
- **Auction Committee**: Contact Sarah Gretz (Hadley's Mom)
- **Check Donations**: Max (Avery's dad) - often onsite Tuesdays and Thursdays

## Future Enhancements

Potential improvements:
- Admin interface for updating data
- Slack integration for automatic updates
- Bidding system for online auction participation
- Email signup for event notifications
- Photo gallery from past events

## Credits

Built with love by the Pea Pod community for the Pea Pod community.

Styled with Planet Nine aesthetic: colorful, playful, and modern.
