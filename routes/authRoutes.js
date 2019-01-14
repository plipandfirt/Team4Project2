const passport = require("passport");

module.exports = function(app){
  app.get("/auth/login",(req,res)=>{
    res.send("login route");
  });
    
  app.get("/auth/logout",(req,res)=>{
    //handle logout
    req.logout();
    res.redirect("/");
  });
    
  // app.get("/auth/google",passport.authenticate("google",{scope:["https://www.googleapis.com/auth/plus.login"]}));
  app.get("/auth/google",passport.authenticate("google",{scope:["profile"]}));
    
  app.get("/auth/google/redirect", passport.authenticate("google"),function(req,res){
    // res.send(req.user);
    console.log(req.user);
    res.redirect("/profile");
  }
  );

};