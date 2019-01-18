const db = require("../models");
const axios = require("axios");

const appId = process.env.EDAMAM_RECIPE_APP_ID;
const appKey = process.env.EDAMAM_RECIPE_APP_KEY;


module.exports = function(app) {
  // Create a new pantry item
  app.post("/api/pantry", async function(req, res) {
    console.log(`adding to pantry with user ${req.user.id}`);
    const addedId = req.user.id;
    // newIngredient hold the form info to add
    const newIngredient = req.body.ingredient;
    console.log(`adding ${newIngredient}`);
    const data = await db.pantry.create({
      ingredient: newIngredient,
      userId: addedId
    });
    res.json(data);
  });

  // app.get("/api/pantry", async function(req,res) {

  // });

  app.get("/api/recipes/:query", async function(req,res){
    const search = req.params.query;
    console.log(search);
    const baseUrl = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&`;
    const data = await axios.get(`${baseUrl}q=${search}`);
    const {hits:results} = data.data;
    console.log(`Found ${results.length} results`);
    console.log({data:results});
    res.json({data:results});
  });
};
