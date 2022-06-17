"use strict"
const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    },
    {
      id: 4,
      name: 'Sweatshirts',
      price: 30.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 10
    }
]
let cartIcon = document.querySelector("#open-cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")
let cartClose = document.getElementById("cart-close")
let listProducts = document.querySelector(".product__list")
let cartContainer = document.querySelector(".carro__container")
let cartCount = document.querySelector("#cart-count")
//let addButton = document.querySelector(".add-button")
let moon = document.querySelector("#moon")
let sun = document.querySelector("#sun")
let emptyCart = document.querySelector ( ".empty__container")
let cart = []





document.addEventListener("DOMContentLoaded", () =>{
    mostrarProductos()
    const storedCart = window.sessionStorage.getItem('cart')
    
    if (storedCart) {
      cart = JSON.parse(storedCart)
    }
//Test Dark mode.
  if ( JSON.parse (localStorage.getItem('dark-mode') ) === true){
  document.body.classList.add ( "dark-mode")
}else{
  document.body.classList.remove ( "dark-mode")
}
    
   
    mostrarProductosCart(  )
})

  

cartIcon.addEventListener( "click", () =>{
    cartOverlay.classList.add("open-cart")
    if( cart.length !== 0 ){
      emptyCart.classList.add ( "no-empty" )
    }else{
      emptyCart.classList.remove ( "no-empty" )
    }
})
cartClose.addEventListener( "click", () =>{
    cartOverlay.classList.remove("open-cart")
})
 
moon.addEventListener( "click", () =>{
  document.body.classList.add("dark-mode")
  if ( document.body.classList.contains ( "dark-mode" ) ){
    localStorage.setItem('dark-mode', JSON.stringify(true))
  }
  }
)
sun.addEventListener( "click", () =>{
  document.body.classList.remove("dark-mode")
  localStorage.setItem('dark-mode', JSON.stringify(false))
  })
  
  


    

/*darkMode.addEventListener( "click", () =>{
  darkMode.classList.remove("dark-mode")
})*/
/* nav en el scroll */
let header = document.querySelector("header")
window.addEventListener( "scroll", () =>{
    if( window.scrollY > 60 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})

function mostrarProductos( tipo ) {
    let fragmentHTML = ""
    if (tipo == undefined){
      items.forEach( (product) =>{
        fragmentHTML += `
        <div class="product-card">
            <div class="product-image-container">
                <img src=${product.image}  class="product-img">
                <button data-id="${product.id}" class="product-button">+</button>
            </div>
             
            <div class="card__data">
                  <h2 class="price">$${product.price} <small class="cantidad" >| Stock: ${product.quantity}</small> </h2>
                  <h3 class="product-name" >${product.name}</h3>
              </div>    
        </div>
        `
    })
    }else{
      let filtrado = items.filter( item => {
        return item.category === tipo
      } )
      filtrado.forEach( (product) =>{
        fragmentHTML += `
        <div class="product-card">
            <div class="product-image-container">
                <img src=${product.image}  class="product-img">
                <button data-id="${product.id}" class="product-button">+</button>
            </div>
             
            <div class="card__data">
                  <h2 class="price">$${product.price} <small class="cantidad" >| Stock: ${product.quantity}</small> </h2>
                  <h3 class="product-name" >${product.name}</h3>
              </div>    
        </div>
        `
    })
    }
    listProducts.innerHTML = fragmentHTML
    let productsButton = document.querySelectorAll(".product-button")
    productsButton.forEach( (button) =>{
        button.addEventListener("click", () =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{
                return item.id === id
            })
            agregarProducto(product)
            // cart.push( product )
            //console.log((cart))
        })
    })
}
/*
[
    {
        id: 2,
        quantitySelected: 1,
    },
]
*/

function agregarProducto(producto) {
    let resultadoFind = cart.find(item => item.id === producto.id)
     
    if(resultadoFind) {
        cart.forEach(item => {
          if(item === resultadoFind) item.quantity += 1
        })
    } else {
      const cartProduct = {
        ...producto,
        quantity: 1,
      } 
      cart.push(cartProduct)
    }
    window.sessionStorage.setItem('cart', JSON.stringify(cart))
    mostrarProductosCart()
    console.log(cart)
}
function mostrarProductosCart(){
    let suma = 0
    let cantidadTotal = 0
    const cartHTMLElements = cart.map(item => {
        return `
        <article class="cart__card">
                    <div class="cart__box">
                        <img src=${item.image} class="cart__img">
                    </div>
                    <div class="cart__datos">
                        <h3 class="cart__title">${item.name}</h3>
                        <span class="cart__stock">Stock:${item.quantity} | <span class="cart__price">$${item.price}</span></span>
                        <span class="cart__subtotal">Subtotal: $126.00</span>
                        <div class="cart__cuentas">
                            <span class="cart__amount-box minus" data-id="1">
                                <i class="bx bx-minus" id="menos"></i>
                            </span>
                            <span>${item.quantity}</span>
                            <span class="span__más">
                                <i class="bx bx-plus" id="más"></i>
                            </span>
                        <div class="div__trash">
                            <i class="bx bx-trash-alt"></i>
                        </div>
                    </div>
                    </div>
                </article>
        `
        /* <div class="cart-item">
            <img src=${item.image} alt="">
            <p>${item.name}</p>
            <small>Cantidad: ${item.quantity}</small>
        </div> */        // let totalProducto = item.quantitySelected * item.price
        // suma += totalProducto
    })
    const fragmentHTML = cartHTMLElements.join('')
    cartContainer.innerHTML = fragmentHTML
    cartCount.innerHTML = getBagItems(cart)
  }

  function getBagItems(cart) {
    return cart.reduce((acc, item) => {
      return acc + item.quantity
    }, 0)
  }


/******    Efecto por Scroll en la  Nav        ********/

let nav = document.querySelector ( "nav" )

window.addEventListener( 'scroll', () => {
  if (window.scrollY > 70){
    nav.classList.add( "nav-efect" )
  }else{
    nav.classList.remove( "nav-efect")
  }
})
/******    Efecto por Scroll en la  Nav  <Fin>      ********/

/******    Filtrando elementos a mostrar      ********/

console.log(listProducts)


