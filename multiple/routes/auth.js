const router = require('express').Router();
const passport = require('passport');

// function detectUserAndRedirect(err, user, info) {
//     if (err) {
//         //請求授權錯誤
//         (err == "AuthorizationError") ? res.redirect('/auth/AuthorizationError') : null;
//         //金鑰異常
//         (err == "TokenError") ? res.redirect('/auth/TokenError') : null;
//         return;
//     }

//     if (user) {
//         // 如果沒有異常
//         // 使用者資料，儲存在 req.session.user 中
//         req.session.user = user;
//         console.log("使用者無異常", req.session.user);
//         //存完cookie 將使用者導向到 成功畫面
//         return res.redirect('/protected');
//     }
//     return res.status(500).redirect('/');

// }


// #請求授權錯誤

router.get('/AuthorizationError', (req, res) => {
    console.log("/auth/AuthorizationError");

    res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
    <a href=\"/\">>>Go Back to Homepage! <<</a>");
})

// #金鑰異常
router.get('/TokenError', (req, res) => {
    console.log("/auth/TokenError");

    res.send("Oops! Couldn't get a valid token from servers! <br /> \
    <a href=\"/\">>>Go Back to Homepage! <<</a>");
})

//➫ APPLE
router.get("/apple", passport.authenticate('apple'));

router.post("/apple/callback", function (req, res, next) {
    passport.authenticate('apple', function (err, user, info) {
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

    })(req, res, next);
});


//➫ GOOGLE
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', function (req, res, next) {
    passport.authenticate('google', function (err, user, info) {
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
            console.log("使用者無異常", req.session.user);
            //存完cookie 將使用者導向到 成功畫面
            return res.redirect('/protected');
        }
        return res.status(500).redirect('/');

    })(req, res, next);
});

//➫ FACEBOOK
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
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

//➫ LINE
router.get('/line', passport.authenticate('line'));

router.get('/line/callback', function (req, res, next) {
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

module.exports = router;