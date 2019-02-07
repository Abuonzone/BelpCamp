import express from "express";
import bodyParser from 'body-parser';
import User from "../models/user";

const router = express.Router();
router.use(bodyParser.json());

/*GET users listing */
router.get("/", (req,res,next)=>{
    res.send("respond with a resource");
});

router.post("/signup", (req,res,next)=>{
    console.log(req.body.username);
    let query = {username: req.body.username};
    User.find(query)
    .then((user)=>{
        if(user === null){
            var err = new Error('User ' + req.body.username + ' already exists');
            err.statusCode = 403;
        }
        else{
            return User.create({
                username: req.body.username,
                password: req.body.password
            });
        }
    })
    .then((user)=>{
        res.setHeader("Content-Type", "application/json");
        res.status(200).end('This connection is successful');
    })
    .catch((err)=>{
        next(err);
    });
});

router.post('/login', (req,res,next)=>{
    if(!req.session.user){
        let authHeader = req.headers.authorization;

        if(!authHeader){
            let err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }

        let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        let username = auth[0];
        let password = auth[1];

        User.findOne({username: username})
        .then((user)=>{
            if(user === null){
                let err = new Error('User ' + username + ' does not exist');
                err.status = 403;
                return next(err);
            }
            else if(user.password !== password){
                let err = new Error('Password is not correct!');
                err.status = 403;
                return next(err);
            }
            else if(user.username === username && user.password === password){
                req.session.user = "authenticated";
                res.statusCode = 200;res.setHeader('Content-Type', 'text/plain');
                res.end("You are authenticated!");
            }
        })
        .catch(err => next(err));
    }
    else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already Authenticated');
    }
});

router.get('/logout', (req,res,next)=>{
    if(req.session){
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }
    else{
        var err = new Error('you are not logged in!');
        err.status = 403;
        next(err);
    }
})
module.exports = router;