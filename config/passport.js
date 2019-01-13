/* eslint camelcase:0 */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models/index");

passport.use(
  new GoogleStrategy({
    clientID:"315698839486-20drpj5he53a718grgcfjme0sllhdqms.apps.googleusercontent.com",
    clientSecret:"-f2zgo5vv7tirznlT6EINRNr",
    callbackURL: "/auth/google/redirect"
    // clientId: process.env.GOOGLE_OAUTH_ID,
    // clientSecret: process.env.GOOGLE.OAUTH.SECRET
  },function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    const {id,displayName} = profile;
    // console.log(id,displayName);
    db.user.findOrCreate({
      where:{google_id:id},
      defaults:{
        username:displayName
      }
    })
      .spread((user,created)=>{
        console.log("in spread");
        console.log(user.get({plain:true}));
        console.log(created);
      });



  }
  ));