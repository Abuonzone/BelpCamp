import express from "express";
import Campground from "../models/campground";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const campgroundRouter = express.Router();
campgroundRouter.use(bodyParser.urlencoded({extended: true}));

campgroundRouter.route("/")
.get((req, res)=>{
    Campground.find({}, (err, foundCamps)=>{
        if(err){console.log(err)}
        res.render("campgrounds", {campgrounds: foundCamps});
    });
})
.post((req, res)=>{
    let camp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    } 
    Campground.create(camp, (err, createdCamp)=>{
        if(err){console.log(err)}
        //console.log(createdCamp);
        res.redirect("campgrounds");
    });
});

campgroundRouter.route("/new")
.get((req,res)=>{
    res.render("campground/new");
});

campgroundRouter.route("/:id")
.get((req,res)=>{
    Campground.findById(req.params.id, (err, foundCamp)=>{
        if(err) console.log(err)
        res.render("campground/show", {campground: foundCamp});
    });
})
.put((req,res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err) console.log(err);
        console.log(updatedCampground);
        res.redirect("campground/show");
    });
})
.delete((req,res)=>{
    Campground.findByIdAndRemove(req.params.id, (err, deletedCamp)=>{
        if(err) console.log(err);
        console.log(deletedCamp);
        res.redirect("campgrounds");
    });
});

campgroundRouter.route("/:id/edit")
.get((req,res)=>{
    res.render("campground/edit");
});

module.exports = campgroundRouter;