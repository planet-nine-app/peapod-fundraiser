// Main page script
let fundraisingData = null;

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
        fundraisingData = await response.json();
    }

    renderEvents();
    renderProducts();
}

// Render events on the main page
function renderEvents() {
    const container = document.getElementById('events-container');
    if (!container || !fundraisingData) return;

    // Sort events by date
    const sortedEvents = [...fundraisingData.events].sort((a, b) => {
        return new Date(a.date + 'T12:00:00') - new Date(b.date + 'T12:00:00');
    });

    container.innerHTML = sortedEvents.map(event => {
        // Parse date as local time to avoid timezone issues
        const [year, month, day] = event.date.split('-').map(Number);
        const eventDate = new Date(year, month - 1, day);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="event-card ${event.featured ? 'featured' : ''}">
                ${event.featured ? '<div class="featured-badge">★ Featured Event ★</div>' : ''}
                <div class="event-date">${formattedDate}</div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-location">${event.location}</div>
                <div class="event-description">${event.description}</div>
                ${event.time ? `<div class="event-badge">🕐 ${event.time}</div>` : ''}
                ${event.benefit ? `<div class="event-badge">💰 ${event.benefit}</div>` : ''}
                ${event.orderDeadline ? (() => {
                    const [y, m, d] = event.orderDeadline.split('-').map(Number);
                    return `<div class="event-badge">📅 Order by ${new Date(y, m - 1, d).toLocaleDateString()}</div>`;
                })() : ''}
                ${event.websiteUrl ? `<div class="mt-1"><a href="${event.websiteUrl}" target="_blank" class="btn btn-secondary">Learn More</a></div>` : ''}
            </div>
        `;
    }).join('');
}

// Render products on the main page
function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container || !fundraisingData) return;

    container.innerHTML = fundraisingData.products.map(product => {
        return `
            <div class="product-card">
                ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.title}" class="product-image">` : ''}
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-description">${product.description}</div>
                ${product.features ? `
                    <ul class="product-features">
                        ${product.features.map(f => `<li>✓ ${f}</li>`).join('')}
                    </ul>
                ` : ''}
                ${product.contact ? `<div class="product-contact"><strong>To order:</strong> ${product.contact}</div>` : ''}
            </div>
        `;
    }).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadData);
