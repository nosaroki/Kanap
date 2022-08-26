// Création d'une fonction pour récupérer les produits
let produits ;

/**
 * Fetch l'API des fournitures - Récupérer informations des produits
 * @returns array
 */
function getProduits(){
    return fetch("http://localhost:3000/api/products/")
    .then(res => {
        if(res.ok){
            return res.json();
        }
    })
    .catch(error => alert("Erreur de chargement des produits"));
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

/**
 * @param {*} canape 
 * @returns {HTMLElement}
 */
let buildCard = (canape) => { 
        // Afficher les liens
        let link = document.createElement("a");
        link.setAttribute("href", "product.html?id=" + canape._id);

        // Afficher les balises articles
        let article = document.createElement("article");
        link.appendChild(article);

        // Afficher les images
        let images = document.createElement("img");
        images.setAttribute("src", canape.imageUrl);
        images.setAttribute("alt", canape.altTxt);
        article.appendChild(images);

        // Afficher les h3
        let title = document.createElement("h3");
        title.innerHTML = canape.name;
        article.appendChild(title);

        // Afficher les p
        let description = document.createElement("p");
        article.appendChild(description);
        description.innerHTML = canape.description;

        return link;
}

fillProduits();