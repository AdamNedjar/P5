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


// Fonction pour récupérer le contenu du panier depuis le localStorage
/*const getCart = () => {
  const cart = JSON.parse(localStorage.getItem('produits'));
  return cart !== null ? cart : [];
};

// Fonction pour afficher le contenu du panier dans la page Panier
async function fetchCart() {
  let localStorageProducts = getCart();
  let qtyTotal = 0;
  let priceTotal = 0;

  const sectionCart = document.querySelector('#cart__items');

  if (localStorageProducts.length === 0) {
    document.querySelector('h1').textContent = 'Le panier est vide !';
    document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`;
  } else {
    document.querySelector('h1').textContent = 'Voici votre panier !';
  }

  // Parcourir les produits dans le panier et les afficher
  for (let i = 0; i < localStorageProducts.length; i++) {
    let id = localStorageProducts[i].id;
    let color = localStorageProducts[i].color;
    let apiUrl = 'http://localhost:3000/api/products/' + id;

    // Récupérer les informations du produit depuis l'API avec fetch
    const response = await fetch(apiUrl);
    if (!response.ok) {
      // En cas d'erreur, afficher un message d'erreur
      const errorItem = `
        <article class="cart__item">
          <p>Erreur lors de la récupération des informations d'un produit.</p>
        </article>`;
      sectionCart.insertAdjacentHTML('beforeend', errorItem);
    } else {
      const data = await response.json();
      const itemPrice = data.price * localStorageProducts[i].qty;

      // Créer le contenu HTML de l'article du panier
      const cartItemHTML = `
        <article class="cart__item" data-id="${id}" data-color="${color}">
          <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>Couleur : ${color}</p>
              <p>Prix : ${itemPrice.toFixed(2)} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQty('${id}', '${color}', ${data.price}, this.value)" min="1" max="100" value="${localStorageProducts[i].qty}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" onclick="deleteItem('${id}', '${color}', ${data.price})">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;

      // Ajouter l'article au panier
      sectionCart.insertAdjacentHTML('beforeend', cartItemHTML);

      // Mettre à jour le total général
      qtyTotal += localStorageProducts[i].qty;
      priceTotal += itemPrice;
    }
  }

  // Mettre à jour les totaux affichés
  document.querySelector('#totalQuantity').textContent = qtyTotal;
  document.querySelector('#totalPrice').textContent = priceTotal.toFixed(2);
}

// Appeler la fonction fetchCart pour afficher le contenu du panier
fetchCart();*/