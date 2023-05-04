console.log  ('coucou')
// On récupère tous les produits de l'api
    fetch('http://localhost:3000/api/products')
    // Une fois que c'est récupéré, on peut faire la suite
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        // Une boucle pour afficher chaque element
        data.forEach(element => {
            console.log (element)
            createBlocks (element)
        });
    })
    // Si erreur, on l'annonce
    .catch ((error) => {
        console.log(error)
    })

// Fonction utilisée sur chaque produit pour montrer tous les éléments
function createBlocks (product){
    // Pour renvoyer à la page du produit quand on clique dessus
    const linkElement = document.createElement("a");
    linkElement.href = "./product.html?id=" + product._id
    // Le nom
    const nameElement = document.createElement("h3");
    nameElement.innerText = product.name;
    nameElement.classList.add ("productName")
    // La description
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = product.description;
    descriptionElement.classList.add ("productDescription")
    // L'image
    const imageElement = document.createElement ("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = "azrer"
    // Balises parentes
    const articleElement = document.createElement("article");

    const sectionItems = document.querySelector(".items");
    // AppendChild sur tous les éléments pour  tous les afficher
    sectionItems.appendChild(linkElement);
    linkElement.appendChild(articleElement);
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nameElement);
    articleElement.appendChild(descriptionElement);
}

