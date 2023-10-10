let localStorageProducts = JSON.parse(localStorage.getItem("produits")) || [];

if (localStorageProducts == null || localStorageProducts.length == 0) {
  document.querySelector("h1").textContent = "Le panier est vide !";
  document.querySelector(".cart__price").innerHTML = `<p>Total (<span id="totalQuantity">0</span> articles) : <span id="totalPrice">0</span> €</p>`;
} else if (localStorageProducts.length > 0) {
  for (product of localStorageProducts) {
    displayCart(product);
  }
}

// Fonction asynchrone pour récupérer les détails du produit depuis l'API
async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du produit:', error);
    throw error;
  }
}

async function displayCart(product) {
  const productList = document.getElementById("cart__items");

  // Appel à fetchProductDetails pour obtenir les informations manquantes
  const productDetails = await fetchProductDetails(product.id);

  productList.innerHTML += `
  <article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
    <div class="cart__item__img">
      <img src="${productDetails.imageUrl}" alt="${productDetails.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productDetails.name}</h2>
        <p>${product.colors}</p>
        <p>${productDetails.price}</p>
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
      

  updateCart();
  modifValue();
  saveCartData();
  addDeleteButtonsEventListeners();
}



// Déclaration d'une fonction pour calculer la quantité totale et le prix total
async function updateCart() {
  // Quantité totale et prix total
  let quantityTotalCalcul = 0;
  let priceTotalCalcul = 0;

  // Parcourez les articles dans le panier
  for (let i = 0; i < localStorageProducts.length; i++) {
    // Récupérez la quantité et le prix de l'article
    let quantityProduitDansLePanier = localStorageProducts[i].quantity;

// Appel à fetchProductDetails pour obtenir les informations manquantes
const productDetails = await fetchProductDetails(localStorageProducts[i].id);

    let priceProduitDansLePanier = productDetails.price * localStorageProducts[i].quantity;

    // Ajoutez à la quantité et au prix totaux
    quantityTotalCalcul += parseInt(quantityProduitDansLePanier);
    priceTotalCalcul += priceProduitDansLePanier;
  }

  // Affichez les totaux sur la page
  document.querySelector(".cart__price").innerHTML = `<p>Total (<span id="totalQuantity">${quantityTotalCalcul}</span> articles) : <span id="totalPrice">${priceTotalCalcul.toFixed(2)} €</span></p>`;
}





// Déclaration d'une fonction pour modifier la quantité des articles
function modifValue() {
  // Sélectionnez les éléments de quantité
  let inputQuantity = Array.from(document.querySelectorAll(".cart__item__content__settings__quantity input"));
  let valueQuantity = Array.from(document.querySelectorAll(".itemQuantity"));

  // Parcourez les éléments de quantité et ajoutez des écouteurs d'événements
  inputQuantity.forEach((input, i) => {
    input.addEventListener("change", () => {
      // Récupérez la nouvelle quantité entrée par l'utilisateur
      const newQuantity = parseInt(input.value);

      // Vérifiez si la nouvelle quantité est valide (entre 1 et 100)
      if (newQuantity >= 1 && newQuantity <= 100) {
        // Mettez à jour la quantité dans localStorage
        localStorageProducts[i].quantity = valueQuantity[i].value;

        // Mettez à jour le panier et les totaux sans recharger la page
        updateCart();
        // Sauvegardez instantanément les données du panier dans le localStorage
        saveCartData();
      } else {
        // Rétablissez la quantité précédente dans l'élément input
        input.value = localStorageProducts[i].quantity;

        // Affichez une alerte si la quantité n'est pas valide
        alert("La quantité d'un produit doit être entre 1 et 100 !");
      }
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
  updateCart();
  saveCartData();
  addDeleteButtonsEventListeners(); // Ajout de cet appel pour réattacher les écouteurs d'événements
}
  // Mise à jour du local storage
  localStorage.setItem("produits", JSON.stringify(localStorageProducts));

  // Mettez à jour le panier et les totaux sans recharger la page
  updateCart();

  // Sauvegardez instantanément les données du panier dans le localStorage
  saveCartData();


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
  // Validez la quantité de chaque produit dans le panier
  for (let i = 0; i < localStorageProducts.length; i++) {
    const quantity = localStorageProducts[i].quantity;
  }
  localStorage.setItem("produits", JSON.stringify(localStorageProducts));
}





// Fonction pour charger les données du panier depuis le localStorage
function loadCartData() {
  const cartDataJSON = localStorage.getItem("produits");

  if (cartDataJSON) {
    localStorageProducts = JSON.parse(cartDataJSON);
    products = [...localStorageProducts];
    // Mettez à jour le panier et les totaux après avoir chargé les données du panier
    updateCart();
    modifValue();
  }
}

  // Fonction pour ajouter des écouteurs d'événements pour les boutons de suppression
function addDeleteButtonsEventListeners() {
  const deleteButtons = document.querySelectorAll(".deleteItem");

  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", function() {
      deleteProduct(index);
  });
 });
}


// Événement lorsque la page est en cours de chargement
document.addEventListener("DOMContentLoaded", function () {
  loadCartData(); // Chargez les données du panier depuis le localStorage
  addDeleteButtonsEventListeners(); // Ajoutez des écouteurs d'événements pour les nouveaux boutons de suppression

});



/////// Formulaire ///////

// Sélection du bouton commander :
let btnSendForm = document.querySelector("#order");

// Écoute du bouton commander sur le click pour pouvoir contrôler, valider et envoyer le formulaire et les produits au back-end :
btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();
  //Affichage informatif
  if (localStorageProducts.length === 0) {
    //H1 informatif
    const emptyCart = document.querySelector("h1");
    emptyCart.textContent = "Votre panier est vide";
    //Masquer le formulaire
    const cartOrder = document.querySelector(".cart__order");
    cartOrder.style.display = "none";
    return;
  }

  // Récupération des valeurs du formulaire :
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  // Créez une variable pour stocker les messages d'erreur
  let errorMessages = [];

  function verifString(value, inputName, errorMsgItem) {
    if (
      /^([A-Za-zÀ-ÖØ-öø-ÿ\séè]{1,100})?([-]{0,1})?([A-Za-zÀ-ÖØ-öø-ÿ\séè]{1,100})$/.test(
        value
      )
    ) {
      document.querySelector(errorMsgItem).textContent = "";
    } else {
      const errorMsg = `Le champ ${inputName} est invalide !`;
      document.querySelector(errorMsgItem).textContent = errorMsg;
      errorMessages.push(errorMsg);
    }
  }

  function verifPrenom() {
    verifString(contact.firstName, "Prénom", "#firstNameErrorMsg");
  }

  function verifNom() {
    verifString(contact.lastName, "Nom", "#lastNameErrorMsg");
  }

  function verifAdresse() {
    const address = contact.address;
    if (
      /^([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})?([-]{0,1})?([A-Za-zÀ-ÖØ-öø-ÿ0-9\séè]{1,100})$/.test(
        address
      )
    ) {
      document.querySelector("#addressErrorMsg").textContent = "";
    } else {
      document.querySelector("#addressErrorMsg").textContent =
        "Le champ address est invalide !";
      errorMessages.push("Le champ address est invalide !");
    }
  }

  function verifVille() {
    verifString(contact.city, "Ville", "#cityErrorMsg");
  }

  function verifEmail() {
    const email = contact.email;
    if (
      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
        email
      )
    ) {
      document.querySelector("#emailErrorMsg").textContent = "";
    } else {
      document.querySelector("#emailErrorMsg").textContent =
        "Le champ email est invalide !";
      errorMessages.push("Le champ email est invalide !");
    }
  }

  // Validez chaque champ du formulaire
  verifPrenom();
  verifNom();
  verifAdresse();
  verifVille();
  verifEmail();

  document.addEventListener("DOMContentLoaded", function () {
    // Affichez les messages d'erreur dans l'interface utilisateur
    const errorMessagesContainer = document.querySelector("#errorMessages");
    errorMessagesContainer.innerHTML = errorMessages
      .map((msg) => `<p>${msg}</p>`)
      .join("");
  });

  // Contrôle de la validité du formulaire avant envoi au serveur :
  if (errorMessages.length === 0) {
    // Mettre l'objet "contact" dans le local storage :
    localStorage.setItem("contact", JSON.stringify(contact));
    sendToServer();
  }

  // Variable qui récupère l'orderId envoyé comme réponse par le serveur lors de la requête POST :
  var orderId = "";

  // Envoyer la requête POST au back-end
  function sendToServer() {
    // Construire le tableau de produits à partir de localStorageProducts
    let products = localStorageProducts.map((product) => product.id);
    // je mets les valeurs du formulaire et les produits sélectionnés dans un objet
    const sendFormData = {
      contact,
      products,
    };
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Ensuite on stock la réponse de l'api (orderId) :
      .then((response) => {
        return response.json();
      })

      .then((server) => {
        orderId = server.orderId;
        // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable :
        if (orderId != "") {
          alert("Votre commande à était prise en compte");
          location.href = "confirmation.html?id=" + orderId;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erreur lors de la commande. Veuillez réessayer !");
      });
  }
});