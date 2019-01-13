const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const db = require("../models");

passport.use(
  new GoogleStrategy({
    clientID:"315698839486-20drpj5he53a718grgcfjme0sllhdqms.apps.googleusercontent.com",
    clientSecret:"-f2zgo5vv7tirznlT6EINRNr",
    callbackURL: "/auth/google/redirect"
    // clientId: process.env.GOOGLE_OAUTH_ID,
    // clientSecret: process.env.GOOGLE.OAUTH.SECRET
  },function(accessToken, refreshToken, profile, done) {
    // console.log(accessToken);
    // console.log(refreshToken);
    console.log(profile);
    // done(null,profile);
  }
  ));