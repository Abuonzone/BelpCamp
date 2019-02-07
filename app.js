import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import indexRouter from "./routes/index"
import campgroundRouter from "./routes/campground";
//import Seed from "./seeds";

mongoose.connect("mongodb://localhost/belpcamp", {useNewUrlParser: true}, ()=>{
    console.log("Database Connected Successfully");
});
//Seed();
const   app = express(),
        port = 3000,
        hostname = "localhost";
app.use(logger("dev"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieParser("12345-67890-09876-54321"));

function auth(req,res,next){
    console.log(req.signedCookies);

    if(!req.signedCookies.user){
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

        if(username === "admin" && password === "password"){
            res.cookie('user', 'admin', { signed: true})
            next();
        }else{
            let err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
    }
    else{
        if(req.signedCookies.user === 'admin'){
            next();
        }
        else{
            let err = new Error('You are not authenticated');
            
            err.status = 401;
            return next(err);
        }
    }

    
}

app.use(auth);

app.use(express.static(path.join(__dirname, "/public")));

app.use(indexRouter);
app.use("/", campgroundRouter);

app.listen(port, hostname, ()=>{
    console.log(`Server listening at https://${hostname}:${port}`);
});