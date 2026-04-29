const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')
const menuItems = document.querySelectorAll('.menu-item')

function searchMeals () {
  const searchText = searchInput.value.toLowerCase()

  menuItems.forEach(function (item) {
    const mealName = item.querySelector('h3').textContent.toLowerCase()

    if (mealName.includes(searchText)) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

searchButton.addEventListener('click', searchMeals)

searchInput.addEventListener('keyup', searchMeals)

const orderButtons = document.querySelectorAll('.order-button')
const cartCount = document.getElementById('cartCount')
const cartTotal = document.getElementById('cartTotal')
const cartItems = document.getElementById('cartItems')

let cart = JSON.parse(localStorage.getItem('cart')) || []

function saveCart () {
  localStorage.setItem('cart', JSON.stringify(cart))
}

function updateCart () {
  cartItems.innerHTML = ''

  let totalPrice = 0

  cart.forEach(function (item, index) {
    totalPrice += item.price

    const cartItem = document.createElement('div')
    cartItem.classList.add('cart-item')

    cartItem.innerHTML = `
      <span>${item.name} - ${item.price} €</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `

    cartItems.appendChild(cartItem)
  })

  cartCount.innerText = 'Items: ' + cart.length
  cartTotal.innerText = 'Total: ' + totalPrice + ' Euro'
}

function removeFromCart (index) {
  cart.splice(index, 1)
  saveCart()
  updateCart()
}

orderButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const menuItem = button.parentElement
    const mealName = menuItem.querySelector('h3').innerText
    const priceText = menuItem.querySelector('span').innerText

    const prices = priceText.match(/\d+/g)
    const price = Number(prices[prices.length - 1])

    cart.push({
      name: mealName,
      price: price
    })

    saveCart()
    updateCart()
  })
})

updateCart()

const filterButtons = document.querySelectorAll('.filter-btn')
const sections = document.querySelectorAll('.promotions, .populars, .all-meals')

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const filterValue = button.getAttribute('data-filter')

    sections.forEach(function (section) {
      if (filterValue === 'all') {
        section.style.display = 'block'
      } else if (section.classList.contains(filterValue)) {
        section.style.display = 'block'
      } else {
        section.style.display = 'none'
      }
    })
  })
})

const heroBtn = document.querySelector('.hero button')

heroBtn.addEventListener('click', function () {
  document.querySelector('.all-meals').scrollIntoView()
})

const mealModal = document.getElementById('mealModal')
const closeModal = document.getElementById('closeModal')
const modalImage = document.getElementById('modalImage')
const modalTitle = document.getElementById('modalTitle')
const modalDescription = document.getElementById('modalDescription')
const modalPrice = document.getElementById('modalPrice')

menuItems.forEach(function (item) {
  item.addEventListener('click', function (event) {
    if (event.target.classList.contains('order-button')) {
      return
    }

    const image = item.querySelector('img').src
    const title = item.querySelector('h3').innerText
    const description = item.querySelector('p').innerText
    const price = item.querySelector('span').innerHTML

    modalImage.src = image
    modalTitle.innerText = title
    modalDescription.innerText = description
    modalPrice.innerHTML = price

    mealModal.style.display = 'flex'
  })
})

closeModal.addEventListener('click', function () {
  mealModal.style.display = 'none'
})

mealModal.addEventListener('click', function (event) {
  if (event.target === mealModal) {
    mealModal.style.display = 'none'
  }
})

const toggle = document.getElementById('darkModeToggle')

toggle.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode')
})

const pageSections = document.querySelectorAll(
  '#main, #menus, #about, #contact'
)
const navbarLinks = document.querySelectorAll('nav a')

window.addEventListener('scroll', function () {
  let currentSection = ''

  pageSections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150

    if (window.scrollY >= sectionTop) {
      currentSection = section.id
    }
  })

  navbarLinks.forEach(function (link) {
    link.classList.remove('active')

    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active')
    }
  })
})
