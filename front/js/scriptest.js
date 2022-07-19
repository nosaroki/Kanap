// Création d'une fonction pour récupérer les produits
let produits ;

// Fetch l'API des fournitures

function getProducts(){
    return fetch('http://localhost:3000/api/products')
    .then(res => {
        if(res.ok){
            return res.json();
        }
        else {
            console.log("ERREUR");
            document.getElementById('erreur').innerHTML = "Erreur de chargement des produits"
        }
    })
}

(async () => {
    var listeCanapes = await getProducts();
    listeCanapes.forEach(canape => {
        fillProduits(canape);
    });
     console.log(await getProducts());
})();

// Récupérer les détails des produits
const fillProduits = async() => {
    await getProducts();
    for (let i = 0; i < getProducts.lenght; i++) {
        let items = document.getElementById("items");

        // Afficher les liens
        let link = document.createElement("a");
        link.setAttribute('href', "product.html?id=" + produits[i]._id);
        items.appendChild(link);

        // Afficher les balises articles
        let article = document.createElement("article");
        link.appendChild(article);

        // Afficher les images
        let images = document.createElement("img");
        images.setAttribute('src', produits[i].imageUrl);
        images.setAttribute('alt', produits[i].altTxt);
        article.appendChild(images);

        // Afficher les h3
        let title = document.createElement("h3");
        title.innerHTML = produits[i].name;
        article.appendChild(title);

        // Afficher les p
        let description = document.createElement("p");
        article.appendChild(description);
        description.innerHTML = produits[i].description;
    }
};
fillProduits();





// Récupérer le prix


// Récupérer l'image



// Récupérer la description


// Récupérer le texte alternatif


// function templateCard(product){
//     console.log("coucou");
//     var template = document.querySelector("#card-product");
//     var containerCards = document.querySelector("#cards");
//     var clone = document.importNode(template.content, true);
//     //remplissage img
//     var img = clone.querySelector("img");
//     img.setAttribute('src', product.imageUrl);
//     //remplissage h2
//     var h2 = clone.querySelector("h2");
//     h2.textContent = product.name;
//     // remplissage h3
//     var h3 = clone.querySelector("h3");
//     h3.textContent = (product.price / 100 + "€" );
//     // remplissage a
//     var a = clone.querySelector("a");
//     a.setAttribute("href","/produit.html?id=" + product._id);


//     containerCards.appendChild(clone);
//     console.log(product);
// }

