const db = require("../models");
const axios = require("axios");
const appId = "9ba82081";
const appKey = "7812af8b5126f42bf75451a05e092929";

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
