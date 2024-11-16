import {cart, addItemCart} from '../data/cart.js';

const addButtonElement = document.querySelectorAll('.js-button-add-cart');
const cartQuantity = document.querySelector('.js-cart-quantity');




function updateCartQuantity() {
  let cartQuantityNumber = 0;

  cart.forEach((item) => {
    cartQuantityNumber += Number(item.quantity);
  });

  console.log(typeof cartQuantityNumber);

  cartQuantity.innerHTML = cartQuantityNumber;
}

addButtonElement.forEach((button) => {
  button.addEventListener('click', () => {
    let productId = button.dataset.productId;

    addItemCart(productId);
    
    
    updateCartQuantity();

    console.log(cart);
  });
});




