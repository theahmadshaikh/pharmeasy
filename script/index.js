let search_query = document.getElementById("search_query");
let searchButton =  document.querySelector('.search #search-button');
let suggestionListContainer = document.querySelector(".suggestion-list--container")
let suggestionList = document.querySelector("#suggestion-list")
let newLaunchesProductContainer = document.querySelector(".new-launches .image-list")
let newLaunchesProducts=[];
fetch('./db/newlaunches.json')
.then(response => response.json())
.then(data => {
  newLaunchesProducts = data;
  displayNewLaunchesProducts(newLaunchesProducts);  

})
.catch(error => console.error('Error fetching data:', error));
search_query.addEventListener('input', function() {
    showSuggestions(this.value);
  });
  function displayNewLaunchesProducts(products) {
    newLaunchesProductContainer.innerHTML="";
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productAnchor = document.createElement('a');
        productAnchor.href = '#'; 

        const productImage = document.createElement('img');
        productImage.src = product.images[0]; 
        productImage.alt = product.name;

        const productName = document.createElement('h3');
        const maxLength = 20; 
        productName.textContent = product.name.length > maxLength
            ? product.name.substring(0, maxLength) + '...'
            : product.name;
        productAnchor.appendChild(productImage);
        productAnchor.appendChild(productName);

        productDiv.appendChild(productAnchor);

        newLaunchesProductContainer.appendChild(productDiv);
    });
}

// Call the function to display new launches products
// displayNewLaunchesProducts(products);
  search_query.addEventListener('focus', function() {
    showSuggestions(this.value);
  });

  search_query.addEventListener('blur', function() {
    setTimeout(hideSuggestions, 200);   });

  function showSuggestions(query) {
    suggestionList.innerHTML = '';

    const suggestionsData = ['Ecosprin 75mg Strip Of 14 Tablets', 'Dolo 650mg Strip Of 15 Tablets', 'Evion 400mg Strip Of 10 Capsules', 'Pan 40mg Strip Of 15 Tabletss', 'Pharmeasy Multivitamin Multimineral - Pack Of 60','Pharmeasy Calcium, Magnesium, Zinc & Vitamin D3 - Pack Of 60','Horlicks Health & Nutrition Drink Jar, 500 G','Dettol Antiseptic Liquid Bottle Of 550 Ml','Everherb Ashwagandha - Immunity Booster Capsules - Anxiety & Stress Relief - Bottle Of 60','Liveasy Essentials Copper Bottle - Ayurveda Health Benefits - Leak Proof Cap - 950ml'];

    suggestionsData
      .filter(item => item.toLowerCase().includes(query.toLowerCase()))
      .forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', function() {
          search_query.value = item;
          hideSuggestions();
        });
        suggestionList.appendChild(li);
      });

      suggestionListContainer.style.display = suggestionList.children.length ? 'block' : 'none';
  }

  function hideSuggestions() {
    suggestionListContainer.style.display = 'none';
  }

 

searchButton.addEventListener('click',function(){
  localStorage.setItem("searchQuery",search_query.value);
  location.href = "./medicine_detail.html"
})