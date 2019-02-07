import express from "express";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
const FileStore = require('session-file-store')(session);
import logger from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import indexRouter from "./routes/index"
import campgroundRouter from "./routes/campground";
import usersRouter from "./routes/users";
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
//app.use(cookieParser("12345-67890-09876-54321"));

app.use(session({
    name: 'session-id',
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}))

app.use(indexRouter);
app.use('/users', usersRouter);

function auth(req,res,next){
    console.log(req.session);
    if(!req.session.user){
            let err = new Error('You are not authenticated');
            err.status = 401;
            return next(err);
    }
    else{
        if(req.session.user === 'authenticated'){
            next();
        }
        else{
            let err = new Error('You are not authenticated');
            
            err.status = 403;
            return next(err);
        }
    }

    
}

app.use(auth);

app.use(express.static(path.join(__dirname, "/public")));


app.use("/", campgroundRouter);

app.listen(port, hostname, ()=>{
    console.log(`Server listening at https://${hostname}:${port}`);
});