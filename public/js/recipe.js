/*eslint quotes:0 */
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
let recipeModalInit;
const recipeCard = document.querySelector(".card-image");
let recipeList = [];
const cardWrapperDiv = document.querySelector("#card-wrapper");
const pantryModal = document.querySelector("#pantry");
const pantryButton = document.querySelector("#pantry-modal-button");
let modalID;
let ingredientsList;

document.addEventListener("DOMContentLoaded", (event) => {

  // Initialize materialize modals
  const loginModalInstance = M.Modal.init(loginModal);
  let recipeModalInstance;
  const pantryModalInstance = M.Modal.init(pantryModal);

  //Define Event listeners

  document.querySelector("#nav-mobile").addEventListener("click", event => {
    if(event.target && event.target.matches("#login-modal-button")){
      loginModalInstance.open();
    }

    if(event.target && event.target.matches("#pantry-modal-button")){
      console.log("clicked");
      pantryModalInstance.open();
    }
  });

  cardWrapperDiv.addEventListener("click", (event) => {
    console.log(`outside: ${event.target}`);
    if (event.target && (event.target.matches(".card-image") || event.target.matches(".card"))){
      console.log(event.target);
      console.log(event.target.dataset.id);
      recipeModal();
      modalID = event.target.dataset.id;
      recipeModalInit = document.querySelector(`#recipe-full${modalID}`);
      recipeModalInstance = M.Modal.init(recipeModalInit);
      recipeModalInstance.open();
    }
  });

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

  //Searches for recipe and puts results into an array - then calls makeCards function
  searchButton.addEventListener("click", (event) => {
    console.log(searchInput.value);
    fetchRecipes(searchInput.value).then(response => {
      recipeList = [];
      for (let i = 0; i < response.data.length; i++) {
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
      makeCards();
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
    cardWrapperDiv.innerHTML = ``;
    for (let i = 0; i < recipeList.length; i++) {
      let newCard = document.createElement(`div`);
      newCard.classList.add(`card`);
      newCard.setAttribute(`data-id`, [i]);
      newCard.innerHTML = `
      <div class="card-image">
          <img src="${recipeList[i].image}">
          <span class="card-title">${recipeList[i].label}</span>
        </div>        
      `;
      cardWrapperDiv.append(newCard);
      
    }
    
  }

  function recipeModal() {
    for (let i = 0; i < recipeList.length; i++) {
      
      for (let j = 0; j <recipeList[i].ingredients.length; j++) {
        ingredientsList = recipeList[i].ingredients[j].text;
        console.log(ingredientsList);
        let ingredientsDisplay = document.createElement(`ul`);
        ingredientsDisplay.innerHTML = `
        <li>${ingredientsList}</li>`;

      }
      let recipeModal = document.createElement(`div`);
      recipeModal.classList.add(`modal`);
      recipeModal.setAttribute(`id`, `recipe-full${i}`);
      recipeModal.setAttribute('data-id', [i]);
      recipeModal.innerHTML = `
      
        <div class="modal-content">
          <h4>${recipeList[i].label}</h4>
          <img src="${recipeList[i].image}">
          <p id="list">${ingredientsList}</p>
          <a href="${recipeList[i].url}" target="_blank">${recipeList[i].source}</a>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Dismiss</a>
        </div>
      `;
      document.body.appendChild(recipeModal);
      console.log('worked');
    
    }
  }

});
