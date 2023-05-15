// retrieve the localStorage
var cart = JSON.parse(localStorage.getItem("cart")) ?? [];
const apiRoute = `http://localhost:3000/api/products`

//Initialise the cart at 0
function initialiseTotal() {
	const quantity = document.getElementById("totalQuantity")
	quantity.innerHTML = "0"
	const price = document.getElementById("totalPrice")
	price.innerHTML = "0"
}
initialiseTotal();

// display the cart in the cart section
function displayCart() {
	//create a new array with the product into localStorage
	let productsSelected = [];
	fetch(apiRoute).then((response) => response.json())
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
			addEventsHandler(productsSelected)
		})
}

// allow people to change the quantity of their article or delete an article from the cart
function addEventsHandler(products) {
	let deleteItemContainer = [...document.getElementsByClassName('deleteItem')];

	//allow people to remove an article from the cart
	deleteItemContainer.forEach((item, index) => {
		item.addEventListener('click', function (event) {
			let itemToRemove = deleteItemContainer[index].closest('.cart__item')
			products.splice(index, 1)
			itemToRemove.remove()
			cart = products;
			localStorage.setItem('cart', JSON.stringify(products))
			displayTotal(products)

		})
	})

	let quantityItemContainer = [...document.getElementsByClassName('itemQuantity')];

	// allow people to change the quantity
	quantityItemContainer.forEach((item, index) => {
		item.addEventListener("change", function (event) {

			if (event.target.value <= 0) {
				products[index].quantity = parseInt(0)
			} else {
				products[index].quantity = parseInt(event.target.value)
			}
			
			cart = products;
			localStorage.setItem('cart', JSON.stringify(products))
			displayTotal(products)

		})
	})
}

// display the total price of the cart
function displayTotal(filteredCart) {
	let totalQuantity = 0;
	let totalPrice = 0;
	// retrieve each products and calculate the price
	filteredCart.forEach((element) => {
		totalQuantity += parseInt(element.quantity)
		totalPrice += parseInt(element.price * element.quantity)
	})
	const quantity = document.getElementById("totalQuantity")
	quantity.innerHTML = totalQuantity
	const price = document.getElementById("totalPrice")
	price.innerHTML = totalPrice
}
displayCart();

//allows us to have a functional form, when all the input are filled and if there are products in the cart, you can submit your cart
const buttonOrder = document.getElementById('order');
buttonOrder.addEventListener('click', (event) => {
	event.preventDefault()

	const firstNameInput = document.getElementById('firstName')
	const nameInput = document.getElementById('lastName')
	const addressInput = document.getElementById('address')
	const cityInput = document.getElementById('city')
	const mailInput = document.getElementById('email')
	const firstNameErrorMsg = document.getElementById('firstNameErrorMsg')
	const lastNameErrorMsg = document.getElementById('lastNameErrorMsg')
	const addressErrorMsg = document.getElementById('addressErrorMsg')
	const cityErrorMsg = document.getElementById('cityErrorMsg')
	const emailErrorMsg = document.getElementById('emailErrorMsg')

	const globalRegex = /.{1,}/
	const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	let isError = false;

	// check if every inputs are good, if they are not, it displays an error message
	if (globalRegex.test(firstNameInput.value) === false) {
		isError = true;
		firstNameErrorMsg.innerHTML = "Veuillez rentrer un prénom valide"
	}

	if (globalRegex.test(nameInput.value) === false) {
		isError = true;
		lastNameErrorMsg.innerHTML = "Veuillez rentrer un nom valide"
	}

	if (globalRegex.test(addressInput.value) === false) {
		isError = true;
		addressErrorMsg.innerHTML = "Veuillez renseigner une adresse valide"
	}

	if (globalRegex.test(cityInput.value) === false) {
		isError = true;
		cityErrorMsg.innerHTML = "Veuillez renseigner une ville valide"
	}

	if (regexEmail.test(mailInput.value) === false) {
		isError = true;
		emailErrorMsg.innerHTML = "Veuillez renseigner une adresse mail valide"
	}

	if (cart.length === 0) {
		alert("Votre panier est vide")
	}

	if (!isError && (cart && cart.length > 0)) {
		// retrieve client information
		let contact = {
			firstName: firstNameInput.value,
			lastName: nameInput.value,
			address: addressInput.value,
			city: cityInput.value,
			email: mailInput.value,
		}

		// retrieve the products in the cart
		let products = [];
		for (let kanap of cart) {
			products.push(kanap.id);
		}

		let payload = { contact, products }

		// send the order to the API and display order ID into URL
		fetch(apiRoute + `/order`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		}).then((response) => response.json()).then((data) => {
			localStorage.clear()
			window.location.href = `confirmation.html?id=${data.orderId}`
		})
	}
})