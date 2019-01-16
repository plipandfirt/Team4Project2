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
const recipeModal = document.querySelector("#recipe-full");
const receipeList = [];

document.addEventListener("DOMContentLoaded", (event) => {
  // console.log("recipe.js loaded");

  //initialize materialize modals
  const loginModalInstance = M.Modal.init(loginModal);
  const recipeModalInstance = M.Modal.init(recipeModal);

  //event listeners
  loginModalButton.addEventListener("click", (event) => {
    loginModalInstance.open();
  });

  // document.querySelector("#recipe-button").addEventListener("click", (event) => {
  //   recipeModalInstance.open();
  // });

  loginButton.addEventListener("click", async (event) => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log(`logging in with ${username} & ${password}`);
    await fetch("/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "username": username, "password": password })
    });
    window.location = "/profile";
  });

  createAccountButton.addEventListener("click", async (event) => {
    // clicked state hold the logic for deciding whether to expand the login screen or take the form info and create a database entry
    let clickedState = event.target.dataset.clicked;
    console.log(`clicked: ${clickedState}`);
    if (clickedState === "true") { // if clicked, create database entry
      console.log("in clicked true");
      const data = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        username: usernameInput.value,
        password: passwordInput.value
      };

      await fetch("/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          
          console.log(res);
          createAccountButton.setAttribute("data-clicked", "false");
          nameFieldsDiv.classList.add("hide");
          loginModalInstance.close();
          loginButton.classList.remove("hide");
          
        })
        .catch(err => {
          console.log(err);
          createAccountButton.setAttribute("data-clicked", "false");
          nameFieldsDiv.classList.add("hide");
        });

    }
    else { // not clicked, expand the form and set clicked to true;
      createAccountButton.setAttribute("data-clicked", "true");
      nameFieldsDiv.classList.remove("hide");
      loginButton.classList.add("hide");
      createAccountButton.textContent = "Create Account";
    }
  });

  //Searches for recipe and puts results into an array
  searchButton.addEventListener("click", (event) => {
    console.log(searchInput.value);
    fetchRecipes(searchInput.value).then(response => {
      const recipeList = [];
      for (i = 0; i < response.data.length; i++) {
        let newRecipe = {
          label: response.data[i].recipe.label,
          image: response.data[i].recipe.image,
          ingredients: response.data[i].recipe.ingredients,
          source: response.data[i].recipe.source,
          url: response.data[i].recipe.url
        };
        recipeList.push(newRecipe);
      }
      console.log(recipeList);
    });
  });

  async function fetchRecipes(input) {
    const query = input.split().join("&q=");
    console.log(`Running fetch recipes with ${query}`);
    const data = await fetch(`/api/recipes/${query}`);
    return data.json();
  }

  //create cards for each item in the recipeList
  function makeCards() {

  }
});


// //pantry modal
// document.addEventListener("DOMContentLoaded", function() {
//   var elemPantry = document.querySelectorAll("#pantry");
//   var instances = M.Modal.init(elemPantry); //,options
//   var instance = M.Modal.getInstance(elemPantry);
//   console.log(instance);
//   instance.open();
// }); 

