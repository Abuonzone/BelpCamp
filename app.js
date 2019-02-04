import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect("mongodb://localhost/belpcamp", {useNewUrlParser: true}).then(()=>{
    console.log("Database Connected Successfully");
}).catch(err => console.log(err));

const   app = express(),
        port = 3000,
        hostname = "localhost";

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(indexRouter);

app.listen(port, hostname).then(()=>{
    console.log(`Server listening at https://${hostname}:${port}`);
});