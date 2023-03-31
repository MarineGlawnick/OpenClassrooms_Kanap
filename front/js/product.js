const PARAMS = new URLSearchParams(window.location.search);
const PRODUCTID = PARAMS.get("id");

/*Render information product by using product into URL */
function retrieveData() {
    fetch(`http://localhost:3000/api/products/${PRODUCTID}`)
        .then((response) => response.json())
        .then((data) => {
            /*render image*/
            let kanapImage = document.getElementsByClassName('item__img')[0];
            let imageElement = document.createElement('img');
            imageElement.src = data.imageUrl;
            imageElement.alt = data.altTxt;
            kanapImage.appendChild(imageElement);

            /*render title*/
            let kanapName = document.getElementById('title');
            let contentName = document.createTextNode(data.name);
            kanapName.appendChild(contentName);

            /*render description*/
            let kanapDescription = document.getElementById('description');
            let contentDescription = document.createTextNode(data.description);
            kanapDescription.appendChild(contentDescription);

            /*render price*/
            let kanapPrice = document.getElementById('price');
            let contentPrice = document.createTextNode(data.price);
            kanapPrice.appendChild(contentPrice);

            /*render colors*/
            let kanapColors = document.getElementById('colors');
            let colors = data.colors;
            for (let color in colors) {
                let options = document.createElement('option')
                options.value = colors[color];
                options.text = colors[color];
                kanapColors.appendChild(options)
            }

        })
}
retrieveData()

//check if the product is well selected
function isProductWellSelected() {
    const numberArticles = parseInt(document.getElementById("quantity").value);
    const colorSelected = document.getElementById("colors").value;
    if (colorSelected === '' || numberArticles < 1) {
        alert("Tous les champs sont obligatoires")
    } else {
        addToCart()
    }

    //update the quantity of a product into the local storage
    function addToCart() {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        let article = {
            id: PRODUCTID,
            quantity: numberArticles,
            color: colorSelected,
        };
        const foundProduct = cart.find(item => item.id === PRODUCTID && item.color === colorSelected)
        if (foundProduct) {
            foundProduct.quantity += parseInt(numberArticles)
        } else {
            cart.push(article)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }

}

// trigger the function when you click on the button Ajouter au panier
const button = document.getElementById("addToCart");
button.addEventListener("click", isProductWellSelected);