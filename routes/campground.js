import express from "express";
import Campground from "../models/campground";
import auth from "../authenticate";


const campgroundRouter = express.Router();

campgroundRouter.route("/campgrounds")
.get((req, res)=>{
    Campground.find({}, (err, foundCamps)=>{
        if(err){console.log(err)}
        res.render("campgrounds", {campgrounds: foundCamps});
    });
})
.post(auth.authenticate(), (req, res)=>{
    let camp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    } 
    Campground.create(camp, (err, createdCamp)=>{
        if(err){console.log(err)}
        console.log(createdCamp);
        res.redirect("campgrounds");
    });
});

campgroundRouter.route("/campgrounds/new")
.get(auth.authenticate,(req,res)=>{
    res.render("campground/new");
});

campgroundRouter.route("/campground/:id")
.get((req,res)=>{
    console.log(req.params.id)
    Campground.findById(req.params.id, (err, foundCamp)=>{
        if(err){console.log(err)}
        res.render("campground/show", {campground: foundCamp});
    });
})
.put(auth.authenticate(),(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){console.log(err);}
        console.log(updatedCampground);
        res.redirect("/campground/" + req.params.id);
    });
})
.delete(auth.authenticate(),(req,res)=>{
    Campground.findByIdAndRemove(req.params.id, (err, deletedCamp)=>{
        if(err){console.log(err);}
        console.log(deletedCamp);
        res.redirect("/campgrounds");
    });
});

campgroundRouter.route("/campground/:id/edit")
.get((req,res)=>{
    Campground.findById(req.params.id, (err, findCamp)=>{
        if(err){console.log(err)}
        res.render("campground/edit", {camp: findCamp});
    });
});

module.exports = campgroundRouter;