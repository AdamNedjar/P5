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
    products = [...localStorageProducts];
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


////// Formulaire ///////

localStorageProducts = JSON.parse(localStorage.getItem("produits")) || [];
let products = [];
// ...


//Sélection du bouton commander :
let btnSendForm = document.querySelector('#order');

//Écoute du bouton commander sur le click pour pouvoir contrôler, valider et envoyer le formulaire et les produits au back-end :
btnSendForm.addEventListener('click', (e) => {
  e.preventDefault();

  //Récupération des valeurs du formulaire :
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };


  function verifString(value, errorMsgItem, inputName) {     
    //Regex pour le contrôle des champs Prénom : 
    if (/^([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})?([-]{0,1})?([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})$/.test(value)) {
      document.querySelector(errorMsgItem).textContent = "";
      return true;
    } 
    else {
      document.querySelector(errorMsgItem).textContent = `Le champ ${inputName} est invalide !` ;
      return false;
    }
  }


  function verifPrenom() { 
    return verifString(contact.firstName, "#firstNameErrorMsg", "prénom");   
    //Regex pour le contrôle des champs Prénom :
    /*const firstName = contact.firstName;  
    let inputFirstName = document.querySelector("#firstName");
    if (/^([A-Za-z\s]{1,100})?([-]{0,1})?([A-Za-z]{1,100})$/.test(firstName)) {
      document.querySelector("#firstNameErrorMsg").textContent = "";
      return true;
    } 
    else {
      document.querySelector("#firstNameErrorMsg").textContent = "Le champ Prénom est invalide !";
      return false;
    }*/
  }

  function verifNom() {     
    return verifString(contact.lastName, "#lastNameErrorMsg", "nom"); 
    //Regex pour le contrôle des champs Nom :
    /*const lastName = contact.lastName; 
    let inputLastName = document.querySelector("#lastName"); 
    if (/^([A-Za-z\s]{1,100})?([-]{0,1})?([A-Za-z]{1,100})$/.test(lastName)) {
      document.querySelector("#lastNameErrorMsg").textContent = "";
      return true;
    } 
    else {
      document.querySelector("#lastNameErrorMsg").textContent = "Le champ Nom est invalide !";
      return false;
    }*/
  }

  function verifAdresse() {     
    return verifString(contact.address, "#addressErrorMsg", "adresse");
    // Regex pour le contrôle des champs adresse :
    /*const adresse = contact.address;  
    let inputAddress = document.querySelector("#address");
    if (/^([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})?([-]{0,1})?([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})$/.test(adresse)) {
      document.querySelector("#addressErrorMsg").textContent = "";
      return true;
    } 
    else {
      document.querySelector("#addressErrorMsg").textContent = "Le champ Adresse est invalide !";
      return false;
    }*/
  }

  function verifVille() {     
    return verifString(contact.city, "#cityErrorMsg", "ville"); 
    //Regex pour le contrôle des champs Ville :
    /*const city = contact.city;  
    let inputCity = document.querySelector("#city");
    if (/^([A-Za-z\s]{1,100})?([-]{0,1})?([A-Za-z]{1,100})$/.test(city)) {
      document.querySelector("#cityErrorMsg").textContent = "";
      return true;
    } 
    else {
      document.querySelector("#cityErrorMsg").textContent = "Le champ Ville est invalide !";
      return false;
    }*/
  }

  function verifEmail() {     
    //Regex pour le contrôle des champs Email :
    const email = contact.email;  
    let inputMail = document.querySelector("#email");
    if (/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(email)) {
      document.querySelector("#emailErrorMsg").textContent = "";
      return true;
    } 
    else {
      document.querySelector("#emailErrorMsg").textContent = "Le champ email est invalide !";
      return false;
    }
  }

  //Contrôle validité formulaire avant envoi dans le local storage : 
  if (verifPrenom() && verifNom() && verifAdresse() && verifVille() && verifEmail()) {
    //Mettre l'objet "contact" dans le local storage :
    localStorage.setItem("contact", JSON.stringify(contact));

 // Mettre à jour la variable "products" avec les données actuelles du panier
 products = localStorageProducts.map(item => {
  return {
    id: item.id,
    quantity: item.quantity
  };
});

    sendFromToServer(products);
  } 
  /*else {
    alert("Veillez bien remplir le formulaire");
  }*/

});
  
