/*eslint quotes:0 */
/*eslint linebreak-style:0 */
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
const recipeCard = document.querySelector(".card-image");
const cardWrapperDiv = document.querySelector("#card-wrapper");
const modalWrapperDiv = document.querySelector("#modal-wrapper");
const pantryModal = document.querySelector("#pantry");
const pantryButton = document.querySelector("#pantry-modal-button");
const pantryItems = document.querySelectorAll(".pantry-search-item");
const pantryCheckBoxes = document.querySelectorAll(".pantry-search-box");
const pantryDeleteButtons = document.querySelectorAll(".pantry-delete");
const profileModal = document.querySelector("#profile");
const profileButton = document.querySelector("#profile-modal-button");
const pantrySearchButton = document.querySelector("#user-pantry-search");
const profileUpdateButton = document.querySelector("#user-profile-update");
const newUsernameInput = document.querySelector("#username-input");
const newPasswordInput = document.querySelector("#password-input");
const newFirstNameInput = document.querySelector("#first-name-input");
const newLastNameInput = document.querySelector("#last-name-input");
const newProfileImageInput = document.querySelector("#avatar-input");
let modalID;
let ingredientsList;
let ingredientsDisplay;
let recipeModalInit;
let recipeList = [];
let ingredientArr = [];
let searchArr = [];
let selectedIngredients = [];

document.addEventListener("DOMContentLoaded", (event) => {

  // create an array of node items from the pantry checkboxes
  userPantry = Array.prototype.slice.call(pantryItems);
  userPantryBoxes = Array.prototype.slice.call(pantryCheckBoxes);
  console.log(userPantryBoxes);
  console.log(userPantry);

 

  // Initialize materialize modals
  const loginModalInstance = M.Modal.init(loginModal);
  let recipeModalInstance;
  const pantryModalInstance = M.Modal.init(pantryModal);
  const profileModalInstance = M.Modal.init(profileModal);

  //Define Event listeners

  //delegate event listeners on nav bar to dynamically altered pantry modal and login modal button
  document.querySelector("#nav-mobile").addEventListener("click", event => {
    if (event.target && event.target.matches("#login-modal-button")) {
      loginModalInstance.open();
    }

    if (event.target && event.target.matches("#pantry-modal-button")) {
      pantryModalInstance.open();
    }

    if (event.target && event.target.matches("#profile-modal-button")) {
      console.log('clicked');
      profileModalInstance.open();
    }
  });

  // delegate click listeners to dynamically created api result cards to open details modal
  cardWrapperDiv.addEventListener("click", (event) => {
    if (event.target && event.target.matches(".card")) {
      console.log(event.target.dataset.id);
      modalID = event.target.dataset.id;
      selectedIngredients = recipeList[modalID].ingredients.slice(0);
      console.log(`making modal with ${selectedIngredients} at id ${modalID}`);
      recipeModal(modalID,selectedIngredients);
      recipeModalInit = document.querySelector(`#recipe-full${modalID}`);
      recipeModalInstance = M.Modal.init(recipeModalInit);
      recipeModalInstance.open();
    }
  });

  // uses form values to make POST request to local passport JS auth
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

  profileUpdateButton.addEventListener("click", async (event) => {
    const newUsername = newUsernameInput.value;
    const newPassword = newPasswordInput.value;
    const newFirstName = newFirstNameInput.value;
    const newLastName = newLastNameInput.value;
    const newProfileImage = newProfileImageInput.value;

    console.log(`Updating with ${newUsername} and ${newPassword}`);
    await fetch("/profile",{
      method: "PUT",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "newUsername": newUsername,
        "newPassword": newPassword,
        "newFirstName": newFirstName,
        "newLastName": newLastName,
        "newProfileImage": newProfileImage
      })
    });
    window.location = "/";
  });

  //button to create user account inside of login modal
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
    modalWrapperDiv.innerHTML = ``;
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

  // when the pantry search button is clicked, loop through all check boxes. if checked, add the pantry item from the same index
  pantrySearchButton.addEventListener("click", event => {
    searchArr = [];
    pantryCheckBoxes.forEach((box,index) => {
      if(box.checked){
        console.log(`box ${userPantry[index].innerText} is checked`);
        searchArr.push(userPantry[index].innerText);
      }
    });
    console.log(searchArr.join("+"));
    
    fetchRecipes(searchArr.join("+")).then(response => {
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

  pantryDeleteButtons.forEach(button => {
    button.addEventListener("click",async event => {
      const id = event.target.dataset.delete;
      console.log(id);
      try{
        await fetch(`/api/pantry/${id}`,{
          method:"DELETE"
        });
        // window.location = "/profile";
        location.reload();
      }
      catch(err){
        if(err) {throw err;}
      }
    });
  });

  // call to edemam api to get search results
  async function fetchRecipes(input) {
    const query = input.split().join("&q=");
    console.log(`Running fetch recipes with ${query}`);
    const data = await fetch(`/api/recipes/${query}`);
    return data.json();
  }

  //create cards for each item in the recipeList
  function makeCards() {
    //clear previous search results
    cardWrapperDiv.innerHTML = ``;
    for (let i = 0; i < recipeList.length; i++) {
      let newCard = document.createElement(`div`);
      newCard.classList.add(`card`);
      newCard.classList.add(`grow`);
      newCard.setAttribute(`data-id`, [i]);
      newCard.setAttribute(`style`, `background-image: url(${recipeList[i].image}); background-position: center;`);

      newCard.innerHTML = `
      <div>
          <span class="card-title">${recipeList[i].label}</span>
        </div>        
      `;
      cardWrapperDiv.append(newCard);

    }

  }
  //creates detail view modals for each result - currently persists after a new search
  function recipeModal(id,ingredients) {
    modalWrapperDiv.innerHTML = ``;
    ingredientArr = [];
    
    // if a user is logged in, handle striking out ingredients based on their pantry
    if(userPantry.length > 0){
      // create an array of the currently logged in user's pantry items to check against recipe ingredients
      userPantryArr = userPantry.map(item => {
        return item.innerText;
      });
      console.log(userPantryArr);
      console.log(`**BEFORE**`)
      ingredients.forEach(item=>console.log(item));

      // for each pantry item, loop over the ingredients list
      for (var j = ingredients.length-1; j > -1; j--) {
        ingredientsList = ingredients[j].text;
        console.log(`checking ${ingredientsList}`);
        userPantryArr.some(function(pantryItem){
          console.log(`checking for pantry item ${pantryItem}`);
           if(new RegExp(pantryItem,'ig').test(ingredientsList)){
            ingredientsDisplay = `<li style='text-decoration:line-through'>${ingredientsList}</li>`;
            ingredientArr.push(ingredientsDisplay);
            console.log(`pushed ${ingredientsDisplay}`);
            ingredients.splice(j,1);
            return;
          }
      });
      console.log(`**AFTER**`);

      ingredients.forEach(item=>{
        console.log(item);
        if(j === 0){
          ingredientsDisplay = `<li>${item.text}</li>`;
          if(!ingredientArr.includes(ingredientsDisplay)){
            ingredientArr.push(ingredientsDisplay);
          }
        }
      });
      }
    }
    
    // else, display ingredients normally, ignoring the pantryArr
    else{
      // for each pantry item, loop over the ingredients list
      for (let j = 0; j < recipeList[id].ingredients.length; j++) {
        ingredientsList = recipeList[id].ingredients[j].text;
        console.log(ingredientsList);
        ingredientsDisplay = `<li>${ingredientsList}</li>`;
        //push the formatted ingredient to the modal's ingredient array
        ingredientArr.push(ingredientsDisplay);
        console.log(ingredientArr);
      }

    }
    

    let recipeModal = document.createElement(`div`);
    recipeModal.classList.add(`modal`);
    recipeModal.setAttribute(`id`, `recipe-full${id}`);
    recipeModal.setAttribute('data-id', [id]);
    recipeModal.innerHTML = `
    
      <div class="modal-content recipe-detail">
        <h4 class="modal-header">${recipeList[id].label}</h4>
        <img class="modal-img" src="${recipeList[id].image}">
        <ul class="modal-text">${ingredientArr.join("")}</ul>
        <a class="modal-src" href="${recipeList[id].url}" target="_blank">Source: ${recipeList[id].source}</a>
        <a href="#!" class="modal-close btn-flat recipe-x"><i class="fas fa-times"></i></a>
      </div>
           
    `;
    modalWrapperDiv.append(recipeModal);
    console.log('worked');
  }

});