import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import indexRouter from "./routes/index"

mongoose.connect("mongodb://localhost/belpcamp", {useNewUrlParser: true}, ()=>{
    console.log("Database Connected Successfully");
});

const   app = express(),
        port = 3000,
        hostname = "localhost";

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(indexRouter);

app.listen(port, hostname, ()=>{
    console.log(`Server listening at https://${hostname}:${port}`);
});