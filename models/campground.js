import mongoose from "mongoose";
const campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
}, {
    timeStamps: true
});

module.exports = mongoose.model("Campground", campgroundSchema);