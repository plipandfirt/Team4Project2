// const router = require("express").Router();
// const passport = require("../config/passport");
const passport = require("passport");

module.exports = function(app){
  app.get("/auth/login",(req,res)=>{
    res.render("login");
  });
    
  app.get("/authlogout",(req,res)=>{
    //handle logout
  });
    
  app.get("/auth/google",passport.authenticate("google",{scope:["https://www.googleapis.com/auth/plus.login"]}));
    
  app.get("/auth/google/redirect",
    passport.authenticate("google",{failureRedirect:"/"}),
    function(req,res){
      res.redirect("/");
    }
  );

};

// module.exports = router;