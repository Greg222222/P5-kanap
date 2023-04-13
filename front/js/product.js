let params = new URLSearchParams(window.location.search);
console.log(params);
let id = params.get("id");
console.log(id);
// On récupère les objets de l'api
fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    productContent(data);
  })
  .catch((error) => {
    console.log(error);
  });

  //Fonction utilisée
  
function productContent(product) {

  // On remplit les balises déjà créées

  document.getElementById("title").innerHTML = product.name;
  document.getElementById("price").innerHTML = product.price;

  // On créé de nouvelles balises
  
  const descriptionElement = document.createElement("p");
  descriptionElement.innerText = product.description;
  descriptionElement.classList.add("productDescription");

  const imageElement = document.createElement("img");
  imageElement.src = product.imageUrl;
  imageElement.alt = product.altTxt;

  const divImage = document.querySelector(".item__img");
  divImage.appendChild(imageElement);

  document.getElementById("description").innerHTML = product.description;

  const colorsElement = document.getElementById("colors");

  // On montre les différentes options de couleurs différentes

  product.colors.forEach((color) => {
    const createColor = document.createElement("option");
    createColor.value = color;
    createColor.innerHTML = color;
    colorsElement.appendChild(createColor);
  });

  const articleElement = document.createElement("article");

  const sectionItems = document.querySelector(".items");
  articleElement.appendChild(descriptionElement);
}

  // Création de constante d'ajout au panier

const addToCart = document.getElementById("addToCart");

  // Message d'erreur

const messageErrorQuantity = document.createElement("div");
const containerMessageErrorQuantity = document.querySelector(
  ".item__content__settings__quantity"
);
containerMessageErrorQuantity.appendChild(messageErrorQuantity);

  // Initialisation du panier sous forme de tableau

let productLocalStorage = [];

  // Ce qui s'applique lorsque l'on va appuyer sur le bouton

addToCart.addEventListener("click", (event) => {
  // Le message d'erreur est supprimé pour que par défaut il n'y en ait pas, et qu'il s'efface au reclic si corrigé
  messageErrorQuantity.innerText = "";
  // Quantité correcte + Couleur sélectionnée, on peut envoyer au panier
  if (
    document.getElementById("quantity").value > 0 &&
    document.getElementById("quantity").value < 100 &&
    document.getElementById("colors").value.length !== 0
  ) {
    let selectedProduct = {
      idProduct: id,
      option: colors.value,
      quantity: quantity.value,
    };
    const products = JSON.parse(localStorage.getItem("produit"));
    // S'il y a quelque chose dans le panier, on vérifie que l'objet de soit pas déjà présent. 
    // S'il l'est on ajuste simplement la quantité
    if (products !== null) {
      const index = products.findIndex(
        (product) =>
          selectedProduct.idProduct === product.idProduct &&
          selectedProduct.option === product.option
      );
      console.log(index); // 3
      // index -1 veut dire qu'on a pas trouvé le produit
      if (index === -1) {
        products.push(selectedProduct);
        localStorage.setItem("produit", JSON.stringify(products));
      } else {
        console.log(products[index].quantity);
        //parseInt(products[index].quantity) += parseInt(selectedProduct.quantity);
        products[index].quantity = parseInt(products[index].quantity) + parseInt(selectedProduct.quantity)
        localStorage.setItem("produit", JSON.stringify(products));
      }
      // S'il n'était pas dans le panier on l'ajoute
    } else {
      productLocalStorage.push(selectedProduct);
      localStorage.setItem("produit", JSON.stringify(productLocalStorage));
    }
  }
  if (
    document.getElementById("quantity").value < 1 ||
    document.getElementById("quantity").value > 100
  ) {
    messageErrorQuantity.innerText =
      "Vous devez rentrer une quantité entre 1 et 100";
  }

  if (document.getElementById("colors").value.length === 0) {
    console.log("ça marche pas");
  }
});
