
function isLoggedIn(req, res, next) {
    console.log("{{ isLoggedIn }}",req.session.user);
    req.session.user? next(): res.status(401).redirect('/');
}


module.exports = (app) => {
    //# Homepage
    app.get('/', (req, res) => {
        res.send(`Welcome to ParaZeni
        <br /> \ <a href="/auth/apple">Authenticate with Apple</a> 
        <br /> \ <a href="/auth/facebook">Authenticate with Facebook</a>
        <br /> \ <a href="/auth/google">Authenticate with Google</a>
        <br /> \ <a href="/auth/line">Authenticate with Line</a>`)
    });
    
    //# Logout
    app.get('/logout', isLoggedIn,(req,res)=>{
        let name = req.session.user.name;
        req.logout(function(err) {
            if (err) { return next(err); }
            console.log(req.session);
            req.session.destroy();
            console.log(req.session);
            return res.send(`See you，${name}~
            <br /> \ <a href="/">Back to Homepage</a>`);
          });    
    
    
    })

    //# UserInfo page
    app.get('/protected', isLoggedIn, (req, res) => {
        console.log("protected", req.session.user);
        const user = req.session.user;
        let name = user.name ? user.name : "庫娃娃";
        res.send(`Hello，${name}~
        <br /> \ <a href="/logout">{{ Logout }}</a>`);
    });


    //➫ 第三方登入のrouter
    app.use('/auth', require('./auth'));
}




