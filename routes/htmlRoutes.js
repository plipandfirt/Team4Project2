/* eslint prettier/prettier:0 */
const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", async function(req, res) {
    const data = await db.Example.findAll({});
    res.render("index", {msg: "Welcome!", examples: data});
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", async function(req, res) {
    const data = await db.Example.findOne({ where: { id: req.params.id } });
    res.render("example", {example: data});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
