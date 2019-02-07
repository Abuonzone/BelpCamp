import express from "express";
import bodyParser from 'body-parser';
import User from "../models/user1";
import passport from "passport";

const router = express.Router();
router.use(bodyParser.json());

/*GET users listing */
router.get("/", (req,res,next)=>{
    res.send("respond with a resource");
});

router.post("/signup", (req,res,next)=>{
    console.log(req.body.username);
    let query = {username: req.body.username};
    User.register(new User(query), req.body.password, (err, user) => {
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({err: err});
        }
        else{
            passport.authenticate('local')(req, res, ()=>{
                res.setHeader("Content-Type", "application/json");
                res.status(200).json({success: true, status: "Registration Successful!"});
            });
        }
    });
});

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({success: true, status: "You are successfully logged in!"});
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