const searchInput = document.querySelector("#recipe");
const searchButton = document.querySelector("#search");
const loginButton = document.querySelector("#login-button");
const createAccountButton = document.querySelector("#create-button");
const loginModal = document.querySelector('#sign-up');
const firstNameInput = document.querySelector("#first_name");
const lastNameInput = document.querySelector("#last_name");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");


document.addEventListener("DOMContentLoaded",(event)=>{
  // console.log("recipe.js loaded");
  
  //initialize materialize modals
  const loginModalInstance = M.Modal.init(loginModal);
  
  //event listeners
  loginButton.addEventListener("click",(event) => {
    loginModalInstance.open();
  });
  
  createAccountButton.addEventListener("click", async (event) => {

    const data = {
      firstName:firstNameInput.value,
      lastName:lastNameInput.value,
      username:usernameInput.value,
      password: passwordInput.value
    };
    
    console.log(data);
    
    await fetch("/add",{
      method:"POST",
      body: JSON.stringify(data),
      headers: {'Content-Type':'application/json'}
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
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