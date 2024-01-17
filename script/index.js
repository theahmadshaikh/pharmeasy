let search_query = document.getElementById("search_query");
let suggestionListContainer = document.querySelector(".suggestion-list--container")
let suggestionList = document.querySelector("#suggestion-list")
search_query.addEventListener('input', function() {
    showSuggestions(this.value);
  });
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