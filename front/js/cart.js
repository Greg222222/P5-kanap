let selectedProducts = [];
let shoppingList = [];

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

  const dataId = cartArticle.getAttribute("data-id");
  const dataColor = cartArticle.getAttribute("data-color");

  itemQuantity.addEventListener("change", (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      itemLS.quantity = newQuantity;
      saveBasket();
    }
  });

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

  // const contentElement = document.createElement("h2")
  // contentElement.innerText = apiProduct.name
  // const descriptionElement = document.querySelector("cart__item__content")
  // descriptionElement.appendChild(contentElement)

  // const nameElement = document.createElement("h2");
  // nameElement.innerText = apiProduct.name;
  // const itemContent = document.querySelector(".name");
  // itemContent.appendChild(nameElement)

  // const colorElement = document.createElement("p");
  // colorElement.innerText = apiProduct.name + "\n" + itemLS.option + "\n" + apiProduct.price + "€" + "\n" + "quantité: " + itemLS.quantity;
  // const colorChoice = document.querySelector(".color-choice");
  // colorChoice.appendChild(colorElement)

  // const inputQuantity = document.getElementsByName("itemQuantity");

  // inputQuantity.value = itemLS.quantity

  // cart.appendChild(divImage, colorChoice)

  // document.getElementsByClassName("price").innerHTML = apiProduct.price
  // const priceElement = document.createElement("p");
  // priceElement.innerText = apiProduct.price;
  // const priceProduct = document.querySelector(".price");
  // priceProduct.appendChild(priceElement)

  // const quantityElement = document.createElement("p")
  // quantityElement.innerText = itemLS.quantity

  // const colorChoice = document.querySelector(".color-choice");
  // colorChoice.appendChild(colorElement)

  // function removeElement(itemLS, apiProduct, selectedProducts) {
  // selectedProducts = selectedProducts.filter((p) => p.id != itemLS.id);
  // saveBasket(selectedProducts);
  // }
  function saveBasket(itemLS) {
    localStorage.setItem("produit", JSON.stringify([itemLS]));
  }

  console.log(shoppingList);
  deleteElement.addEventListener("click", (event) => {
    const parentElement = event.target.closest("cart__item");
    const itemId = event.target.closest(".cart__item").getAttribute("data-id");
    const selectedItemIndex = shoppingList.findIndex((p) => p._id === itemId);
    if (selectedItemIndex > -1) {
      shoppingList.splice(selectedItemIndex);
      saveBasket(shoppingList);
      event.target.closest(".cart__item").remove();
      console.log("cliqué");
    }
    if (parentElement) {
      parentElement.remove();
      saveBasket();
    }
  });
}

function showTotal(shoppingList) {
  console.log(shoppingList)
  let totalItemsQuantity = 0;
  let totalCost = 0;
  for (let i = 0; i < shoppingList.length; i++) {
    totalItemsQuantity =
      parseInt(shoppingList[i].quantity) + parseInt(totalItemsQuantity);
    totalCost = parseInt(shoppingList[i].price * shoppingList[i].quantity) +
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

// function totalPrice(itemLS, apiProduct) // {
//   let price = itemLS.price;
//   let quantity = itemLS.quantity;
//  }
