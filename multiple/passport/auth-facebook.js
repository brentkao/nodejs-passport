const passport = require('passport')
const path = require('path')
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL

}, async function (accessToken, refreshToken, profile, done) {
console.log(profile);
    let user = {
        id: profile.id,
        name: profile.displayName
    };

    done(null, user);
}));



//# 這個方法 成功失敗導向，目前index-apple的 /auth/apple/callback 沒有使用到，所以關起來無影響
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});