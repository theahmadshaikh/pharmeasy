let thumbnails = document.querySelectorAll('.medicine-detail-container .medicine-detail-left-container .thumbnail');
let cart=JSON.parse(localStorage.getItem("cart")) || [];
let selectedItem ={};
let viewCart = document.querySelector('.view-cart');
if(cart.length)
    viewCart.disabled = false;
// Add click event listener to each thumbnail
thumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function() {
        changeImage(thumbnail.src);
    });
});

// Function to change the main image
function changeImage(newImageSrc) {
    let mainImage = document.querySelector('.medicine-detail-container .large-image');
    mainImage.src = newImageSrc;
}
// let addToCartButton = document.getElementById('add-to-cart');
// console.log(addToCartButton);
    

        function showQuantitySelector() {
            // Get the container element
            let cartContainer = document.getElementById('cart-container');
            // console.log(cartContainer)
            // Create a select element
            let quantitySelect = document.createElement('select');
            quantitySelect.id = 'quantity-select';

            // Add options to the select element
            let option = document.createElement('option');
            option.text="Qty "+0
            quantitySelect.append(option)
            for (let i = 1; i <= 20; i++) {
                let option = document.createElement('option');
                option.value = i;
                option.text = i;
                quantitySelect.appendChild(option);
            }

            // Replace the "Add to Cart" button with the select element
            cartContainer.innerHTML = '';
            cartContainer.appendChild(quantitySelect);
            quantitySelect.addEventListener('change',function(){
                let index = cart.findIndex(obj =>obj.name == selectedItem.name);
                if(index==-1){
                    selectedItem.quantity =this.value;
                cart.push(selectedItem);
                
                
                }
                else
                {
                    cart[index].quantity = this.value;
                }
                localStorage.setItem("cart",JSON.stringify(cart));
                if(cart.length)
                    viewCart.disabled = false;
                document.querySelector('.medicine-detail-right-container > p').innerText=`${cart.length} item in cart`;
            })
        }

        let searchQuery = localStorage.getItem('searchQuery');

        // Array to store frequently searched medicines
        let frequentlySearchedMedicine = [];

        // Fetch data from external file
        fetch('./db/frequentlysearchedmedicine.json')
            .then(response => response.json())
            .then(data => {
                // Store data in frequentlySearchedMedicine array
                frequentlySearchedMedicine = data;

                // Find the item in the array based on searchQuery
                 selectedItem = frequentlySearchedMedicine.find(item => item.name === searchQuery);
                 if(!selectedItem)
                    return
                // Function to dynamically create and display content
                function displayMedicineDetails(data) {
                    // Get the existing medicine detail container
                    let existingContainer = document.querySelector('.medicine-detail-left-container');
                    existingContainer.innerHTML="";
                    // Create the main container
        
                    // Create the detail container
                    let detailContainer = document.createElement('div');
                    detailContainer.className = 'detail-container';
        
                    // Create the product images container
                    let productImagesContainer = document.createElement('div');
                    productImagesContainer.className = 'product-images';
        
                    // Create the large image container
                    let largeImageContainer = document.createElement('div');
                    largeImageContainer.className = 'large-image-container';
        
                    // Create the large image element
                    let largeImage = document.createElement('img');
                    largeImage.className = 'large-image';
                    largeImage.src = data.images[0];
                    largeImage.alt = data.name;
        
                    // Append the large image to its container
                    largeImageContainer.appendChild(largeImage);
        
                    // Create the thumbnails container
                    let thumbnailsContainer = document.createElement('div');
                    thumbnailsContainer.className = 'thumbnails';
        
                    // Loop through data images and create thumbnails
                    data.images.forEach(function (thumbnailSrc, index) {
                        let thumbnail = document.createElement('img');
                        thumbnail.className = 'thumbnail';
                        thumbnail.src = thumbnailSrc;
                        thumbnail.alt = data.name + ' Thumbnail ' + (index + 1);
                        // Add click event listener to change the large image
                        thumbnail.addEventListener('click', function () {
                            largeImage.src = thumbnailSrc;
                        });
                        // Append the thumbnail to its container
                        thumbnailsContainer.appendChild(thumbnail);
                    });
        
                    // Append large image container and thumbnails container to product images container
                    productImagesContainer.appendChild(largeImageContainer);
                    productImagesContainer.appendChild(thumbnailsContainer);
        
                    // Create the product details container
                    let productDetailsContainer = document.createElement('div');
                    productDetailsContainer.className = 'product-details';
        
                    // Create the product details elements
                    let productName = document.createElement('h1');
                    productName.textContent = data.name;
                    productName.className = 'product-name';
        
                    let brandName = document.createElement('p');
                    brandName.textContent = data.brand;
                    brandName.className = 'brand-name';
        
                    let price = document.createElement('p');
                    price.textContent = `₹${data.price.toFixed(2)}`;
                    price.className = 'price';
                    let cartContainer = document.createElement("div")
                    cartContainer.id="cart-container"
                    // Create the "Add to Cart" button
                    let addToCartButton = document.createElement('button');
                    addToCartButton.id = 'add-to-cart';
                    addToCartButton.textContent = 'Add to Cart';
                    cartContainer.appendChild(addToCartButton)
                    addToCartButton.addEventListener('click', showQuantitySelector);

                    // Append product details elements and button to the container
                    productDetailsContainer.appendChild(productName);
                    productDetailsContainer.appendChild(brandName);
                    productDetailsContainer.appendChild(price);
                    productDetailsContainer.appendChild(cartContainer);
        
                    // Create the description container
                    let descriptionContainer = document.createElement('div');
                    descriptionContainer.className = 'description-container';
        
                    // Create the description elements
                    let descriptionHeading = document.createElement('h3');
                    descriptionHeading.textContent = 'Description';
        
                    let descriptionParagraph = document.createElement('p');
                    descriptionParagraph.textContent = data.description;
        
                    // Append description elements to the container
                    descriptionContainer.appendChild(descriptionHeading);
                    descriptionContainer.appendChild(descriptionParagraph);
        
                    // Append all created elements to the main container
                    detailContainer.appendChild(productImagesContainer);
                    detailContainer.appendChild(productDetailsContainer);
                    existingContainer.appendChild(detailContainer);
                    existingContainer.appendChild(descriptionContainer);
        
                    
                }
                
                if (data) {
                    displayMedicineDetails(selectedItem);
                } else {
                    console.error('Item not found based on search query.');
                }
            })
            .catch(error => console.error('Error fetching data:', error));