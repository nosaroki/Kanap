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

    // // On ajoute la div qui contient la description
    let divDetails = document.createElement("div");
    divDetails.className = "cart__item__content";
    cartArticles.appendChild(divDetails);

    // // On ajoute la description
    let itemDescription = document.createElement("div");
    itemDescription.className = "cart__item__content__description";
    itemDescription.innerHTML = products[i].description;
    divDetails.appendChild(itemDescription);

    // // On ajoute le h2 pour le nom du canapé
    let itemTitle = document.createElement("h2");
    itemTitle.innerText = products[i].name;
    divDetails.appendChild(itemTitle);

    // // On ajoute le p pour la couleur du canapé
    let itemColor = document.createElement("p");
    itemColor.innerText = addProduct[i].color;
    divDetails.appendChild(itemColor);

    // // On ajoute le p pour le prix du canapé
    let itemPrice = document.createElement("p");
    itemPrice.innerText = products[i].price + "€";
    divDetails.appendChild(itemPrice);
  }
};
fetchProducts();
