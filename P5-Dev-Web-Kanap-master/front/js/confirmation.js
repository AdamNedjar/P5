// URLSearchParams : 
let url = new URLSearchParams(document.location.search);
let id = url.get("id");
const orderId = id;

//Affiche l'id du produit :
const ConfirmId = document.querySelector("#orderId");
ConfirmId.innerHTML =`${orderId}`;
  
//Vide le local storage :
localStorage.clear();