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
import usersRouter from "./routes/users1";
import passport from "passport";
import auth from "./authenticate";
import config from "./config";
//import Seed from "./seeds";

mongoose.connect(config.mongoUrl, {useNewUrlParser: true, useCreateIndex: true}, ()=>{
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

app.use(auth.initialize());

app.use(indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, "/public")));


app.use("/", campgroundRouter);

app.listen(port, hostname, ()=>{
    console.log(`Server listening at https://${hostname}:${port}`);
});