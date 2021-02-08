// -------------------project API command and others----------------- //
const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const inputField = document.getElementById("search-place");
const searchButton = document.getElementById("search-button");
const displayArea = document.getElementById("product");
const detailsArea = document.getElementById("product-info");


// ---------------search button clicking section----------------------// 
searchButton.addEventListener("click",()=>{
    searchProductByName(inputField.value);
});



// ------------------- product search section area-------------------//
const searchProductByName = keyword =>{
    if (keyword != "") {
        viewLoader(displayArea, true);
        let url = `${baseUrl}search.php?s=${keyword}`;
        fetch(encodeURI(url))
        .then(data=>data.json())
        .then(data=>{
            viewLoader(displayArea, false);
            displayProduct(data);
        });
    }    
}

// --------------- product list search result section----------------//
const displayProduct = data => {
    if (data.meals == null) {
        showNotFoundMessage();
    } else {
        displayArea.innerHTML = createProductCard(data)
    }
}

const showNotFoundMessage = () => {
    displayArea.innerHTML = `<h1>Product Not Found</h1><br>
    <span class="material-icons" style="font-size:45px;padding: 25px 15px">
    sentiment_very_dissatisfied
    </span>`;
}


//-------------- product content section area-------------------//
const createProductCard = data => {
    let meals = data.meals;
    let elementString = "";
    meals.forEach(data => {
            elementString += `<div class="product-style" onclick="showFoodDetails(${data.idMeal})">
                <div class="product-image">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="product-headline">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
    });
    return elementString;
}
const showFoodDetails = id => {
    let url = `${baseUrl}lookup.php?i=${id}`;
    fetch(encodeURI(url))
        .then(data=>data.json())
        .then(data=>{
            let item = data.meals[0];
            let ingredients = "";
            let measurement = "";
            for(let i = 1; i <= 3; i++){
                ingredients += `<li><i class="material-icons">check_box</i> ${item["strIngredient"+i]}</li>`;
                measurement += `<li><i class="material-icons">check_box</i> ${item["strMeasure"+i]}</li>`;
            }
            detailsArea.innerHTML = `<section id="infopage">
              <div class="infopage-justify">
                <div class="infopage-insert">
                  <div class="product-details">
                    <button id="infopage-button" onclick="hideFoodDetails()">X</button>
                    <img src="${item.strMealThumb}" />
                    <div class="information">
                      <h1>${item.strMeal}</h1>
                      <h4>Ingredients</h4>
                      <ul>${ingredients+measurement}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>`;
        });
}
const hideFoodDetails = ()=> {
    detailsArea.innerHTML = "";
}
const viewLoader = (parent, argument) => {
    argument ? parent.innerHTML = `<div class="loader"></div>` : "";
}