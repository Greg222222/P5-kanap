let params = new URLSearchParams(window.location.search);
console.log(params);
let id = params.get("id");
console.log(id);


function tellCommandNumber() {
orderId.innerText = id
}
tellCommandNumber()