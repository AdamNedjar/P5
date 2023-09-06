const params = new URL(document.location).searchParams
const id = params.get("id")

const url = `http://localhost:3000/api/products/${id}`
console.log(url)

const getArticle = async () => {
   const urlParams = new URLSearchParams(window.location.search);
   const id = parseInt(urlParams.get("id")); // Obtient l'ID à partir de l'URL
 
   if (isNaN(id)) {
     // Si l'ID n'est pas un nombre, redirigez vers la page d'accueil
     window.location.href = "index.html";
     return;

   }
const response = await fetch(url);

if(response.status !== 200) {
   window.location.href = "index.html";
   return;
}

const data = await response.json()


    document.getElementById("title").innerHTML= data.name
    document.getElementById("price").innerHTML= data.price
    const ajoutImage = document.createElement("img")
    ajoutImage.setAttribute("src", `${data.imageUrl}`)
    ajoutImage.setAttribute("alt", `${data.altTxt}`)
    ajoutImage.setAttribute("id", "image")
    document.querySelector(".item__img").appendChild(ajoutImage).setAttribute

    document.getElementById("description").innerHTML = data.description
    const ajoutOption = document.getElementById("colors")
    for (color in data.colors) {
        ajoutOption.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`
    }
console.log(data)
  
}
   const button = document.querySelector("#addToCart");
   button.addEventListener('click', ajouterAuxPanier);

   function ajouterAuxPanier(e) {
     
     e.preventDefault();

     let colors = document.querySelector('#colors').value;
     let quantity = document.querySelector('#quantity').value;
     let title = document.getElementById('title').innerHTML;
     let price = document.getElementById('price').innerHTML;
     let altTxt = document.getElementById("image").getAttribute('alt');
     let imageUrl = document.getElementById("image").getAttribute('src');
   
     
     if(colors == ''){
           alert('Veuillez sélectionner une couleur');
           return;
       }

       else if (quantity<1 || quantity>100){
           alert('Vous pouvez seulement sélectionner 1 à 100 produits');
           return;
       }
       
         alert(` Votre article a bien été ajouté au panier `);   
       
       
       const optionProduct = { 
         id: id,
         colors: colors,
         quantity: Number(quantity),
         title : title,
         price : Number(price),
         altTxt : altTxt, 
         imageUrl : imageUrl
       }

       
       let localStorageProducts = JSON.parse(localStorage.getItem("produits"));
       
       
       const popupConfirmation = () => {
       
       if (confirm("L'article à été ajouté au panier, allez au panier 🆗 ou revenir à la page d'accueil ❌")) {
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
           alert(" La quantité totale dépasse 100 ");
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



































































 