/* eslint camelcase:0 */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models/index");

// serializeUser taken a user after the findOrCreate method and creates a cookie to pass to the browser
passport.serializeUser((user,done) => {
  console.log("in serialize");
  done(null,user.id);
});

// deserializeUser takes the cookie from the brower when a user visits subsequent pages and gets the correct profile information from that cookie
passport.deserializeUser((id,done) => {
  console.log("in deserialize");
  db.user.findOne({where:{id:id}})
    .then(user=> done(null,user))
    .catch(err => done(err));
});


passport.use(
  new GoogleStrategy({
    callbackURL: "/auth/google/redirect",
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET
  },function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    const {id,displayName} = profile;
    console.log(profile._json.image.url);
    db.user.findOrCreate({
      where:{google_id:id},
      defaults:{
        username:displayName,
        image_url:profile._json.image.url
      }
    })
    // user information is available in user, and created is a boolean value to state whether a DB entry was created or not
      .spread((user,created)=>{
        console.log("in spread");
        console.log(user.get({plain:true}));
        console.log(created);
        done(null,user);
      });
  }));
  
passport.use(
  new LocalStrategy(
    (username, password, done) => {
      db.user.findOne({
        where:{
          username:username,
          password:password
        }
      })
        .then(user => {
          console.log("***PRINTING USER***");
          console.log(user);
          if(!user){
            console.log("user not found");
            return done(null,false);
          }
          if(user.password !== password){
            console.log("password incorrect");
            return done(null,false);
          }
          console.log("user found, moving to next step");
          return done(null,user);
        })
        .catch(err => {
          console.log("error, in catch block");
          return done(err);
        });
    }
  )
);