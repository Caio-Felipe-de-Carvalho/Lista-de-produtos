  // Variáveis para controlar a quantidade
const decreaseButton = document.querySelector('.decrease');
const increaseButton = document.querySelector('.increase');
const quantityDisplay = document.querySelector('.quantity');

// Inicializando a quantidade
let quantity = 0;

// Função para aumentar a quantidade
increaseButton.addEventListener('click', () => {
  quantity++;
  quantityDisplay.innerText = quantity;
});

// Função para diminuir a quantidade
decreaseButton.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.innerText = quantity;
  }
});
