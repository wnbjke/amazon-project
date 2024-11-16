import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {deliveryDates} from '../../data/dates.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let optionPriceCents = 0;
  let matchingItem;
  let matchingOption;
  let itemsQuantity = 0;

  cart.forEach((cartItem) => {

    products.forEach((productItem) => {
      if (productItem.id === cartItem.id) {
        matchingItem = productItem;
      } 
    });
    
    productPriceCents += matchingItem.priceCents * cartItem.quantity;

    deliveryDates.forEach((dateOption) => {
      if (cartItem.deliveryOptionId === dateOption.id) {
        matchingOption = dateOption;
      }
    });

    optionPriceCents += matchingOption.price;
    
    itemsQuantity += cartItem.quantity
  });

  let totalBeforeTax = productPriceCents + optionPriceCents;
  let estimatedTax = totalBeforeTax * 0.1;
  let totalAfterTax = totalBeforeTax + estimatedTax;
  console.log(totalAfterTax);
  
  let html = `
        <div class="js-order-summary">
          <div class="payment-summary-title">Order Summary</div>
          <div class="payment-summary-items">
            <div>Items (${itemsQuantity}):</div>
            <div>$${(productPriceCents / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary-items">
            <div>Shipping & handling:</div>
            <div>$${(optionPriceCents / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary-items">
            <div>Total before tax:</div>
            <div>$${(totalBeforeTax / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary-items payment-summary-items-border">
            <div>Estimated tax (10%):</div>
            <div>$${(estimatedTax / 100).toFixed(2)}</div>
          </div>
          <div class="payment-summary-items payment-summary-total">
            <div>Order total:</div>
            <div>$${(totalAfterTax / 100).toFixed(2)}</div>
          </div>
        </div>
        <div class="payment-summary-method">
          <div>Use PayPal</div>
          <div>
            <input type="checkbox">
          </div>
        </div>
        <div>
          <button class="summary-button">Place your order</button>
        </div>
        `
  
  document.querySelector('.order-summary').innerHTML = html;
  document.querySelector('.js-top-quantity').innerHTML = `${itemsQuantity} times`;

  console.log(cart.length);
}