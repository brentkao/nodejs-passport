const passport = require('passport')
const path = require('path')
const LineStrategy = require('passport-line').Strategy;
require('dotenv').config();

passport.use(new LineStrategy({
    channelID: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    callbackURL: process.env.LINE_CALLBACK_URL,
},
    async function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        let user = {
            id: profile.id,
            name: profile.displayName
        }

        done(null, user);
    }));



//# 這個方法 成功失敗導向，目前index-apple的 /auth/apple/callback 沒有使用到，所以關起來無影響
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});