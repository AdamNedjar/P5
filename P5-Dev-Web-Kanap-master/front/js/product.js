const params = new URL(document.location).searchParams
const id = params.get("id")

const url = `http://localhost:3000/api/products/${id}`
console.log(url)

const getArticle = () => {
    fetch(url)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
       console.log(data)
    const ajoutTitre = (document.getElementById("title").innerHTML= data.name)
    const ajoutPrix = (document.getElementById("price").innerHTML= data.price)
    const ajoutImage = document.createElement("img")
    document.querySelector(".item__img").appendChild(ajoutImage)
    ajoutImage.setAttribute("src", `${data.imageUrl}`)

    const ajoutDescription = (document.getElementById("description").innerHTML = data.description)
    const ajoutOption = document.getElementById("colors")
    for (color in data.colors) {
        ajoutOption.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`
    }

   }
)}

   const button = document.querySelector("#addToCart");
   button.addEventListener('click', ajouterAuxPanier);

   function ajouterAuxPanier(e) {
     
     e.preventDefault();
     
     let colors = document.querySelector('#colors').value;
     let quantity = document.querySelector('#quantity').value;
     
     
     if(colors == ''){
           alert('⚠️Veuillez sélectionner une couleur⚠️');
           return;
       }

       else if (quantity<1){
           alert('⚠️Veuillez sélectionner le nombre d\'articles souhaités⚠️');
           return;
       }

      
       else if (quantity>100){
         alert('⚠️Vous pouvez seulement sélectionner 1 à 100 produits.⚠️');
         return;
       }
       
       
       else{
         alert('✅ Votre article ' + name + ' a bien été ajouté au panier ✅');   
       }
       
       const optionProduct = { 
         id: id,
         colors: colors,
         quantity: Number(quantity),
       }

       
       let localStorageProducts = JSON.parse(localStorage.getItem("produits"));
       
       
       const popupConfirmation = () => {
       
       if (confirm("L'article " + name + " à bien été ajouté au panier 🛒, consultez le panier 🆗 ou revenir à la page d'accueil ❌")) {
         window.location.href = "cart.html";
       }
       
       else{
         window.location.href = "index.html";
       }
     }
     
   
     if (localStorageProducts) {
      
       let item = localStorageProducts.find(
         (item) =>
         item.id == optionProduct.id && item.colors == optionProduct.colors
       );
         
         
         if (item) {
           item.quantity = item.quantity + optionProduct.quantity;
           localStorage.setItem("produits", JSON.stringify(localStorageProducts));
           popupConfirmation();
           return;
       }

       localStorageProducts.push(optionProduct);
       localStorage.setItem("produits", JSON.stringify(localStorageProducts));
       popupConfirmation();
     } 
     
     else {
       let newTabLocalStorage = [];
       newTabLocalStorage.push(optionProduct);
       localStorage.setItem("produits", JSON.stringify(newTabLocalStorage));
       popupConfirmation();
     }
   }
 

getArticle()





























































 