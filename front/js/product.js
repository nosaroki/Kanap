// Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur
// de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces éléments doivent être pris en compte dans le panier.

/**
 * Récupérer l'idProduit avec les paramètres de l'URL
 */
let idProduit = new URL(window.location.href).searchParams.get("id");
console.log(idProduit);

/**
 * Récupérer l'id du canapé en passant par l'API
 */
let produit;
async function getProduit() {
  //récup API à laquelle on ajoute l'id
  await fetch("http://localhost:3000/api/products/" + idProduit)
    .then((res) => res.json().then((json) => (produit = json)))
    .catch((error) => alert("Erreur de chargement des produits"));
}

/**
 * Récupérer les détails des canapés
 */
let images = document.querySelector(".item__img");
let title = document.getElementById("title");
let price = document.getElementById("price");
let description = document.getElementById("description");
let colorsArray = document.getElementById("colors");

/**
 * Afficher les détails
 */
const showProduit = async () => {
  await getProduit();
  // Créer et remplir la balise image
  let image = document.createElement("img");
  image.setAttribute("src", produit.imageUrl);
  image.setAttribute("alt", produit.altTxt);
  images.appendChild(image);

  // Afficher le nom du canapé
  title.innerHTML = produit.name;

  // Afficher le prix du canapé
  price.innerHTML = produit.price;

  // Afficher la description du canapé
  description.innerHTML = produit.description;

  // Création d'une boucle pour récupérer les différentes possibilités de couleurs
  for (let i = 0; i < produit.colors.length; i++) {
    let color = document.createElement("option");
    color.setAttribute("value", produit.colors[i]);
    color.innerHTML = produit.colors[i];
    colorsArray.appendChild(color);
  }
};
showProduit();

/**
 * Ajouter la quantité, la couleur + idProduit dans le panier
 */

function addToBasket() {
  // créer une fonction qui permet de récupérer et d'afficher la couleur, la quantité choisies ainsi que l'idProduit
  console.log("hello");
  let color = document.getElementById("colors").value;
  let quantity = document.getElementById("quantity").value;
  console.log(color, quantity, idProduit);
  let productToAdd = {
    id: idProduit,
    color: color,
    quantity: quantity,
  };
  /**
   * Ajouter le tout dans le Local Storage
   */

  let productInCart = localStorage.getItem("cart");

  // Si le panier est vide aka = 0 article on créer un array
  console.log(productInCart);
   //////////////////
   if(quantity <= 0 || quantity > 100){
    alert("La quantité demandée n'est pas disponible.")
    return false;
  }
  if(productToAdd.color == ""){
    alert("Vous n'avez pas sélectionné de couleur.")
    return false;
  }
  //////////////////
  if (productInCart === null) {
    productInCart = [];
  } else {
    productInCart = JSON.parse(productInCart);
  }
  // On fait un find pour renvoyer le produit qui correspond à ces conditions
  console.log(productInCart);
  let productExists = productInCart.find(
    (product) =>
      product.id == productToAdd.id && product.color == productToAdd.color
  );
  console.log(productExists);

  if (productExists) {
    console.log("Le produit existe déjà.");
      productExists.quantity = parseInt(productExists.quantity) + parseInt(productToAdd.quantity);
      console.log(productExists.quantity);
      localStorage.setItem("cart", JSON.stringify(productToAdd));
  } 
  else {
    productInCart.push(productToAdd);
  }
 
  localStorage.setItem("cart", JSON.stringify(productInCart));
  alert("Votre produit a bien été ajouté au panier.");
}
let button = document.getElementById("addToCart");
button.addEventListener("click", function () {
  addToBasket();
});


