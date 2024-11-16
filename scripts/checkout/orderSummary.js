import {cart, removeItem, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryDates} from '../../data/dates.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function generateHTML() {
  let productHTML = '';

  cart.forEach((cartItem) => {
    let itemId = cartItem.id;
    let matchingItem;

    products.forEach((productItem) => {
      if (productItem.id === itemId) {
        matchingItem = productItem;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryDates.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }      
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.delivery_days, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');


    productHTML += `<div class="item-to-order js-item-to-order-${itemId}">
              <div class="order-top-section js-order-top-section-${itemId}">
                Delivery date: ${dateString}
              </div>
              <div class="order-main-section">
                <div class="image-section">
                  <img src="${matchingItem.image}" class="product-image">
                </div>
                <div class="item-info-section">
                  <div class="product-name">${matchingItem.name}</div>
                  <div class="product-price">$${(matchingItem.priceCents / 100).toFixed(2)}</div>
                  <div class="manage-order">
                    <div class="quantity-number">
                      Quantity: ${cartItem.quantity}
                    </div>
                    <div class="update-section">
                      <a href="#" class="update-button">Update</a>
                    </div>
                    <div>
                      <a href="#" class="delete-button" data-delete-button="${itemId}">Delete</a>
                    </div>
                  </div>
                </div>
                <div class="delivery-section">
                  <div class="delivery-top">Choose a delivery option:</div>
                  <div class="delivery-options-section">
                    ${deliveryOptionsHTML(matchingItem.id, cartItem)}
                  </div>
                </div>
              </div>
            </div>`;
  });

  document.querySelector('.order-list').innerHTML = productHTML;



  function deliveryOptionsHTML(itemId, cartItem) {
    let html = '';

    deliveryDates.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.delivery_days, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      
      const priceString = deliveryOption.price === 0 ? 'FREE' : '$' + (deliveryOption.price / 100).toFixed(2);
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${itemId}" data-delivery-option="${deliveryOption.id}">
        <input ${isChecked ? 'checked' : ''} type="radio" name="delivery-option-${itemId}" class="js-input-check">
        <div>
          <div class="delivery-day">${dateString}</div>
          <div class="shipping-price">${priceString}</div>
        </div>
      </div>
      `
    });

    return html;
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOption} = element.dataset;
      updateDeliveryOption(productId, deliveryOption);

      generateHTML();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      let buttonId = button.dataset.deleteButton;
      
      removeItem(buttonId);

      document.querySelector(`.js-item-to-order-${buttonId}`).remove();

      generateHTML();

      renderPaymentSummary();
    });
  });
}

