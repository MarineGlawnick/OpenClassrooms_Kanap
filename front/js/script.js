//Rendering the products on the index page 
function fetchProducts() {
     //calling the HTML section
    const items = document.getElementById('items');  
     //fetching the products into the API
    fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => {
            // render each product
            data.forEach(element => {
                items.innerHTML += `<a href='./product.html?id=${element._id}'>
           <article>
             <img src='${element.imageUrl}' alt='${element.altTxt}'>
             <h3 class='productName'>${element.name}</h3>
             <p class='productDescription'>${element.description}</p>
           </article>
         </a>`
            });
        })
        // display error in case of problems with the API
        .catch((error) => {
            console.error("Sorry, the API is not working", error)
        })
}

fetchProducts();
