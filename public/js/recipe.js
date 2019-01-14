const searchInput = document.querySelector("#recipe");
const searchButton = document.querySelector("#search");
const loginModalButton = document.querySelector("#login-modal-button");
const createAccountButton = document.querySelector("#create-button");
const loginModal = document.querySelector("#sign-up");
const firstNameInput = document.querySelector("#first_name");
const lastNameInput = document.querySelector("#last_name");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginButton = document.querySelector("#login-button");
const nameFieldsDiv = document.querySelector(".name");


document.addEventListener("DOMContentLoaded",(event)=>{
  // console.log("recipe.js loaded");
  
  //initialize materialize modals
  const loginModalInstance = M.Modal.init(loginModal);
  
  //event listeners
  loginModalButton.addEventListener("click",(event) => {
    loginModalInstance.open();
  });
  
  loginButton.addEventListener("click",async (event) => {
    await fetch("/login");
  });
  
  createAccountButton.addEventListener("click", async (event) => {
    // clicked state hold the logic for deciding whether to expand the login screen or take the form info and create a database entry
    let clickedState = event.target.dataset.clicked;
    console.log(`clicked: ${clickedState}`);
    if(clickedState === true){ // if clicked, create database entry
      console.log("in clicked true");
      const data = {
        firstName:firstNameInput.value,
        lastName:lastNameInput.value,
        username:usernameInput.value,
        password: passwordInput.value
      };
      
      await fetch("/add",{
        method:"POST",
        body: JSON.stringify(data),
        headers: {"Content-Type":"application/json"}
      })
        .then(res => {
          console.log(res);
          createAccountButton.setAttribute("data-clicked",false);
          nameFieldsDiv.classList.add("hide");
          createAccountButton.classList.add("modal-close");
        })
        .catch(err => {
          console.log(err);
          createAccountButton.setAttribute("data-clicked",false);
          nameFieldsDiv.classList.add("hide");
          createAccountButton.classList.add("modal-close");
        });

      
    }
    else{ // not clicked, expand the form and set clicked to true;
      createAccountButton.setAttribute("data-clicked",true);
      nameFieldsDiv.classList.remove("hide");
      loginButton.classList.add("hide");
      createAccountButton.textContent = "Create Account";
    }

    
  });
  
  searchButton.addEventListener("click",(event) => {
    console.log(searchInput.value);
    fetchRecipes(searchInput.value).then(response=>console.log(response));
  });

  async function fetchRecipes(input){
    const query = input.split().join("&q=");
    console.log(`Running fetch recipes with ${query}`);
    const data = await fetch(`/api/recipes/${query}`);
    return data.json();
  }

});