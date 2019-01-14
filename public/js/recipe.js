const searchInput = document.querySelector("#recipe");
const searchButton = document.querySelector("#search");

document.addEventListener("DOMContentLoaded",(event)=>{
  // console.log("recipe.js loaded");
  searchButton.addEventListener("click",(event)=>{
    console.log(searchInput.value);
    fetchRecipes(searchInput.value);
  });

  async function fetchRecipes(input){
    const query = input.split().join("&q=");
    console.log(`Running fetch recipes with ${query}`);
    const data = await fetch(`/api/recipes/${query}`);
    console.log(data);
  }

});