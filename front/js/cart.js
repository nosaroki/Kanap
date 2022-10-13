// Fonction pour récupérer les données de l'api
let products;
const fetchProducts = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((json) => (products = json)) // On fait une promesse en renvoyant la réponse au format JSON
    .catch((error) => alert("Erreur de chargement du panier"));

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
    let canapAPI = products.find((p) => p._id == addProduct[i].id);
    console.log(canapAPI);
    let cartItems = document.getElementById("cart__items");

    // On ajoute l'element article
    let cartArticles = document.createElement("article");
    cartArticles.setAttribute("data-id", addProduct[i].id);
    cartArticles.setAttribute("data-color", addProduct[i].color);
    cartArticles.className = "cart__item";
    cartItems.appendChild(cartArticles);

    // // On ajoute la div qui contient l'image
    let divImg = document.createElement("div");
    divImg.className = "cart__item__img";
    cartArticles.appendChild(divImg);

    // // On ajoute l'élément img à la div
    let cartImg = document.createElement("img");
    cartImg.setAttribute("src", canapAPI.imageUrl); // addProduct[i], produit, produits, divImg, cartArticles, cartItems, image, images
    cartImg.setAttribute("alt", canapAPI.altTxt);
    divImg.appendChild(cartImg);

    // // On ajoute la div qui contient les détails (div + h2 + p + p)
    let divDetails = document.createElement("div");
    divDetails.className = "cart__item__content";
    cartArticles.appendChild(divDetails);

    // // On ajoute le h2 pour le nom du canapé
    let itemTitle = document.createElement("h2");
    itemTitle.innerText = canapAPI.name;
    divDetails.appendChild(itemTitle);

    // // On ajoute le p pour la couleur du canapé
    let itemColor = document.createElement("p");
    itemColor.innerText = addProduct[i].color;
    divDetails.appendChild(itemColor);

    // // On ajoute le p pour le prix du canapé
    let itemPrice = document.createElement("p");
    itemPrice.innerText = canapAPI.price + "€";
    divDetails.appendChild(itemPrice);

    // On ajoute une div qui contient les settings
    let itemSettings = document.createElement("div");
    itemSettings.className = "cart__item__content__settings";
    divDetails.appendChild(itemSettings);

    // On ajoute une div qui contient la quantité
    let itemSettingsQuantity = document.createElement("div");
    itemSettingsQuantity.className = "cart__item__content__settings__quantity";
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

    // Fin d'affichage des canapés dans le panier
    //
    //
    // On créé une fonction pour afficher la quantité totale de produits ainsi que le prix total

    const quantityAndPrice = () => {
      // On affiche la quantité totale
      let iQuantity = document.getElementsByClassName("itemQuantity"); // On l'associe à "itemQuantity"
      let productQuantity = iQuantity.length; // On store la quantité de canapés dans une variable
      totalQuantity = 0; // On initialise la quantité totale à 0

      for (let j = 0; j < productQuantity; j++) {
        totalQuantity += iQuantity[j].valueAsNumber; // On récupère la quantité dans le tableau
      }

      let quantityValue = document.getElementById("totalQuantity"); // On l'associe à l'id totalQuantity
      quantityValue.innerHTML = totalQuantity; //

      // On affiche le prix total
      totalPrice = 0; // On initialise le prix total à 0

      for (let k = 0; k < productQuantity; k++) {
        totalPrice += iQuantity[k].valueAsNumber * products[k].price; // On indique que le prix total est égal à la quantité du produit * son prix
      }

      let itemTotalPrice = document.getElementById("totalPrice"); // On l'associe à l'id "totalPrice"
      itemTotalPrice.innerHTML = totalPrice;
    };
    quantityAndPrice();

    // On créé une fonction pour modifier la quantité des produits dans le panier

    const changeQuantity = () => {
      let modifyQuantity = document.querySelectorAll(".itemQuantity");

      for (let l = 0; l < modifyQuantity.length; l++) {
        modifyQuantity[l].addEventListener("change", (e) => {
          console.log(e.target.value);
          console.log(
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute(
              "data-id"
            )
          );

          let newQuantity = e.target.value;
          let colorProduct =
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute(
              "data-color"
            );
          let idProduct =
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute(
              "data-id"
            );
          let indexCanap = addProduct.findIndex(
            (canap) => canap.id == idProduct && canap.color == colorProduct
          );
          addProduct[indexCanap].quantity = newQuantity;
          /////////////////
          if (newQuantity <= 0 || newQuantity > 100) {
            alert("La quantité demandée n'est pas disponible.");
          }
          /////////////////
          console.log(addProduct);

          quantityAndPrice(); // On appelle la fonction Q&P pour qu'elle se mette à jour
          console.log(totalQuantity);

          localStorage.setItem("cart", JSON.stringify(addProduct)); // On modifie la quantité dans le LS
        });
      }
    };
    changeQuantity();
    // Quant on clique sur le changement de quantité, il faut qu'on récupère l'id + couleur + quantité du canap (parentElement + target.element)

    // On créé une fonction pour supprimer un produit

    const deleteProduct = () => {
      deleteButton.addEventListener("click", (event) => {
        // On cible l'élément en fonction de son id et de sa couleur
        let deleteId = addProduct[i].idProduit;
        let deleteColor = addProduct[i].color;

        addProduct = addProduct.filter(
          (element) =>
            element.idProduit !== deleteId || element.color !== deleteColor
        );
        localStorage.setItem("cart", JSON.stringify(addProduct)); // On modifie la quantité dans le LS

        alert("Le produit a bien été supprimé du panier");
        event.target.parentNode.parentNode.remove(); // Refresh de la page
        quantityAndPrice();
      });
    };
    deleteProduct();
  }
};

fetchProducts();

/**
 * On créer les RegEx pour le formulaire
 */
function validForm() {
  function makeForm() {
    let form = document.querySelector("form");

    // On définit les expressions régulières à utiliser

    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp(
      "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
    );
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
    );

    // On écoute la modification du prénom
    form.firstName.addEventListener("change", function () {
      validFirstName(this);
    });

    // On valide le prénom
    const validFirstName = function (inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (charRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = "";
      } else {
        firstNameErrorMsg.innerHTML = "Votre prénom n'est pas valide";
      }
    };

    // // On écoute la modification du nom
    form.lastName.addEventListener("change", function () {
      validLastName(this);
    });

    // On valide le nom
    const validLastName = function (inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (charRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = "";
      } else {
        lastNameErrorMsg.innerHTML = "Votre nom n'est pas valide";
      }
    };

    // On écoute la modification de l'adresse
    form.address.addEventListener("change", function () {
      validAddress(this);
    });

    // On valide l'adresse
    const validAddress = function (inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = "";
      } else {
        addressErrorMsg.innerHTML = "Votre adresse n'est pas valide";
      }
    };

    // On écoute la modification de la ville
    form.city.addEventListener("change", function () {
      validCity(this);
    });

    // On valide la ville
    const validCity = function (inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (charRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = "";
      } else {
        cityErrorMsg.innerHTML = "Votre ville n'est pas valide";
      }
    };

    // On écoute la modification de l'email
    form.email.addEventListener("change", function () {
      validEmail(this);
    });

    // On valide l'email
    const validEmail = function (inputEmail) {
      let emailErrorMsg = inputEmail.nextElementSibling;

      if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = "";
      } else {
        emailErrorMsg.innerHTML = "Votre adresse e-mail n'est pas valide";
      }
    };
  }
  makeForm();

  /**
   * On récupère les infos renseignées dans le form pour les mettre dans le LS
   */

  let addProduct = JSON.parse(localStorage.getItem("cart"));
  let form = document.querySelector("form");

  //Ecouter le panier

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // form.reportValidity;

    //Récupération des coordonnées du formulaire client
    let inputFirstName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAddress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputEmail = document.getElementById("email"); 
    
    ///////////////
    //On teste les inputs avec les RegExp
    // inputFirstName.value.reportValidity,
    // inputLastName.value.reportValidity,
    // inputAddress.value.reportValidity,
    // inputCity.value.reportValidity,
    // inputEmail.value.reportValidity
    ///////////////////

    //Construction d'un array depuis le local storage
    let orderedProducts = [];
    for (let i = 0; i < addProduct.length; i++) {
      orderedProducts.push(addProduct[i].id);
    }
    console.log(orderedProducts);

    const order = {
      products: orderedProducts,
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
    };
    const options = {
      method: "POST", // Pour transmettre les informations/données de l'utilisateur
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    };
    /////////////////

    // let contactRegexEnd = true;
    // for (let j = 0; j < order.length; j++) {
    //   if (order[j] == false) contactRegexEnd = false;
    // }
    // if (contactRegexEnd == true) {
      /////////////////
      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.clear();
          document.location.href = "confirmation.html?id=" + data.orderId; // On passe l'id de commande dans l'URL
        })
        .catch((err) => {
          alert(
            "une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer"
          );
        });
    // }
  });
}
validForm();

// if (order != 0){}
// if (products != 0 && contact != 0){}
