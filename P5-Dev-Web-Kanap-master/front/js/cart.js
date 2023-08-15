const cartItems = document.getElementById("cart__items");


function createTag(newTagName) {
    return document.createElement(newTagName);
  }
  
  const cart = JSON.parse(localStorage.getItem("addToCart")) || [];


const totalQuantityElement = document.getElementById("totalQuantity");
const displayedTotal = document.getElementById("totalPrice");
let removeButton;
let quantityInputField;
let getParentArticle;
let updatedProduct;

const eventListener = function () {
    quantityInputField = document.querySelectorAll(
      ".cart__item__content__settings__quantity > .itemQuantity"
    );
    quantityInputField.forEach((element) => {
      element.setAttribute("value", element.value);
      productQuantity += element.value;
      element.addEventListener("change", pushLocalStorageQuantity);
    });
    removeButton = document.querySelectorAll(".deleteItem");
    removeButton.forEach((element) => {
      element.addEventListener("click", removeFromCart);
    });
  };
  
  const getUnitQuantities = function () {
    quantityInputField.setAttribute("value", element.value);
  };
