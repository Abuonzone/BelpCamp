function auth(req,res,next){
    console.log(req.signedCookies);

    if(!req.signedCookies.user){
        let authHeader = req.headers.authorization;

        if(!authHeader){
            let err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }

        let auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        let username = auth[0];
        let password = auth[1];

        if(username === "admin" && password === "password"){
            res.cookie('user', 'admin', { signed: true})
            next();
        }else{
            let err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
    }
    else{
        if(req.signedCookies.user === 'admin'){
            next();
        }
        else{
            let err = new Error('You are not authenticated');
            
            err.status = 401;
            return next(err);
        }
    }

    
}