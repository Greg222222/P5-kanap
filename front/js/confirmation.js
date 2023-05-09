fetch("http://localhost:3000/api/products/order/")
.then((res) => res.json())
.then((data) => {
    tellCommandNumber(data)
})
function tellCommandNumber(data) {
orderId.innerText = data.orderId
}