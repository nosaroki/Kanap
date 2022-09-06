// fonction pour récupérer les données de l'api
let products;
const fetchProducts = async () => {
    await fetch('http://localhost:3000/api/products') // on va chercher l'API avec la methode fetch 
        .then(res => res.json())
        .then(json => products = json) // on fait une promesse en renvoyant la réponse au format JSON. // on définit un paramètre pour products en réutilisant .then 
        .catch((error) => console.error(error));

 }

/**
 * Récupérer l'ensemble des canapés
 */
 const fillProduits = async() => {
    var canape = await getProduits(); // 
    console.log(canape);
    for (let i = 0; i < canape.length; i++) { // plutôt que de tout mettre à l'intérieur de for, découper avec buildCard pour un code plus clair
        let items = document.getElementById("items");
            console.log(items);
        items.appendChild(buildCard(canape[i]));
    }
};
  
let buildCardCart (canape) => {


}
  
  
  //à introduire dans la fonction de départ
  
  
        // let addProduct = JSON.parse(localStorage.getItem("prod")); // on recupere ce qu'il y a dans le local storage
    // console.log(addProduct);

    // const cartDisplay = async () => {

    //     if (addProduct) { // on récupere bien addProduct 
    //         await addProduct;
    //     }
    // };
    // cartDisplay();

// + fonction quantité totale // prix total // suppression



    

// function modifyCartNumbers() {
//   let productNumbers = localStorage.getItem("QuantityInCart");
//   productNumbers = parseInt(productNumbers);
//   let quantityInput = document.getElementById("quantity").value;
//   quantityInput = parseInt(quantityInput);
//   if (productNumbers) {
//     localStorage.setItem("QuantityInCart", productNumbers + quantityInput);
//   } else {
//     localStorage.setItem("QuantityInCart", quantityInput);
//   }
