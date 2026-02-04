// --- CONFIGURATION ---
  const WHATSAPP_NUMBER = '1234567890'; // Replace with real number (e.g. 919876543210)

  // Prices per ml size
  const SIZE_PRICES = {
    20: 400,
    30: 650,
    60: 1000,
    100: 1600
  };

  // Data Lists
  const premiumNames = [
    'Rebelian', 'Voilet resins', 'Cherry blast', 'Ruby gem', 'Srk',
    'Musked berry', 'Mafia oudh', 'Aurum', 'Coffe date', 'Floral oudh'
  ];

  const regularNames = [
    'Noir Velvet', 'Aurum Bloom', 'Midnight Oud', 'Satin Musk', 'Amber Reverie',
    'Citrus Silk', 'Velvet Rose', 'Desert Dune', 'Ocean Whisper', 'Golden Fig',
    'Lush Garden', 'Ivory Cashmere', 'Twilight Petal', 'Woodland Amber', 'Secret Oud',
    'Vanilla Orchid', 'Spice Bazaar', 'Peony Mist', 'Moonlit Cedar', 'Sacred Myrrh'
  ];

  // --- APP LOGIC ---

  // Generate Data Objects
  const premiumProducts = premiumNames.map((name, i) => ({
    id: `p-${i}`,
    name,
    img: `https://picsum.photos/seed/prem${i}/400/400`, // Placeholder images
    category: 'premium',
    defaultSize: 30
  }));

  const regularProducts = regularNames.map((name, i) => ({
    id: `r-${i}`,
    name,
    img: `https://picsum.photos/seed/reg${i}/400/400`,
    category: 'regular',
    defaultSize: 30 // Changed default selection to 30ml visually
  }));

  function formatPrice(amount) {
    return '₹' + amount;
  }

  // Create HTML for a single product card
  function createProductCard(product) {
    const currentPrice = SIZE_PRICES[product.defaultSize];
    
    return `
      <article class="product" id="${product.id}">
        <img class="product-img" src="${product.img}" alt="${product.name}" loading="lazy" />
        <div class="product-info">
          <h3>${product.name}</h3>
          
          <div class="size-selector">
            <button class="size-btn" onclick="updateSize('${product.id}', 20)">20ml</button>
            <button class="size-btn active" onclick="updateSize('${product.id}', 30)">30ml</button>
            <button class="size-btn" onclick="updateSize('${product.id}', 60)">60ml</button>
            <button class="size-btn" onclick="updateSize('${product.id}', 100)">100ml</button>
          </div>

          <div class="card-footer">
            <span class="price" data-base-price="${currentPrice}">${formatPrice(currentPrice)}</span>
            <button class="order-btn" onclick="orderItem('${product.id}', '${product.name}')">Order</button>
          </div>
        </div>
        <!-- Hidden inputs to track state -->
        <input type="hidden" class="selected-size" value="30">
        <input type="hidden" class="selected-price" value="${currentPrice}">
      </article>
    `;
  }

  // Render Lists
  function init() {
    const premiumContainer = document.getElementById('premium-list');
    const regularContainer = document.getElementById('regular-list');

    premiumContainer.innerHTML = premiumProducts.map(createProductCard).join('');
    regularContainer.innerHTML = regularProducts.map(createProductCard).join('');

    // Setup Filters
    setupFilters();
    
    // Setup Header Contact
    document.getElementById('whatsapp-contact').addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp("Hello, I'm interested in your perfumes.");
    });

    // Setup Footer Contact
    const footerBtn = document.getElementById('footer-whatsapp');
    if(footerBtn) {
      footerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp("Hello, I'm interested in your perfumes.");
      });
    }
  }

  // Handle Size Updates
  window.updateSize = function(productId, size) {
    const card = document.getElementById(productId);
    if(!card) return;

    // Update buttons UI
    const btns = card.querySelectorAll('.size-btn');
    btns.forEach(btn => {
      if(btn.textContent.includes(size)) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // Update Price
    const newPrice = SIZE_PRICES[size];
    const priceEl = card.querySelector('.price');
    priceEl.textContent = formatPrice(newPrice);

    // Update Hidden Inputs
    card.querySelector('.selected-size').value = size;
    card.querySelector('.selected-price').value = newPrice;
  };

  // Handle Order Click
  window.orderItem = function(productId, name) {
    const card = document.getElementById(productId);
    const size = card.querySelector('.selected-size').value;
    const price = card.querySelector('.selected-price').value;

    const message = `Hi, I would like to order: ${name} (${size}ml) for ₹${price}. Please confirm availability.`;
    openWhatsApp(message);
  };

  // Helper: Open WhatsApp
  function openWhatsApp(text) {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  }

  // Filter Logic
  function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const premiumSection = document.getElementById('premium-container');
    const regularSection = document.getElementById('regular-container');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active visual state
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        if (filter === 'all') {
          premiumSection.classList.remove('hidden');
          regularSection.classList.remove('hidden');
        } else if (filter === 'premium') {
          premiumSection.classList.remove('hidden');
          regularSection.classList.add('hidden');
        } else if (filter === 'regular') {
          premiumSection.classList.add('hidden');
          regularSection.classList.remove('hidden');
        }
      });
    });
  }

  // Start
  document.addEventListener('DOMContentLoaded', init);
