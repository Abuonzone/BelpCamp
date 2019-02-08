import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import User from "./models/user1";
import passporJWT from "passport-jwt";
const JwtStrategy = passporJWT.Strategy;
const ExtractJwt = passporJWT.ExtractJwt;
import jwt from "jsonwebtoken";
import config from "./config";
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretKey
};

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

module.exports = function(){
    var strategy = new JwtStrategy(opts, (payload, done)=>{
        User.findOne({_id: payload._id}, (err, user)=>{
            if(err){
                return done(err, false);
            }
            else if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function(){
            return passport.initialize();
        },
        authenticate: function(){
            return passport.authenticate('jwt', {session: false});
        }
    }
}


/* exports.jwtPassport = passport.use(opts, new JwtStrategy(opts, (jwt_payload, done)=>{
    console.log("JWT payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user)=>{
        if(err){
            return done(err, false);
        }
        else if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt',{session: false}); */