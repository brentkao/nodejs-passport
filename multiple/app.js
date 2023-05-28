const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
require('dotenv').config();

//➫ 第三方功能引入
require('./passport'); //#passport


//➫ Server setting
const port = process.env.PORT || 3000;



//➫ 啟動APP
const app = express();
app.listen(port, () => console.log(`listening in http://localhost:${port}`));

app.use(session({
    secret: "KOisCool",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));


//➫ Routes
require('./routes')(app);


app.use((err, req, res, next) => {
    console.log(err)
    if (err) {
        res.status(404).redirect('/')
    }
})

