/* eslint camelcase:0 */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../models/index");

// serializeUser taken a user after the findOrCreate method and creates a cookie to pass to the browser
passport.serializeUser((user,done) => {
  console.log("in serialize");
  done(null,user.id);
});

// deserializeUser takes the cookie from the brower when a user visits subsequent pages and gets the correct profile information from that cookie
passport.deserializeUser((id,done) => {
  console.log("in deserialize");
  db.user.findOne({where:{id:id}}).then(user=>done(null,user));
  // db.user.findByPk(id).then(user => done(null,user));
});


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



  }
  ));