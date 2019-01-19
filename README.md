# TO DO: Team Name - Project 2 - Cornucopia

Project #2 Requirements:

-- Must use a Node and Express Web Server
-- Must be backed by a MySQL Database with a Sequelize ORM
-- Must have both GET and POST routes for retrieving and adding new data
-- Must be deployed using Heroku (with Data)
-- Must utilize at least one new library, package, or technology that we haven’t discussed
-- Must have a polished frontend / UI
-- Must have folder structure that meets MVC Paradigm
-- Must meet good quality coding standards (indentation, scoping, naming)
-- Must not expose sensitive API key information on the server, see Protecting-API-Keys-In-Node.md

# Project Description & Features

Cornucopia provides an ingredient to recipe pairing service. Upon entry, visitors have two choices 
-- Search the recipe database
-- Login and have the contents of their Pantry paire to recipes that include those ingredients. 

Every receipe search renders a list of recipes that include your search item. 
Every recipe will render a complete list of the needed ingredients and an image when the image is clicked.

Note this application uses one major APIs (Edamam) and several supporting frameworks (mySql, Materialize, jQuery, xxxx).The application state is managed through browser sessionStorage and mySql.


## Getting Started
To get started, copy the program to a clean directory and run "index.html" in your browser. The program is ready to start automatically.  It will present you with a lightweight login screen to ask you for a name to use during the game.  
  
## Prerequisites
A modern browser and an internet connection. Chrome works best, but others should work fine.  
A modern IDE - it was developed using Visual Studio Code, but any text editor should work, including notepad.  
GitHub  
GitBash installed locally
  
## Installing
1. Find a Locate an empty directory on your hard drive  
2. Open a bash terminal in that directory  
3. Clone the unit-4-game repo down using  Git    
         "https://github.com/plipandfirt/Team4Project2.git"
4. Run schema in mySq
5. Open server.js in bash terminal
6. Open local port 3000 in your favorite browser - this will display the website

  
## Developer notes
main.handlebars:  main entry point and user interface, minimal code is here.
index.handlebars:
index.js:
recipe.js:

mySql is used to manage all the user and pantry information  
OAuth is used to track the login credentials  
Responsiveness - screens will react to limited viewports and collapose into scrollable columns  

## Future Enhancements
1. Alt APIs:  
        Walmart - ingredient priciing

 

## Built With
ExpressJS - Server Side Framework
Handlebars - Templating Engine
PassportJS - User Authentication library
Materialize 1.0 - Materialize library
Fontawesome 5.6.3 - Font Awesome library
   
## Authors
Laurie Anderson - plipandfirt  
Mike Blydenburgh - mikebly
Brendan McCaughey - bmccaw
Scott McAnally - smack322
  
## Acknowledgements
Edamam Nutrition Analysis API: https://developer.edamam.com/
Favicon:  

## Deployed Site
https://plipandfirt.github.io/Team4Project2/