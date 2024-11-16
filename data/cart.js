export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1' 
    },
    {
      id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2' 
    }
  ];
}


export function addItemCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.id === productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeItem(buttonId) {
  const newCart = [];

  cart.forEach((item) => {
    if (item.id !== buttonId) {
      newCart.push(item);
    }
  });

  console.log(newCart);
  cart = newCart;

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((element) => {
    if (element.id === productId) {
      matchingItem = element;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  localStorage.setItem('cart', JSON.stringify(cart));
}





  