const express = require('express');
const passport = require('passport');
require('./auth-apple');
const session = require('express-session');


const bodyParser = require("body-parser");

const app = express();
app.use(session({
    secret: "KOisCool",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Welcome to Bowa <br /> \ <a href="/auth/apple">Authenticate with Apple</a>')
});

app.get("/auth/apple", passport.authenticate('apple'));

// app.post("/auth/apple/callback", function (req, res, next) {
//     passport.authenticate('apple', function (err, user, info) {
//         console.log("in it\n\n\n",user,"\n\n\n",info);
//         if (err) {
//             if (err == "AuthorizationError") {
//                 res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
//                     <a href=\"/login\">Sign in with Apple</a>");
//             } else if (err == "TokenError") {
//                 res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
//                     <a href=\"/login\">Sign in with Apple</a>");
//             }
//         } else {
//             res.json(user);
//         }
//     })(req, res, next);
// });


function isLoggedIn(req, res, next) {
    req.session.user? next(): res.status(401).redirect('/');
}

app.post("/auth/apple/callback", function (req, res, next) {
    passport.authenticate('apple', function (err, user, info) {
        console.log("ERROR\n", err);
        console.log("\nin it\n\n", user, "\n\n");

        if (err) {
            //請求授權錯誤
            (err == "AuthorizationError") ? res.redirect('/auth/AuthorizationError') : null;
            //金鑰異常
            (err == "TokenError") ? res.redirect('/auth/TokenError') : null;
            return;
        }

        if (user) {
            // 如果沒有異常
            // 使用者資料，儲存在 req.session.user 中
            req.session.user = user;
            console.log(req.session.user);
            //存完cookie 將使用者導向到 成功畫面
            return res.redirect('/protected');
        }
        return res.status(500).redirect('/');

        // #舊方法
        // if (err) {
        //     if (err == "AuthorizationError") {
        //         // 請求授權錯誤
        //         return res.redirect('/auth/AuthorizationError')

        //     } else if (err == "TokenError") {
        //         //金鑰異常
        //         return res.redirect('/auth/TokenError');
        //     }
        // } else {
        //     // 如果沒有異常
        //     // 使用者資料，儲存在 req.session.user 中
        //     req.session.user = user;
        //     console.log(req.session.user);
        //     //存完cookie 將使用者導向到 成功畫面
        //     return res.redirect('/protected');
        // }
    })(req, res, next);
});

// #請求授權錯誤
app.get('/auth/AuthorizationError', (req, res) => {
    console.log("/auth/AuthorizationError");

    res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
    <a href=\"/auth/apple\">Sign in with Apple</a>");
})

// #金鑰異常
app.get('/auth/TokenError', (req, res) => {
    console.log("/auth/TokenError");

    res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
    <a href=\"/auth/apple\">Sign in with Apple</a>");
})

app.get('/protected', isLoggedIn, (req, res) => {
    console.log("protected", req.session.user);
    const user = req.session.user;
    let name = user.name?  user.name : "庫娃娃";
    res.send(`Hello，${name}~`);
});


app.use((err, req, res, next) => {
    console.log(err)
    if (err) {
        res.status(404).redirect('/')
    }
})


app.listen(3000, () => console.log("listening in http://localhost:3000"))