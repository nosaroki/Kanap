// Fonction pour récupérer les données de l'api
let products;
const fetchProducts = async () => {
  await fetch("http://localhost:3000/api/products") // on va chercher l'API avec la methode fetch
    .then((res) => res.json())
    .then((json) => (products = json)) // on fait une promesse en renvoyant la réponse au format JSON. // on définit un paramètre pour products en réutilisant .then
    .catch((error) => console.error(error));

  // On récupère le contenu du LS
  let addProduct = JSON.parse(localStorage.getItem("cart"));
  console.log(addProduct);

  const cartDisplay = async () => {
    if (addProduct) {
      // on récupere bien addProduct
      await addProduct;
    }
  };
  cartDisplay();

  // On créé une boucle pour afficher les canapés et leurs caractéristiques
  for (let i = 0; i < addProduct.length; i++) {
    let cartItems = document.getElementById("cart__items");

    // On ajoute l'element article
    let cartArticles = document.createElement("article");
    cartArticles.setAttribute("data-id", addProduct[i].id);
    cartArticles.setAttribute("data-color", addProduct[i].colors);
    cartArticles.className = "cart__item";
    cartItems.appendChild(cartArticles);

    // // On ajoute la div qui contient l'image
    let divImg = document.createElement("div");
    divImg.className = "cart__item__img";
    cartArticles.appendChild(divImg);

    // // On ajoute l'élément img à la div
    let cartImg = document.createElement("img");
    cartImg.setAttribute("src", products[i].imageUrl); // addProduct[i], produit, produits, divImg, cartArticles, cartItems, image, images
    cartImg.setAttribute("alt", products[i].altTxt);
    divImg.appendChild(cartImg);

    // // On ajoute la div qui contient les détails (div + h2 + p + p)
    let divDetails = document.createElement("div");
    divDetails.className = "cart__item__content";
    cartArticles.appendChild(divDetails);

    // // On ajoute le h2 pour le nom du canapé
    let itemTitle = document.createElement("h2");
    itemTitle.innerText = products[i].name;
    divDetails.appendChild(itemTitle);

    // // On ajoute la description
    let itemDescription = document.createElement("div");
    itemDescription.className = "cart__item__content__description";
    itemDescription.innerHTML = products[i].description;
    divDetails.appendChild(itemDescription);

    // // On ajoute le p pour la couleur du canapé
    let itemColor = document.createElement("p");
    itemColor.innerText = addProduct[i].color;
    divDetails.appendChild(itemColor);

    // // On ajoute le p pour le prix du canapé
    let itemPrice = document.createElement("p");
    itemPrice.innerText = products[i].price + "€";
    divDetails.appendChild(itemPrice);

    // On ajoute une div qui contient les settings
    let itemSettings = document.createElement("div");
    itemSettings.className = "cart__item__content__settings";
    cartArticles.appendChild(itemSettings);

    // On ajoute une div qui contient la quantité
    let itemSettingsQuantity = document.createElement("div");
    itemSettingsQuantity.className = "cart__item__content__quantity";
    itemSettings.appendChild(itemSettingsQuantity);

    // On ajoute un p pour afficher la quantité
    let itemQuantity = document.createElement("p");
    itemQuantity.innerHTML = "Quantité : ";
    itemSettingsQuantity.appendChild(itemQuantity);

    // On ajoute l'input pour la quantité
    let inputQuantity = document.createElement("input");
    itemQuantity.appendChild(inputQuantity);
    inputQuantity.value = addProduct[i].quantity;
    inputQuantity.className = "itemQuantity";
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("name", "itemQuantity");

    // On ajoute une div qui contiendra le bouton supprimer
    let divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    cartArticles.appendChild(divDelete);

    // On créer le bouton supprimer
    let deleteButton = document.createElement("p");
    deleteButton.className = "deleteItem";
    divDelete.appendChild(deleteButton);
    deleteButton.innerHTML = "Supprimer";
  }

  // Fin d'affichage des canapés dans le panier
  //
  //
  // On créer une fonction pour afficher la quantité totale de produits ainsi que le prix total

  const quantityAndPrice = () => {
      // On affiche la quantité totale
      let iQuantity = document.getElementsByClassName("itemQuantity"); // On l'associe à "itemQuantity"
      let productQuantity = iQuantity.length; // On store la quantité de canapés dans une variable
      totalQuantity = 0; // On initialise la quantité totale à 0

      for (let j = 0; j < productQuantity; j++) {
          totalQuantity += iQuantity[j].valueAsNumber; // On récupère la quantité dans le tableau
      }

      let quantityValue = document.getElementById ('totalQuantity'); // On l'associe à l'id totalQuantity
      quantityValue.innerHTML = totalQuantity; // 

      // On affiche le prix total
      totalPrice = 0; // On initialise le prix total à 0

      for (let k = 0; k < productQuantity; k++) {
          totalPrice += (iQuantity[k].valueAsNumber * products[k].price); // On indique que le prix total est égal à la quantité du produit * son prix
      }

      let itemTotalPrice = document.getElementById("totalPrice"); // On l'associe à l'id "totalPrice"
      itemTotalPrice.innerHTML = totalPrice;
};
quantityAndPrice();


};
fetchProducts();
