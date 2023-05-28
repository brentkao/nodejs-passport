const passport = require('passport')
const path = require('path')
const AppleStrategy = require('passport-apple').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(new AppleStrategy({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    callbackURL: process.env.APPLE_CALLBACK_URL,
    keyID: process.env.APPLE_KEY_ID,
    privateKeyLocation: path.join(__dirname, "./AuthKey_X932C29R9B.p8")

}, async function (req, accessToken, refreshToken, idToken, profile, cb) {

    const decodedToken = jwt.decode(idToken);
    const { sub, email } = decodedToken;
    // 確認資料庫是否存在此使用者(decodedToken.sub || decodedToken.email)當作第三方綁定帳號
    // const dbInfo = await isDBhasUser(sub);
    // const dbInfo = isDBhasUser(email);

    // 如果有資料
    let dbInfo = {};
    let userInfo = {};

    //! 假設
    dbInfo.sub = sub;
    dbInfo.email = email;
    dbInfo.name = "KO";

    if (dbInfo) {
        // 帳戶已存在
        // 撈出使用者帳號資訊後組裝成要存放在session的資料給callback function
        userInfo.sub = dbInfo.sub;
        userInfo.email = dbInfo.email;
        userInfo.name = dbInfo.name;
    } else {
        // 創建帳號
        // const dbCreateInfo = await dbCreateAccount(sub,email);

        userInfo.sub = sub;
        userInfo.email = email;
    }


    console.log("\n\n", userInfo, "\n\n");

    cb(null, userInfo);
}));


//# 這個方法 成功失敗導向，目前index-apple的 /auth/apple/callback 沒有使用到，所以關起來無影響
// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });