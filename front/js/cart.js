// retrieve the localStorage
const cart = JSON.parse(localStorage.getItem("cart"));
function initialiseTotal() {
    const quantity = document.getElementById("totalQuantity")
    quantity.innerHTML = "0"
    const price = document.getElementById("totalPrice")
    price.innerHTML = "0"
}
initialiseTotal();

function displayCart() {
    //create a new array with the product into localStorage
    let productsSelected = [];
    fetch(`http://localhost:3000/api/products`).then((response) => response.json())
        .then((data) => {
            // for each element in the api, it will play the two loops under
            data.forEach(element => {

                // for each object in cart, create of an object called selected article
                for (let i = 0; i < cart.length; i++) {
                    // if the cart id is the same of API ID then we push the article into the productsSelected array
                    if (cart[i].id === element._id) {
                        let selectedArticle = {
                            id: cart[i].id,
                            quantity: cart[i].quantity,
                            color: cart[i].color,
                            img: element.imageUrl,
                            imgAlt: element.altTxt,
                            price: element.price,
                            name: element.name,
                        };
                        productsSelected.push(selectedArticle)
                    }
                }
            });
            // display each product in the array productSelected
            for (let j in productsSelected) {
                const cartItems = document.getElementById('cart__items')
                cartItems.innerHTML += `<article class="cart__item" data-id='${productsSelected[j].id}' data-color='${productsSelected[j].color}'>
                <div class="cart__item__img">
                  <img src="${productsSelected[j].img}" alt="${productsSelected[j].imgAlt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productsSelected[j].name}</h2>
                    <p>${productsSelected[j].color}</p>
                    <p>${productsSelected[j].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsSelected[j].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> `
            }
            displayTotal(productsSelected)
        })
}
function displayTotal(filteredCart) {
    let totalQuantity = 0;
    let totalPrice = 0;
    filteredCart.forEach((element, index) => {
        totalQuantity += parseInt(element.quantity)
        totalPrice += parseInt(element.price * element.quantity)
    })
    const quantity = document.getElementById("totalQuantity")
    quantity.innerHTML = totalQuantity
    const price = document.getElementById("totalPrice")
    price.innerHTML = totalPrice
}
displayCart();