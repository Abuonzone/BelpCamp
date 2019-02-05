import Campground from "./models/campground";

Campground.remove({}, (err, deleted)=>{
    console.log("Database seeded");
});

module.exports = Campground;