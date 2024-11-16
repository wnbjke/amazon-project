import { products } from "../data/products.js";

const productContent = document.querySelector('.js-main-grid');
let productsString = '';

products.forEach((element) => {
      productsString += `
        <div class="product-bar">
          <div class="product-image-bar">
            <img src="${element.image}" class="product-image">
          </div>
          <div class="product-name js-product-name">${element.name}</div>
          <div class="product-price js-product-price">$${(element.priceCents / 100).toFixed(2)}</div>
          <div class="selector-quantity-product">
            <select class="selector-quantity js-selector-quantity" data-selected-quantity>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div class="product-spacer"></div>
          <button class="button-add-cart js-button-add-cart" data-product-id="${element.id}">Add to Cart</button>
        </div>`;
});

productContent.innerHTML = productsString;

