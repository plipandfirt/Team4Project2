const searchInput = document.querySelector("#recipe");
const searchButton = document.querySelector("#search");
const loginButton = document.querySelector("#login-button");
const loginModal = document.querySelector('#sign-up');
const recipeModal = document.querySelector('#recipe-full');

document.addEventListener("DOMContentLoaded",(event)=>{
  // console.log("recipe.js loaded");
  
  //initialize materialize modals
  const loginModalInstance = M.Modal.init(loginModal);
  const recipeModalInstance = M.Modal.init(recipeModal);
  
  //event listeners
  loginButton.addEventListener("click",(event) => {
    loginModalInstance.open();
  });

  document.querySelector("#recipe-button").addEventListener("click",(event) => {
    recipeModalInstance.open();
  });
  
  searchButton.addEventListener("click",(event) => {
    console.log(searchInput.value);
    fetchRecipes(searchInput.value).then(response=>console.log(response));
  });

  async function fetchRecipes(input){
    const query = input.split().join("&q=");
    console.log(`Running fetch recipes with ${query}`);
    const data = await fetch(`/api/recipes/${query}`);
    // console.log(data.json());
    return data.json();
  }

});