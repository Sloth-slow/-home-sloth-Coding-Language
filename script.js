// Configuration: set your WhatsApp phone number here (use country code, no + or dashes), e.g. '15551234567'
const WHATSAPP_NUMBER = '1234567890'; // <- replace with real number

// Size pricing configuration
const SIZE_PRICES = {
  20: 400,
  30: 650,
  60: 1000,
  100: 1600
}

const premiumNames = [
  'Voilet resins',
  'Cherry blast',
  'Ruby gem',
  'Srk',
  'Musked berry',
  'Mafia oudh',
  'Aurum',
  'Coffe date',
  'Floral oudh'
]

const products = premiumNames.map((name, i) => ({
  id: i + 1,
  name,
  price: SIZE_PRICES[30],
  img: `https://picsum.photos/seed/premium${i+1}/600/600`
}))

function formatCurrency(v){ return '₹' + parseFloat(v).toFixed(0) }

function renderProducts(){
  const grid = document.getElementById('products-grid')
  grid.innerHTML = products.map(p=>`
    <article class="product" data-id="${p.id}">
      <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      <div>
        <h3 class="product-title">${p.name}</h3>
        <div class="size-selector">
          <button class="size-btn" data-size="20">20ml</button>
          <button class="size-btn active" data-size="30">30ml</button>
          <button class="size-btn" data-size="60">60ml</button>
          <button class="size-btn" data-size="100">100ml</button>
        </div>
        <div class="product-meta">
          <div class="product-price" data-base-price="${p.price}">${formatCurrency(SIZE_PRICES[30])}</div>
          <button class="order-btn primary" data-id="${p.id}" data-name="${encodeURIComponent(p.name)}" data-size="30" data-price="${SIZE_PRICES[30]}">Order Now</button>
        </div>
      </div>
    </article>
  `).join('')

  // attach handlers for size buttons
  grid.querySelectorAll('.size-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const product = btn.closest('.product')
      const size = parseInt(btn.dataset.size)
      const price = SIZE_PRICES[size]
      
      // update active state
      product.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      
      // update price display
      const priceEl = product.querySelector('.product-price')
      priceEl.textContent = formatCurrency(price)
      
      // update order button
      const orderBtn = product.querySelector('.order-btn')
      orderBtn.dataset.size = size
      orderBtn.dataset.price = price
    })
  })

  // attach handlers for order buttons
  grid.querySelectorAll('.order-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = btn.dataset.id
      const name = decodeURIComponent(btn.dataset.name)
      const price = btn.dataset.price
      const size = btn.dataset.size
      const message = `Hello, I would like to order ${name} (ID: ${id}, ${size}ml) priced at ${formatCurrency(price)}. Please let me know availability and delivery details.`
      openWhatsApp(message)
    })
  })
}

function openWhatsApp(message){
  const text = encodeURIComponent(message)
  let url = ''
  if(WHATSAPP_NUMBER && WHATSAPP_NUMBER.trim() !== ''){
    url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  } else {
    // fallback: open WhatsApp share without number (user selects contact)
    url = `https://wa.me/?text=${text}`
  }
  window.open(url, '_blank')
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts()
  document.getElementById('year').textContent = new Date().getFullYear()
  // contact button uses a generic message
  const wbtn = document.getElementById('whatsapp-contact')
  wbtn.addEventListener('click', e=>{
    e.preventDefault()
    openWhatsApp('Hello, I would like more information about Neehar Perfumes and placing an order.')
  })
})
