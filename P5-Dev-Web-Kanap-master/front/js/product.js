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

     const urlParams = new URLSearchParams(window.location.search);
     const id = parseInt(urlParams.get("id")); // Obtenez l'ID à partir de l'URL
   
     if (isNaN(id)) {
       // Si l'ID n'est pas un nombre, redirigez vers la page d'accueil
       window.location.href = "index.html";
       return;

     }

     
     let colors = document.querySelector('#colors').value;
     let quantity = document.querySelector('#quantity').value;
     
     
     if(colors == ''){
           alert('⚠️Veuillez sélectionner une couleur⚠️');
           return;
       }

       else if (quantity<1 || quantity>100){
           alert('⚠️Vous pouvez seulement sélectionner 1 à 100 produits⚠️');
           return;
       }
       
         alert(`✅ Votre article a bien été ajouté au panier ✅`);   
       
       
       const optionProduct = { 
         id: id,
         colors: colors,
         quantity: Number(quantity),
       }

       
       let localStorageProducts = JSON.parse(localStorage.getItem("produits"));
       
       
       const popupConfirmation = () => {
       
       if (confirm("L'article à bien été ajouté au panier 🛒, consultez le panier 🆗 ou revenir à la page d'accueil ❌")) {
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
         const totalQuantity = item.quantity + optionProduct.quantity;
         if (totalQuantity <= 100) {
           item.quantity = totalQuantity;
           localStorage.setItem("produits", JSON.stringify(localStorageProducts));
           popupConfirmation();
           return;
         } else {
           alert("⚠️ La quantité totale dépasse 100 ⚠️");
           return;
         }
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





























































 