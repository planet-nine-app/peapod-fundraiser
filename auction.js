// Auction page script
let fundraisingData = null;
let currentFilter = 'all';

// Load data from JSON or BDO service
async function loadData() {
    try {
        // Try to load from BDO service first
        const bdoResponse = await fetch('https://plr.allyabase.com/plugin/allyabase/bdo/emoji/🌱🎉💚');
        if (bdoResponse.ok) {
            const bdoData = await bdoResponse.json();
            fundraisingData = bdoData.bdo;
        }
    } catch (error) {
        console.log('BDO service not available, loading from local JSON');
    }

    // Fallback to local JSON
    if (!fundraisingData) {
        const response = await fetch('fundraising-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load fundraising data: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        try {
            fundraisingData = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse JSON. Response was:', text.substring(0, 200));
            throw new Error('Invalid JSON in fundraising-data.json');
        }
    }

    renderAuctionItems();
    renderSuggestions();
    setupFilters();
}

// Call loadData and handle errors
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadData();
    } catch (error) {
        console.error('Error loading fundraising data:', error);
        document.getElementById('auction-items-container').innerHTML = `
            <div style="padding: 2rem; text-align: center; color: var(--color-secondary);">
                <h2>Oops! Unable to load auction items</h2>
                <p>${error.message}</p>
                <p>Please contact the site administrator.</p>
            </div>
        `;
    }
});

// Render auction items
function renderAuctionItems() {
    const container = document.getElementById('auction-items-container');
    if (!container || !fundraisingData) return;

    const filteredItems = currentFilter === 'all'
        ? fundraisingData.auctionItems
        : fundraisingData.auctionItems.filter(item => item.category === currentFilter);

    if (filteredItems.length === 0) {
        container.innerHTML = '<p class="text-center">No items in this category yet.</p>';
        return;
    }

    container.innerHTML = filteredItems.map(item => {
        return `
            <div class="auction-item-card ${item.category}" data-category="${item.category}">
                <h3 class="auction-item-title">${item.title}</h3>
                <div class="auction-item-donor">Donated by: ${item.donor}</div>
                ${item.value ? `<div class="auction-item-value">Value: $${item.value}</div>` : ''}
                <div class="auction-item-description">${item.description}</div>
                ${item.duration ? `<div class="auction-item-details">⏱️ Duration: ${item.duration}</div>` : ''}
                ${item.capacity ? `<div class="auction-item-details">👥 Capacity: ${item.capacity}</div>` : ''}
                ${item.location ? `<div class="auction-item-details">📍 Location: ${item.location}</div>` : ''}
                ${item.nights ? `<div class="auction-item-details">🌙 ${item.nights} nights</div>` : ''}
                ${item.quantity ? `<div class="auction-item-details">🔢 Quantity: ${item.quantity}</div>` : ''}
                ${item.experience ? `<div class="auction-item-details">⭐ ${item.experience}</div>` : ''}
                ${item.cleaningFee ? `<div class="auction-item-details">💵 Cleaning fee: $${item.cleaningFee}</div>` : ''}
                ${item.websiteUrl ? `<div class="mt-1"><a href="${item.websiteUrl}" target="_blank" class="btn btn-secondary">Learn More</a></div>` : ''}
                ${item.status ? `<div class="event-badge">${item.status}</div>` : ''}
                ${item.note ? `<div class="auction-item-details">ℹ️ ${item.note}</div>` : ''}
                <span class="category-tag">${formatCategory(item.category)}</span>
            </div>
        `;
    }).join('');
}

// Render suggestions
function renderSuggestions() {
    const container = document.getElementById('suggestions-container');
    if (!container || !fundraisingData) return;

    container.innerHTML = fundraisingData.suggestions.map(suggestion => {
        return `
            <div class="suggestion-card">
                <h3 class="suggestion-title">${suggestion.title}</h3>
                <div class="suggestion-description">${suggestion.description}</div>
                ${suggestion.source ? `<div class="suggestion-source">Idea from: ${suggestion.source}</div>` : ''}
                ${suggestion.volunteer ? `<div class="suggestion-volunteer">Volunteer: ${suggestion.volunteer}</div>` : ''}
                ${suggestion.note ? `<div class="suggestion-source">Note: ${suggestion.note}</div>` : ''}
            </div>
        `;
    }).join('');
}

// Setup category filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update current filter and re-render
            currentFilter = button.dataset.category;
            renderAuctionItems();
        });
    });
}

// Format category name for display
function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

