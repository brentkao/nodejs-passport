const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./auth-google');

function isLoggedIn(req,res,next) {
    req.user? next(): res.sendStatus(401);
}

const app = express();
app.use(session({
    secret: "KOisCool",
    resave: false,
    saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('Welcome to Bowa <br /> \ <a href="/auth/google">Authenticate with Google</a>')
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google',{
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure',(req,res)=>{
    res.send("Something went wrong..")
})

app.get('/protected',isLoggedIn , (req, res) => {
    console.log(req.user.displayName);
    res.send(`Hello，${req.user.displayName}~`);
});

app.get('/logout',(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        // res.send("GoodBye!");
        res.redirect('/');
      });    


})

app.listen(3000, () => console.log("listening in http://localhost:3000"))