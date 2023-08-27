//Récuperer les données du local Storage
let localStorageProducts = JSON.parse(localStorage.getItem("produits"));

const panierClient = document.querySelector("cart")

if (localStorageProducts == null || localStorageProducts.length == 0) {
  document.querySelector('h1').textContent = 'Le panier est vide !';
  document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`;
}
else{
  let products = [];
}
