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



   




  







