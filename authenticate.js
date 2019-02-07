import passport from "passport";
const LocalStrategy = require('passport-local').Strategy;
import User from "./models/user1";

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());