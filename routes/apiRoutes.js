const db = require("../models");
const axios = require("axios");

const appId = process.env.EDAMAM_RECIPE_APP_ID;
const appKey = process.env.EDAMAM_RECIPE_APP_KEY;


module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", async function(req, res) {
    const data = await db.Example.findAll({});
    res.json(data);
  });

  // Create a new example
  app.post("/api/examples", async function(req, res) {
    const data = await db.Example.create(req.body);
    res.json(data);
  });

  // Delete an example by id
  app.delete("/api/examples/:id", async function(req, res) {
    const data = await db.Example.destroy({ where: { id: req.params.id } });
    res.json(data);
  });

  app.get("/api/recipes", async function(req,res){
    const baseUrl = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&`;
    const chicken = await axios.get(`${baseUrl}q=chicken`);
    const {hits:results} = chicken.data;
    console.log(results);
    // res.send(JSON.stringify(results));
  });
};
