document.addEventListener('DOMContentLoaded', () => {
  const cart = [];
  const cartElement = document.querySelector('.card');
  const products = document.querySelectorAll('.conteiner');
  const confirmButton = document.querySelector('.confirm');
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');
  document.body.appendChild(dialog);

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
            <li>
              <p class="name">${item.name}</p>
              <p class="quantidade">${item.quantity}x</p>
              <p class="price">@R$${item.price} R$${item.totalPrice}</p>
              <button class="remove-button" data-product-name="${item.name}">
                <img src="assets/images/icon-remove-item.svg" alt="Remover item">
              </button>
              <hr>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="total">
        <span class="order">Total do Pedido</span>
        ${cart.length > 0 ? `<h4>R$${cart.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2)}</h4>` : ''}
      </div>

      <div class="carbon">
        <img src="assets/images/icon-carbon-neutral.svg" alt="Entrega neutra em carbono">
        Esta é uma entrega <strong>neutra em carbono</strong>
      </div>

      <div class="confirm">
        Confirmar Pedido
      </div>
    `;

    const removeButtons = cartElement.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product-name');
        removeFromCart(productName);
      });
    });

    const confirmButton = cartElement.querySelector('.confirm');
    if (confirmButton) {
      confirmButton.addEventListener('click', () => {
        if (cart.length > 0) {
          showDialog();
        } else {
          alert('Seu carrinho está vazio.');
        }
      });
    }
  }

  function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
      cart.splice(productIndex, 1);

      const product = Array.from(products).find(prod => prod.getAttribute('data-product-name') === productName);
      if (product) {
        const quantityDisplay = product.querySelector('.quantity');
        quantityDisplay.innerText = '0';

        const increaseButton = product.querySelector('.increase');
        increaseButton.addEventListener('click', () => {
          let quantity = parseInt(quantityDisplay.innerText);
          quantity++;
          quantityDisplay.innerText = quantity;
          updateCart(product, quantity);
        });
      }
      renderCart();
    }
  }

  function showDialog() {
    dialog.innerHTML = `
    <div class="dialog">
      <img src="assets/images/icon-order-confirmed.svg" alt="confirmacao">
      <h5>Order confirmed</h5>
      <h6>Seu Carrinho</h6>

      <div class="card-list2">
        <ul>
          ${cart.map(item => `
            <li>
              <img class="product-image" src="./assets/images/image">
              <p class="name2">${item.name}</p>
              <p class="quantidade2">${item.quantity}x</p>
              <p class="price2">@R$${item.price} R$${item.totalPrice}</p>
              <hr class="linha">
            </li>
          `).join('')}
          <div class="total">
              <span class="order">Total do Pedido</span>
              ${cart.length > 0 ? `<h4>R$${cart.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2)}</h4>` : ''}
          </div>
        </ul>
      </div>
      <div class="confirm" id="confirm-order">Confirmar Pedido</div>
      <div class="cancel" id="cancel-order">Cancelar</div>
    </div>
    `;
    dialog.showModal();

    document.getElementById('confirm-order').addEventListener('click', () => {
      alert('Pedido confirmado!');
      dialog.close();
    });

    document.getElementById('cancel-order').addEventListener('click', () => {
      dialog.close();
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }
});

