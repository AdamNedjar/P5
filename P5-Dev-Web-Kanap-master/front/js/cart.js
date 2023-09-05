let localStorageProducts = JSON.parse(localStorage.getItem("produits")) || [];

  if (localStorageProducts == null || localStorageProducts.length == 0) {
    document.querySelector('h1').textContent = 'Le panier est vide !';
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`;
  }
  else if (localStorageProducts.length > 0) {
    console.log(localStorageProducts);
    for (product of localStorageProducts) {
      displayCart(product);
    }
  }
    
function displayCart(product) {
  const indexProduct = localStorageProducts.indexOf(product);
  const productList = document.getElementById("cart__items");

  productList.innerHTML += `
  <article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.title}</h2>
      <p>${product.colors}</p>
      <p>${product.price}</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`
}

// Récupérez la liste des produits dans le panier depuis le stockage local
 localStorageProducts = JSON.parse(localStorage.getItem("produits")) || [];

// Fonction pour mettre à jour le panier et l'affichage
function updateCartAndDisplay() {
  // Mise à jour de l'affichage du panier
  refreshCartDisplay();

  // Mettez à jour le stockage local avec les données mises à jour
  localStorage.setItem("produits", JSON.stringify(localStorageProducts));
}

// Fonction pour mettre à jour l'affichage du panier
function refreshCartDisplay() {
  const cartItemsSection = document.getElementById("cart__items");
  const totalQuantityElement = document.getElementById("totalQuantity");
  const totalPriceElement = document.getElementById("totalPrice");
  
  let totalPrice = 0;
  let totalQuantity = 0;

  cartItemsSection.innerHTML = '';

  for (const product of localStorageProducts) {
    displayCart(product);

    const productPrice = parseFloat(product.price) * product.quantity;
    totalPrice += productPrice;
    totalQuantity += product.quantity;
  }

  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = totalPrice.toFixed(2) + " €";
}

// Fonction pour ajouter un produit au panier
function addToCart(product) {
  localStorageProducts.push(product);
  updateCartAndDisplay();
}

// Fonction pour mettre à jour la quantité d'un produit dans le panier
function updateProductQuantity(productId, newQuantity) {
  const productToUpdate = localStorageProducts.find(product => product.id === productId);

  if (productToUpdate) {
    productToUpdate.quantity = newQuantity;
    updateCartAndDisplay();
  }
}

// Fonction pour supprimer un produit du panier
function removeProductFromCart(productId) {
  localStorageProducts = localStorageProducts.filter(product => product.id !== productId);
  updateCartAndDisplay();
}

// Ajoutez un gestionnaire d'événements pour les éléments d'entrée de quantité
document.querySelectorAll('.itemQuantity').forEach(function(quantityInput) {
  quantityInput.addEventListener('change', function() {
    const productId = this.closest('.cart__item').getAttribute('data-id');
    const newQuantity = parseInt(this.value);
    updateProductQuantity(productId, newQuantity);
  });
});

// Ajoutez un gestionnaire d'événements pour le bouton "Supprimer"
document.querySelectorAll('.deleteItem').forEach(function(deleteButton) {
  deleteButton.addEventListener('click', function() {
    const productId = this.closest('.cart__item').getAttribute('data-id');
    removeProductFromCart(productId);
  });
});

// Initialisez l'affichage du panier lors du chargement de la page
updateCartAndDisplay();








   




  







