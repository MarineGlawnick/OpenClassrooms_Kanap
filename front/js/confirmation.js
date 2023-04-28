// retrive confirmation id from the URL
const PARAMS = new URLSearchParams(window.location.search);
const CARTID = PARAMS.get("id");

// display the order ID on the page
function displayCartId() {
const orderContainer = document.getElementById('orderId')
orderContainer.innerHTML = CARTID
}

displayCartId()