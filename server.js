/* eslint camelcase:0 */
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const passportConfig = require("./config/passport");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/authRoutes")(app);

// app.use("/auth",authRoutes);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
async function startServer(){
  try{
    await db.sequelize.sync(syncOptions);
    
    return app.listen(PORT, function() {
      console.log(
        "==> 🌎  Serving fools on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  }
  catch(error){
    console.log("Something has gone horribly wrong!");
    console.log(error);
  }
}

startServer();

module.exports = app;
