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
      </article>`;
}

// Déclaration d'une fonction pour calculer la quantité totale et le prix total
function updateCart() {
  // Quantité totale et prix total
  let quantityTotalCalcul = 0;
  let priceTotalCalcul = 0;

  // Parcourez les articles dans le panier
  for (let i = 0; i < localStorageProducts.length; i++) {
    // Récupérez la quantité et le prix de l'article
    let quantityProduitDansLePanier = localStorageProducts[i].quantity;
    let priceProduitDansLePanier = localStorageProducts[i].price * localStorageProducts[i].quantity;

    // Ajoutez à la quantité et au prix totaux
    quantityTotalCalcul += parseInt(quantityProduitDansLePanier);
    priceTotalCalcul += priceProduitDansLePanier;
  }

  // Affichez les totaux sur la page
  document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">${quantityTotalCalcul}</span> articles) : <span id="totalPrice">${priceTotalCalcul.toFixed(2)} €</span></p>`;
}

// Déclaration d'une fonction pour modifier la quantité des articles
function modifValue() {
  // Sélectionnez les éléments de quantité
  let inputQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"));
  let valueQuantity = Array.from(document.querySelectorAll('.itemQuantity'));

  // Parcourez les éléments de quantité et ajoutez des écouteurs d'événements
  inputQuantity.forEach((input, i) => {
    input.addEventListener("change", () => {
      // Mettez à jour la quantité dans localStorage
      localStorageProducts[i].quantity = valueQuantity[i].value;

      // Mettez à jour le panier et les totaux sans recharger la page
      updateCart();
    });
  });
}

// Fonction de suppression des articles
function deleteProduct(index) {
  // Supprimez l'article visuellement sur la page
  const cartItem = document.querySelector(`.cart__item[data-id="${localStorageProducts[index].id}"][data-color="${localStorageProducts[index].colors}"]`);
  cartItem.remove();

  // Supprimez l'article du tableau localStorageProducts
  localStorageProducts.splice(index, 1);

  // Mise à jour du local storage
  localStorage.setItem("produits", JSON.stringify(localStorageProducts));

  // Mettez à jour le panier et les totaux sans recharger la page
  updateCart();
}

// Fonction de mise à jour du panier
function updateCart() {
  // Quantité totale et prix total
  let quantityTotalCalcul = 0;
  let priceTotalCalcul = 0;

  // Parcourez les articles dans le panier
  for (let i = 0; i < localStorageProducts.length; i++) {
    // Récupérez la quantité et le prix de l'article
    let quantityProduitDansLePanier = localStorageProducts[i].quantity;
    let priceProduitDansLePanier = localStorageProducts[i].price * localStorageProducts[i].quantity;

    // Ajoutez à la quantité et au prix totaux
    quantityTotalCalcul += parseInt(quantityProduitDansLePanier);
    priceTotalCalcul += priceProduitDansLePanier;
  }

  // Affichez les totaux sur la page
  document.querySelector('.cart__price').innerHTML = `<p>Total (<span id="totalQuantity">${quantityTotalCalcul}</span> articles) : <span id="totalPrice">${priceTotalCalcul.toFixed(2)} €</span></p>`;
}

// Fonction de modification de la quantité des articles
function modifValue() {
  // Sélectionnez les éléments de quantité
  let inputQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"));
  let valueQuantity = Array.from(document.querySelectorAll('.itemQuantity'));

  // Parcourez les éléments de quantité et ajoutez des écouteurs d'événements
  inputQuantity.forEach((input, i) => {
    input.addEventListener("change", () => {
      // Mettez à jour la quantité dans localStorage
      localStorageProducts[i].quantity = valueQuantity[i].value;

      // Mettez à jour le panier et les totaux sans recharger la page
      updateCart();
    });
  });
}

// Pour chaque bouton de suppression, ajoutez un écouteur d'événements pour appeler la fonction de suppression
document.querySelectorAll(".deleteItem").forEach((button, index) => {
  button.addEventListener("click", () => {
    deleteProduct(index);
  });
});

// Appeler les fonctions pour mettre à jour le panier et les totaux au chargement de la page
updateCart();
modifValue();


// Fonction pour sauvegarder les données du panier dans le localStorage
function saveCartData() {
  localStorage.setItem('produits', JSON.stringify(localStorageProducts));
}

// Fonction pour charger les données du panier depuis le localStorage
function loadCartData() {
  const cartDataJSON = localStorage.getItem('produits');

  if (cartDataJSON) {
    localStorageProducts = JSON.parse(cartDataJSON);

    // Mettez à jour le panier et les totaux après avoir chargé les données du panier
    updateCart();
    modifValue();
  }
}

// Événement lorsque la page est en cours de chargement
document.addEventListener('DOMContentLoaded', function () {
  loadCartData(); // Chargez les données du panier depuis le localStorage

  // Sélectionnez les boutons de suppression
  const deleteButtons = document.querySelectorAll('.deleteItem');

  // Écoutez les clics sur les boutons de suppression
  deleteButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const cartItem = button.closest('.cart__item'); // Trouvez l'élément du panier parent
      cartItem.remove(); // Supprimez l'article du panier

      updateCart(); // Mettez à jour les totaux après la suppression
      saveCartData(); // Mettez à jour le localStorage après la suppression
    });
  });
});

// Événement avant de quitter la page
window.addEventListener('beforeunload', function () {
  saveCartData(); // Sauvegardez les données du panier dans le localStorage avant de quitter la page
});
