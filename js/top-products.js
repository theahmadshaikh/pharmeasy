let products = [];

        // Fetch data when the file loads
        fetch('./db/topproducts.json')
          .then(response => response.json())
          .then(data => {
            products = data;

            displayProductGrid(products);
          })
          .catch(error => console.error('Error fetching data:', error));

        function displayProductGrid(products) {
          const productGridContainer = document.querySelector('section > .right');
            productGridContainer.innerHTML=""
          products.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product-container');

            const imageElement = document.createElement('img');
            imageElement.src = product.images[0];
            imageElement.alt = product.name;
            productContainer.appendChild(imageElement);

            const nameElement = document.createElement('p');
            nameElement.textContent = product.name;
            productContainer.appendChild(nameElement);

            const mrpDiscountElement = document.createElement('p');
            mrpDiscountElement.innerHTML = `MRP <span>₹${((product.price)/(1-product.discount/100)).toFixed(2)}</span> <span>${product.discount}% OFF</span>`;
            nameElement.appendChild(mrpDiscountElement);

            const priceElement = document.createElement('p');
            priceElement.textContent = `₹${product.price.toFixed(2)}`;
            productContainer.appendChild(priceElement);

            productGridContainer.append(productContainer);
          });
          

        }

        document.getElementById('sort').addEventListener('change', function () {
            const selectedValue = this.value;

            if (selectedValue === 'lowtohigh') {
                products.sort((a, b) => a.price - b.price);
            } else if (selectedValue === 'hightolow') {
                products.sort((a, b) => b.price - a.price);
            } else if (selectedValue === 'discount') {
                products.sort((a, b) => b.discount - a.discount);
            }

            displayProductGrid(products);
        });
        const subcategoryRadioButtons = document.querySelectorAll('input[name="sub-category"]');
        subcategoryRadioButtons.forEach(button => {
            button.addEventListener('change', function()  {
                filterdProducts=products.filter(function(product){
                    return product.category==button.value}
                    );
                displayProductGrid(filterdProducts);
            });
        });
        const brandCheckboxes = document.querySelectorAll('input[name="brand"]');

brandCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const selectedBrands = Array.from(brandCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            console.log(selectedBrands.length)
        if(selectedBrands.length==0)
         {
            displayProductGrid(products)
         } 
         else
         {
        // Filter products based on selected brands
        const filteredProducts = products.filter(product => selectedBrands.includes(product.brand));

        // Display the filtered products
        displayProductGrid(filteredProducts);
    }
    });
});
const priceCheckboxes = document.querySelectorAll('input[name="price"]');

priceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const selectedPrices = Array.from(priceCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredProducts = products.filter(product => {
            if (selectedPrices.length === 0) {
                return true; 
            } else {
                return selectedPrices.includes(getPriceRange(product.price));
            }
        });

        displayProductGrid(filteredProducts);
    });
});


function getPriceRange(price) {
    if (price < 99) {
        return 'below99';
    } else if (price >= 100 && price <= 199) {
        return '100-199';
    } else if (price >= 200 && price <= 299) {
        return '200-299';
    } else if (price >= 300 && price <= 399) {
        return '300-399';
    } else if (price >= 400 && price <= 499) {
        return '400-499';
    } else {
        return 'above500';
    }
}
