function auth(req,res,next){
    console.log(req.headers);

    var authHeader = req.header.authorization;

    if(!authHeader){
        let err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];

    if(username === "admin" && password === "password"){
        next();
    }else{
        let err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}

app.use(auth);