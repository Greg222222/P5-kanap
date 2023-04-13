let selectedProducts = [];

fetch("http://localhost:3000/api/products/?")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const shoppingList = JSON.parse(localStorage.getItem("produit"));
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
          totalPrice(itemLS, apiProduct)
        }
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

function showItems(itemLS, apiProduct) { 
  const cart = document.getElementById("cart__items")

  const cartArticle = document.createElement("article");
  cartArticle.classList.add("cart__item");
  cartArticle.setAttribute("data-id", itemLS.idProduct)
  cartArticle.setAttribute("data-color", itemLS.option)

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("cart__item__img");


  const imageElement = document.createElement("img");
  imageElement.src = apiProduct.imageUrl;
  imageElement.alt = apiProduct.altTxt;

  
  
  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity");

  const innerQuantityContainer = document.createElement("div");
  innerQuantityContainer.classList.add("cart__item__content__settings__quantity");

  const quantityText = document.createElement("p")
  quantityText.innerText = "Qté: "

  const itemQuantity = document.createElement("input")
  itemQuantity.type = "number"
  itemQuantity.min = 1
  itemQuantity.max = 100
  itemQuantity.value = itemLS.quantity


  cart.appendChild(cartArticle)
  imageContainer.appendChild(imageElement)
  cartArticle.appendChild(imageContainer) 
  cartArticle.appendChild(quantityContainer);
  quantityContainer.appendChild(innerQuantityContainer)
  innerQuantityContainer.appendChild(itemQuantity)
  innerQuantityContainer.appendChild(quantityText)

  



  // const contentElement = document.createElement("h2")
  // contentElement.innerText = apiProduct.name
  // const descriptionElement = document.querySelector("cart__item__content")
  // descriptionElement.appendChild(contentElement)

  // const nameElement = document.createElement("h2");
   // nameElement.innerText = apiProduct.name;
  //  const itemContent = document.querySelector(".name");
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

}
function totalPrice(itemLS, apiProduct) {
  let Price
  let quantity
}