#!/usr/bin/env node

/**
 * Script to upload Peapod fundraising data to BDO service
 *
 * This will create a public BDO with the fundraising data at:
 * https://plr.allyabase.com/plugin/allyabase/bdo
 *
 * The data will be accessible via emojicode for easy updates
 */

const fs = require('fs');
const path = require('path');

// For now, this is a placeholder to show how to structure the upload
// You'll need to use the fount-js client or sessionless-node to create authenticated requests

async function uploadToBDO() {
    try {
        // Read the fundraising data
        const dataPath = path.join(__dirname, 'fundraising-data.json');
        const fundraisingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        console.log('Fundraising data loaded successfully');
        console.log('Events:', fundraisingData.events.length);
        console.log('Products:', fundraisingData.products.length);
        console.log('Auction Items:', fundraisingData.auctionItems.length);

        console.log('\n=== NEXT STEPS ===');
        console.log('To upload this data to the BDO service at plr.allyabase.com:');
        console.log('');
        console.log('1. You need to create a user with fount-js or sessionless-node');
        console.log('2. Use the PUT /user/:uuid/bdo endpoint with a pubKey');
        console.log('3. This will generate an emojicode for easy access');
        console.log('4. Update the JavaScript files to use that emojicode');
        console.log('');
        console.log('Example emojicode URL pattern:');
        console.log('https://plr.allyabase.com/plugin/allyabase/bdo/emoji/🌱🎉💚');
        console.log('');
        console.log('For now, the website will use the local JSON file.');

        // Show the data structure
        console.log('\n=== DATA STRUCTURE ===');
        console.log(JSON.stringify({
            events: fundraisingData.events.length + ' events',
            products: fundraisingData.products.length + ' products',
            auctionItems: fundraisingData.auctionItems.length + ' auction items',
            suggestions: fundraisingData.suggestions.length + ' suggestions',
            donationInfo: 'included',
            committee: 'included'
        }, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

uploadToBDO();
