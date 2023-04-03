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
                //create article
                const cartItem = document.createElement("article")
                cartItem.classList.add("cart__item")
                cartItem.setAttribute("data-id", `${productsSelected[j].id}`)
                cartItem.setAttribute("data-color", `${productsSelected[j].color}`)
                cartItems.appendChild(cartItem)

                // create images
                const imgItem = document.createElement('div')
                imgItem.classList.add('cart__item__img')
                cartItem.appendChild(imgItem)
                const image = document.createElement('img')
                image.setAttribute("src", productsSelected[j].img)
                image.setAttribute("alt", productsSelected[j].imgAlt)
                imgItem.appendChild(image)

                // create product information section
                const productContent = document.createElement("div")
                productContent.classList.add("cart__item__content")
                cartItem.appendChild(productContent)
                const productDescription = document.createElement("div")
                productDescription.classList.add("cart__item__content__description")
                productContent.appendChild(productDescription)

                //create name product
                const title = document.createElement("h2")
                title.textContent = productsSelected[j].name;
                productDescription.appendChild(title)

                //display color of the product selected
                const color = document.createElement('p')
                color.textContent = productsSelected[j].color;
                productDescription.appendChild(color)

                //display price of the product selected
                const price = document.createElement('p')
                price.textContent = productsSelected[j].price + " €";
                productDescription.appendChild(price)

                // create setting container
                const settings = document.createElement("div")
                settings.classList.add("cart__item__content__settings")
                productContent.appendChild(settings)

                //create quantity container
                const quantity = document.createElement("div")
                quantity.classList.add("cart__item__content__settings__quantity")
                settings.appendChild(quantity)

                // display quantity title
                const quantityTitle = document.createElement("p")
                quantityTitle.textContent = "Qté:"
                quantity.appendChild(quantityTitle)

                // show quantity selected
                const quantityNumber = document.createElement("input")
                quantityNumber.classList.add("itemQuantity")
                quantityNumber.setAttribute("value", productsSelected[j].quantity)
                quantity.appendChild(quantityNumber)

                // create delete setting container
                const deleteProduct = document.createElement("div")
                deleteProduct.classList.add("cart__item__content__settings__delete")
                settings.appendChild(deleteProduct)

                //display delete button
                const deleteButton = document.createElement("p")
                deleteButton.classList.add("deleteItem")
                deleteButton.textContent = "Supprimer"
                deleteProduct.appendChild(deleteButton)
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