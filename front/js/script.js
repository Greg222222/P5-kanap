console.log  ('coucou')

    fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        data.forEach(element => {
            console.log (element)
            createBlocks (element)
        });
    })
    .catch ((error) => {
        console.log(error)
    })


function createBlocks (product){
    const linkElement = document.createElement("a");
    linkElement.href = "./product.html?id=" + product._id

    const nameElement = document.createElement("h3");
    nameElement.innerText = product.name;
    nameElement.classList.add ("productName")

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = product.description;
    descriptionElement.classList.add ("productDescription")

    const imageElement = document.createElement ("img");
    imageElement.src = product.imageUrl;
    imageElement.alt = "azrer"

    const articleElement = document.createElement("article");

    const sectionItems = document.querySelector(".items");
    sectionItems.appendChild(linkElement);
    linkElement.appendChild(articleElement);
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nameElement);
    articleElement.appendChild(descriptionElement);
}

