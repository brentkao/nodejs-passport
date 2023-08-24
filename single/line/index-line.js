const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./auth-line');

function isLoggedIn(req, res, next) {
    next()
    // req.user? next(): res.sendStatus(401);
}

const app = express();
app.use(session({
    secret: "KOisCool",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('Welcome to Bowa <br /> \ <a href="/auth/line">Authenticate with Line</a>')
});

app.get('/auth/line', passport.authenticate('line'));

app.use((req,res,next)=>{
    console.log(req.url);
    next()
})
app.get('/auth/line/callback', function (req, res, next) {
    passport.authenticate('line', function (err, user, info) {
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
            console.log("使用者無異常",req.session.user);
            //存完cookie 將使用者導向到 成功畫面
            return res.redirect('/protected');
        }
        return res.status(500).redirect('/');

    })(req, res, next);
});

app.get('/auth/failure', (req, res) => {
    res.send("Something went wrong..")
})

app.get('/protected', isLoggedIn, (req, res) => {
    console.log(req.session.user);
    const user = req?.session?.user;
    if (user) {
        // 顯示使用者資訊
        console.log(`歡迎，${user.name}`);
        res.send(`歡迎，${user.name}`);
    } else {
        // 使用者未登入，轉到登入頁面
        console.log(`使用者未登入，轉到登入頁面`);
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        if(req.session.user){
            req.session.destroy();
            res.send('<h1>GoodBye!</h1> <br /> \ <a href="/">Back to Homepage!</a>');
        }else{
            req.session.destroy();
            res.redirect('/');
        }
    });


})

app.listen(3000, () => console.log("listening in http://localhost:3000"));