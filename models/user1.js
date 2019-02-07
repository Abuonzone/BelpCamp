import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;

var User = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", User);