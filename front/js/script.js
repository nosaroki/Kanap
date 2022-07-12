// Création d'une constante pour récupérer les produits
const produits = document.getElementById('produits')

// Fetch l'API des fournitures

function getProducts(){
    return fetch('http://localhost:3000/api/furniture')
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



// Récupérer les détails des produits


// Récupérer le nom


// Récupérer le prix


// Récupérer l'image


// Récupérer la description


// Récupérer le texte alternatif





// function templateCard(product){
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
// }

// 



