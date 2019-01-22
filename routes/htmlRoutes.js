/*eslint linebreak-style:0 */
const db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", async function(req, res) {
    res.render("index",{user:null});
  });


  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
