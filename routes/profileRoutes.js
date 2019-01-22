/* eslint camelcase: 0 */
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

  app.put("/profile/", authCheck, async (req,res) => {
    console.log(req.body);
    const {newUsername,newPassword,newFirstName,newLastName,newProfileImage} = req.body;
    if(newUsername){
      await db.user.update({
        username: newUsername
      },
      {
        where:{
          id: req.user.id
        }
      });
    }
    if(newPassword){
      await db.user.update({
        password: newPassword
      },
      {
        where:{
          id: req.user.id
        }
      });
    }
    if(newFirstName){
      await db.user.update({
        first_name: newFirstName
      },
      {
        where:{
          id: req.user.id
        }
      });
    }
    if(newLastName){
      await db.user.update({
        last_name: newLastName
      },
      {
        where:{
          id: req.user.id
        }
      });
    }
    if(newProfileImage){
      await db.user.update({
        image_url: newProfileImage
      },
      {
        where:{
          id: req.user.id
        }
      });
    }
    res.render("/");
  });
};