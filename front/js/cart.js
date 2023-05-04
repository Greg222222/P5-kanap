let selectedProducts = [];
let shoppingList = [];
let products = []

fetch("http://localhost:3000/api/products/?")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    shoppingList = JSON.parse(localStorage.getItem("produit"));
    shoppingList.forEach((itemLS) => {
      //
      console.log(itemLS.idProduct);
      // On fait une double boucle pour savoir si l'id dans le panier et l'id
      // de l'api correspondent.
      data.forEach((apiProduct) => {
        if (apiProduct._id === itemLS.idProduct) {
          console.log("trouvé " + apiProduct.name);
          showItems(itemLS, apiProduct);
          selectedProducts.push(apiProduct);
          itemLS.price = apiProduct.price;
          // totalPrice(itemLS, apiProduct);
        }
      });
    });
    showTotal(shoppingList);
  })
  .catch((error) => {
    console.log(error);
  });

function showItems(itemLS, apiProduct) {
  const cart = document.getElementById("cart__item");

  const cartArticle = document.createElement("article");
  cartArticle.classList.add("cart__item");
  cartArticle.setAttribute("data-id", itemLS.idProduct);
  cartArticle.setAttribute("data-color", itemLS.option);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("cart__item__img");

  const imageElement = document.createElement("img");
  imageElement.src = apiProduct.imageUrl;
  imageElement.alt = apiProduct.altTxt;

  const itemContent = document.createElement("div");
  itemContent.classList.add("cart__item__content");

  const itemDescription = document.createElement("div");
  itemDescription.classList.add("cart__item__content__description");

  const itemDescriptionName = document.createElement("h2");
  itemDescriptionName.innerText = apiProduct.name;

  const itemDescriptionColor = document.createElement("p");
  itemDescriptionColor.innerText = itemLS.option;

  const itemDescriptionPrice = document.createElement("p");
  itemDescriptionPrice.innerText = apiProduct.price + "€";

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity");

  const innerQuantityContainer = document.createElement("div");
  innerQuantityContainer.classList.add(
    "cart__item__content__settings__quantity"
  );

  const quantityText = document.createElement("p");
  quantityText.innerText = "Qté: ";

  const itemQuantity = document.createElement("input");
  itemQuantity.type = "number";
  itemQuantity.min = 1;
  itemQuantity.max = 100;
  itemQuantity.value = itemLS.quantity;

  const deleteElementContainer = document.createElement("div");
  deleteElementContainer.classList.add("cart__item__content__settings__delete");

  const deleteElement = document.createElement("p");
  deleteElement.innerText = "Supprimer";

  // deleteElement.forEach((deleteElement) => {
  // deleteElement.addEventListener("click", (event) => {
  // const parentElement = event.target.closest(".cart");
  // if (parentElement) {
  // parentElement.remove();
  // }
  // });
  // });

  cart.appendChild(cartArticle);
  imageContainer.appendChild(imageElement);
  cartArticle.appendChild(imageContainer);
  cartArticle.appendChild(itemContent);
  itemContent.appendChild(itemDescription);
  cartArticle.appendChild(quantityContainer);
  itemDescription.appendChild(itemDescriptionName);
  itemDescription.appendChild(itemDescriptionColor);
  itemDescription.appendChild(itemDescriptionPrice);
  quantityContainer.appendChild(innerQuantityContainer);
  quantityContainer.appendChild(deleteElementContainer);
  innerQuantityContainer.appendChild(quantityText);
  innerQuantityContainer.appendChild(itemQuantity);
  deleteElementContainer.appendChild(deleteElement);

  changeQuantity(itemQuantity); // pour modifier les quantités des produits
  removeElement(deleteElement);
}
// function removeElement(itemLS, apiProduct, selectedProducts) {
// selectedProducts = selectedProducts.filter((p) => p.id != itemLS.id);
// saveBasket(selectedProducts);
// }

// Fonction utile pour faire apparaître les modifications
function saveBasket(itemLS) {
  localStorage.setItem("produit", JSON.stringify(itemLS));
  showTotal(itemLS);
}

// Sert à changer la quantité, additionnée à la fonction saveBasket
function changeQuantity(itemQuantity) {
  itemQuantity.addEventListener("change", (event) => {
    const newQuantity = parseInt(event.target.value);
    const article = event.target.closest("article");
    const dataId = article.getAttribute("data-id");
    const dataColor = article.getAttribute("data-color");
    const index = shoppingList.findIndex(
      (itemLS) => dataId === itemLS.idProduct && dataColor === itemLS.option
    );
    console.log(index);
    if (index === -1) {
      return;
    } else {
      shoppingList[index].quantity = parseInt(newQuantity);
      saveBasket(shoppingList);
    }
  });
}
// Pour supprimer un élément du panier
function removeElement(deleteElement) {
  deleteElement.addEventListener("click", (event) => {
    const article = event.target.closest("article");
    const dataId = article.getAttribute("data-id");
    const dataColor = article.getAttribute("data-color");
    const index = shoppingList.findIndex(
      (itemLS) => dataId === itemLS.idProduct && dataColor === itemLS.option
    );
    console.log(index);
    if (index === -1) {
      return;
    } 
    else {
      const itemId = shoppingList[index].idProduct;
      const itemOption = shoppingList[index].option;
      const supressibleIndex = `${itemId}-${itemOption}`;
      localStorage.removeItem(supressibleIndex);
      shoppingList.splice(index, 1);
      saveBasket(shoppingList);
      console.log(shoppingList)
      const parentElement = event.target.closest(".cart__item");
      if (parentElement) {
      parentElement.remove();
      }
    }
  });
}
// Montre le prix total et la quantité totale dans le panier
function showTotal(shoppingList) {
  console.log(shoppingList);
  let totalItemsQuantity = 0;
  let totalCost = 0;
  for (let i = 0; i < shoppingList.length; i++) {
    totalItemsQuantity =
      parseInt(shoppingList[i].quantity) + parseInt(totalItemsQuantity);
    totalCost =
      parseInt(shoppingList[i].price * shoppingList[i].quantity) +
      parseInt(totalCost);
  }

  // shoppingList.forEach(function (product) {
  // totalCost = product.quantity * product.price;
  // });

  // const totalContainer = document.getElementsByClassName(".cart__price");
  // const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = totalItemsQuantity;
  totalPrice.innerHTML = totalCost;
}

// On vérifie tous les champs que l'utilisateur va remplir, question de sécurité
 // Cette regex est vraie uniquement s'il n'y a que des lettres et/ou "é"/"è"" ""ç"
  const regexLetters = /^[a-zA-Zéè ç]+$/
function checkNames(firstName) {
  return regexLetters.test(firstName)
}
function ckeckLastName(lastName) {
  return regexLetters.test(lastName)
}

function checkCity(city) {
  return regexLetters.test(city)
}

const regexLettersNumbers = /^[a-zA-Z0-9éè ç]+$/
function checkAddress(address) {
  return regexLettersNumbers.test(address)
}

function checkEmail(email) {
  // La regex de l'email est plus complexe car oblige certains caractères entre des champs de caracteres à remplir par l'utilisateur
  const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
}
// Fonction à utiliser quand l'utilisateur valide son panier
function validate() {
  const firstName = document.getElementById("firstName").value
  const email = document.getElementById("email").value;
  const lastName = document.getElementById("lastName").value;
  const city = document.getElementById("city").value;
  const address = document.getElementById("address").value;

  if (checkNames(firstName)) {
    document.getElementById("firstNameErrorMsg").innerHTML = ""
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "le prénom ne doit contenir que des lettres."
  }

  if (checkNames(lastName)) {
    document.getElementById("lastNameErrorMsg").innerHTML = ""
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "le nom ne doit contenir que des lettres."
  }

  if (checkCity(city)) {
    document.getElementById("cityErrorMsg").innerHTML = ""
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "La ville ne doit contenir que des lettres."
  }

  if (checkAddress(address)) {
    document.getElementById("addressErrorMsg").innerHTML = ""
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "L'adresse ne peut contenir que des lettres et des nombres."
  }

  if (checkEmail(email)) {
    document.getElementById("emailErrorMsg").innerHTML = ""
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "L'adresse email n'est pas bonne."
  }

  let contact = {
    firstName: firstName, 
    lastName: lastName, 
    city: city,
    address: address, 
    email: email
  }
  
  if (checkNames(firstName) && checkNames(lastName) && checkCity(city) && checkAddress(address) && checkEmail(email)) {
    console.log(JSON.stringify({contact, products}))
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({contact, products})
      })
      // Il faut retourner shoppingList et orderId
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
    }
}
// Ce qu'il se passe quand l'utilisateur clique sur le bouton valider
const submit = document.getElementById("order");
submit.addEventListener("click", (e) => {
  e.preventDefault()
  validate()
  shoppingList.forEach(element => {
    products.push(element)    
  });
})