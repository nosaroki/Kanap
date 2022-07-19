// Création d'une fonction pour récupérer les produits

let produits;

// Fetch l'API des fournitures
const getProduits = async () => {
    await fetch('http://localhost:3000/api/products') 
        .then(res => res.json())
        .then(JSON => produits = JSON) // transfo les données de l'API en json
        .catch((error) => console.error(error));
        console.log(produits)
};

// Récupérer les détails des produits
const fillProduits = async () => {  
    await getProduits();

    for (let i = 0; i < produits.length; i++) {

        let items = document.getElementById("items");

        // Afficher le lien
        let link = document.createElement("a");
        link.setAttribute('href', "product.html?id=" + produits[i]._id);
        items.appendChild(link);

        // Afficher la balise
        let article = document.createElement("article");
        link.appendChild(article);

        // Afficher l'image
        let images = document.createElement("img");
        images.setAttribute('src', produits[i].imageUrl);
        images.setAttribute('alt', produits[i].altTxt);
        article.appendChild(images);

        // afficher le h3
        let title = document.createElement("h3");
        title.innerHTML = produits[i].name;
        article.appendChild(title);

        // Afficher le p
        let description = document.createElement("p");
        article.appendChild(description);
        description.innerHTML = produits[i].description;
    }
};
fillProduits();



