const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    let user = {
        id: profile.id,
        email: profile.email,
        name: profile.displayName,
    }
      return done(null, user);

  }
));

passport.serializeUser(function (user, done) {
    done(null,user);
});

passport.deserializeUser(function (user, done) {
    done(null,user);
});