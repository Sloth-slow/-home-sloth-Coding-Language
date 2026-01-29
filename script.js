// Configuration: set your WhatsApp phone number here (use country code, no + or dashes), e.g. '15551234567'
const WHATSAPP_NUMBER = '1234567890'; // <- replace with real number

const products = Array.from({length:20}).map((_,i)=>{
  const id = i+1;
  return {
    id,
    name: ['Noir Velvet','Aurum Bloom','Midnight Oud','Satin Musk','Amber Reverie','Citrus Silk','Velvet Rose','Desert Dune','Ocean Whisper','Golden Fig','Lush Garden','Ivory Cashmere','Twilight Petal','Woodland Amber','Secret Oud','Vanilla Orchid','Spice Bazaar','Peony Mist','Moonlit Cedar','Sacred Myrrh'][i],
    price: (Math.random()*60 + 30).toFixed(2),
    img: `https://picsum.photos/seed/perfume${id}/600/600`
  }
})

function formatCurrency(v){ return '$' + parseFloat(v).toFixed(2) }

function renderProducts(){
  const grid = document.getElementById('products-grid')
  grid.innerHTML = products.map(p=>`
    <article class="product" data-id="${p.id}">
      <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      <div>
        <h3 class="product-title">${p.name}</h3>
        <div class="product-meta">
          <div class="product-price">${formatCurrency(p.price)}</div>
          <button class="order-btn primary" data-id="${p.id}" data-name="${encodeURIComponent(p.name)}" data-price="${p.price}">Order Now</button>
        </div>
      </div>
    </article>
  `).join('')

  // attach handlers
  grid.querySelectorAll('.order-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = btn.dataset.id
      const name = decodeURIComponent(btn.dataset.name)
      const price = btn.dataset.price
      const message = `Hello, I would like to order ${name} (ID: ${id}) priced at ${formatCurrency(price)}. Please let me know availability and delivery details.`
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
    openWhatsApp('Hello, I would like more information about Al Neehar Perfumes and placing an order.')
  })
})
