const db = require("../models");

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
};
