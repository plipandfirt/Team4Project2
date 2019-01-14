const passport = require("passport");
const db = require("../models/index");

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

  app.post("/login", passport.authenticate("local", { failureRedirect:"/", failureFlash: true }),
    (req,res) => {console.log(req.user)}
  );
  
  app.post("/add",(req,res) => {
    // console.log("in add post route");
    const {firstName,lastName,username,password} = req.body;
    db.user.create({
      first_name: firstName,
      last_name: lastName,
      username:username,
      password:password
    });
  });

};