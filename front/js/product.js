// Cette page présente un seul produit ; elle aura un menu déroulant permettant à l'utilisateur
// de choisir une option de personnalisation, ainsi qu’un input pour saisir la quantité. Ces éléments doivent être pris en compte dans le panier.

let idProduct = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
console.log(idProduct);
//Récupération des sélecteurs css et des id du HTML pour après
let picture     = document.querySelector(".item__img"); // on récupére le selecteur css pour pouvoir mettre l'image après
let title       = document.getElementById("title"); // on récupéré l'id title du document HTML
let price       = document.getElementById("price"); // on récupére l'id price du document HTML
let description = document.getElementById("description"); // on récupére l'id description du document HTML
let colorsArray = document.getElementById("colors"); // on récupére l'id description du document HTML

// fonction pour récuperer les données de l'api avec l'id du produit
let product;
const getProduct = async() => {
    await fetch("http://localhost:3000/api/products/" + idProduct) // on va chercher l'API avec la methode fetch et on ajoute notre variable qui contient l'id
    .then((res) => res.json()
    .then(json => product = json));      
};

getProduct(); // On appelle la fonction précédente pour récupérer les données de l'API

// fonction pour lier les élements HTML que l'on va créer avec les données de l'api
const showProduct = async() => { 
    await getProduct(); 

        // on ajoute les balises img pour y mettre les images
        let image = document.createElement("img");
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);
        picture.appendChild(image);

        // on ajoute le nom
        title.innerHTML = product.name;

        // on ajoute les prix
        price.innerHTML = product.price;

        // on ajout la description
        description.innerHTML = product.description;

        // On va chercher les couleurs du tableau colors avec une boucle for et on créait l'html
        for (let i=0; i < product.colors.length; i++) {

          let color = document.createElement("option");
          color.setAttribute('value', product.colors[i]);
          color.innerHTML = product.colors[i];
          colorsArray.appendChild(color);
        }

addBasket(product); // on déclare notre fonction et on récupere les parametres 
};
showProduct();

// fonction pour ajouter les articles dans le panier
const addBasket = () => {
  let button     = document.getElementById("addToCart"); // on stock l'id dans une variable
  const quantity = document.getElementById("quantity"); // on stock l'id dans une variable
  let prodArray  = JSON.parse(localStorage.getItem("prod")); // on utilise la méthode .parse pour les convertir en JSON 
  console.log(product);

  button.addEventListener("click", () => { // on ecoute la variable button au click, le code se déclenche au click
   
   if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && colors.value != 0) { // si la quantité est supérieur à 0 et que la quantité est inférieur ou égale à 100 et qu'il y a une couleur selectionnée, alors tu m'excutes le code si dessous. 
  
    // on récupere ce qu'il y a dans le local storage dans une variable avec un objet "prod"
  const addIdAndValue = Object.assign({}, product, { // on utilise la methode Object.assign pour ajouter 
     addIdProduct: `${idProduct}` , // on ajoute l'id
     addColors: `${colorsArray.value}` , // on ajoute la couleur selectionnée
     addQuantity: `${quantity.value}` , // on ajoute la quantité selectionnée
  });
  console.log(addIdAndValue);
  
  // fonction ajouter un produit séléctionné dans le local storage
  const addProductLocalStorage = () => {
    prodArray.push(addIdAndValue); // on push la const avec la methode .push 
    localStorage.setItem("prod", JSON.stringify(prodArray)); // On met "prod" dans le locale storage et on transforme "prodArray" en string dans notre local storage 
  };

  if (prodArray) { 
      console.log(prodArray);
  }

  else {
      prodArray = [];
      console.log(prodArray);
  }
  addBasket(prodArray, idProduct, colorsArray.value);
  // fonction pour ajouter un produit ou modifier la quantité dans le localstorage. 
  function addBasket (product, id, colors) { 

      let basket       = product;
      let foundProduct = basket.find(p => p.addIdProduct == id && p.addColors == colors);

      // si le produit est déja dans le localstorage
      if(foundProduct != undefined) {
         foundProduct.addQuantity++;
         console.log(foundProduct.addQuantity);
         localStorage.setItem("prod", JSON.stringify(prodArray));
      }
      // si le produit n'est pas dans le localstorage.
      else {
           
         addProductLocalStorage(); 
         console.log("ko");
              
      }
      alert("Le produit a été ajouté à votre panier");
    }
    
  }
  else { 
      alert("veuillez selectionner une couleur et une quantité comprise entre 1 et 100"); 
  }     
  });
};