app.use(session({
    name: 'session-id',
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}))

function auth(req,res,next){
    console.log(req.session);

    if(!req.session.user){
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
            req.session.user = "admin";
            next();
        }else{
            let err = new Error('You are not authenticated');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
    }
    else{
        if(req.session.user === 'admin'){
            next();
        }
        else{
            let err = new Error('You are not authenticated');
            
            err.status = 401;
            return next(err);
        }
    }

    
}