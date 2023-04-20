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
function saveBasket(itemLS) {
  localStorage.setItem("produit", JSON.stringify(itemLS));
  showTotal(itemLS);
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

function changeQuantity(itemQuantity) {
  itemQuantity.addEventListener("change", (event) => {
    console.log("test");
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

// function totalPrice(itemLS, apiProduct) // {
//   let price = itemLS.price;
//   let quantity = itemLS.quantity;
//  }
