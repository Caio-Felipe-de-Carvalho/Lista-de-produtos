document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartElement = document.querySelector('.card');
  const products = document.querySelectorAll('.conteiner');

  products.forEach(product => {
    const decreaseButton = product.querySelector('.decrease');
    const increaseButton = product.querySelector('.increase');
    const quantityDisplay = product.querySelector('.quantity');
    let quantity = 0;

    increaseButton.addEventListener('click', () => {
      quantity++;
      quantityDisplay.innerText = quantity;
      updateCart(product, quantity);
    });

    decreaseButton.addEventListener('click', () => {
      if (quantity > 0) {
        quantity--;
        quantityDisplay.innerText = quantity;
        updateCart(product, quantity);
      }
    });
  });

  function updateCart(product, quantity) {
    const productName = product.getAttribute('data-product-name');
    const productPrice = parseFloat(product.getAttribute('data-product-price'));
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
      if (quantity > 0) {
        cart[existingProductIndex].quantity = quantity;
        cart[existingProductIndex].totalPrice = (productPrice * quantity).toFixed(2);
      } else {
        cart.splice(existingProductIndex, 1);
      }
    } else if (quantity > 0) {
      cart.push({
        name: productName,
        price: productPrice.toFixed(2),
        quantity: quantity,
        totalPrice: (productPrice * quantity).toFixed(2)
      });
    }

    renderCart();
  }

  function renderCart() {
    cartElement.innerHTML = `
      <h2>Seu Carrinho (${cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>

      <div class="card-list">
      <ul>
        ${cart.map(item => `
          <none>
            <p class="name">${item.name} </p>
            <p class="quantidade">${item.quantity}x</p> <p class="price">@$${item.price} $${item.totalPrice} </p>
            <img src="assets/images/icon-remove-item.svg" id="botao-x">
            <hr>
          </none>
        `).join('')}
      </ul>
      </div>

        <div class="total"> 
        <span class="order">Order Total</span>
         ${cart.length > 0 ? `<h4>R$${cart.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2)}</h4>` : ''}
        </div>

      <div class="carbon">
      <img src="assets/images/icon-carbon-neutral.svg">
      This is <strong>carbon-neutral</strong> delivery
      </div>

      <div class="confirm">
      Confirm Order
      </div>
    `;
  }
});
