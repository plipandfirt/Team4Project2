# //TODO: Team Name - Cornucopia

# Project Description & Features

Cornucopia provides an ingredient to recipe pairing service. Upon entry visitors have two choices:
1. Recipe Search - search the recipe database, either by recipe name or by ingredient.
* Every recipe search displays a preselected number of recipes in a tile format.
* When a recipe tile is clicked it will display a complete list of ingredients, an image and a link to the complete recipe.

2. Pantry Pairing - login and have the contents of their Pantry paired with recipes that include those ingredients. 
* The items chosen in search(users may choose multiple items) will appear with a -strikethrough- when the recipe tile is clicked.
* All features of the Recipe Search are available while logged in.

_Note:_  While logged in a user may also update their profile by clicking on the Profile button, that only appears after login. 

## Deployed Sites
This application is deployed to Heroku and Github. 
* [https://cornucopia-todo-team-name.herokuapp.com/]
* [https://plipandfirt.github.io/Team4Project2/]
  
## Developer Notes
* .env - stores environment variables used by the dotenv package - holds keys and passwords for mySQL, API, OAuth and Heroku
* config/... - database and authentication configurations
* models/... - database logic
* public/... - front end that contain event logic and styling
* routes/... - registers endpoints with POST, GET, UPDATE, DELETE
* views/... - html template and base UI look and feel (handlebars)
* server.js - server side entry point - sets up the web server and endpoints
* .gitignore - instructs Git not to upload files like Node modules and .env
* mySql - used to manage user and pantry data
* OAuth - used to track the login credentials  

## Future Enhancements
1. Ingredient pricing allowing users to determine the cost of each recipe.
* 2 requests were made to access the Walmart API - still no response. :|
2. Calorie counts per recipe

## Technologies Used
express - Server side framework
handlebars - Templating Engine
passport - User Authentication library
mySql - Relational database management system
sequelize - promise-based ORM for Node
materialize - Responsive css framework
fontawesome - Font and icon toolkit
eslint - Pluggable JS linter
jawsDB - relational database compatible with Heroku
Edamam Nutrition Analysis API - https://developer.edamam.com/
   
## Authors (2019)
Laurie Anderson - plipandfirt  
Mike Blydenburgh - mikebly
Brendan McCaughey - bmccaw
Scott McAnally - smack322