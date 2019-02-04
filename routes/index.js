import express from "express";
const indexRouter = express.Router();

indexRouter.route("/")
.get((req,res,next)=>{
    res.render("landing");
});

module.exports = indexRouter;