const searchBox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipecloseBtn = document.querySelector('.recipe-close-btn');
const backdrop = document.querySelector('#backdrop');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response);

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span>Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>        
    `
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

        // Adding Eventlistner to recipe
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    });
}
catch (error){
    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes....</h2>";
}
}
//fetch to fetch ingredients and measurment
const fetchIngredients = (meal) => {
    let ingredientsList ="";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];

            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }

    return ingredientsList;
}
const openRecipePopup =(meal) =>{
    recipeDetailsContent.innerHTML=`
    <h2 class ="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class = "ingredientsList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions</h3>
        <p>${meal.strInstructions.split(".")}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
    backdrop.style.display ="block";
}

recipecloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display ="none";
    backdrop.style.display ="none";
});
backdrop.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display ="none";
    backdrop.style.display ="none";
});
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML= `<h2>Type the meal in the search box. </h2>`;
        return;

    }
    fetchRecipes(searchInput);
    //console.log("Button Clicked");//
});
