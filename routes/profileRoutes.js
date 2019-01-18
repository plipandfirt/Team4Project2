const db = require("../models");
module.exports = function(app){

  //authCheck fires in between app.get("/profile") and its callback function, to ensure only logged in users can view route
  const authCheck = (req,res,next) => {
    if(req.user){
      next();
    }
    else{
      res.render("index");
    }
  };  

  app.get("/profile/", authCheck, async (req,res) => {
    // res.send(`Welcome to your profile, ${req.user.username}`);

    const data = await db.pantry.findAll({
      where:{
        userId:req.user.id
      }
    });
    console.log("PRINTING PANTRY");
    console.log(data);

    res.render("index",{user:req.user,pantry:data});
  });
};