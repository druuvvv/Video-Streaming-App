const createUser = require('./api/createUser.js')
const verifyUser = require('./api/verifyUser.js')
const session = require('express-session')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';

const server = next({ dev })
const handle = server.getRequestHandler();

server.prepare().then(()=> {

    const express = require('express');
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({extended : true}));
    app.use(session({secret : "TOP SECRET HAI JI" , resave : false , saveUninitialized : false}))

    app.get('/' , (req,res) => {
        if(req.session.isVerified){
            return handle(req,res);
        }
        else{
            res.redirect('/signin');
        }
    }
    )
    app.post("/api/auth/createUser" , (req,res) => {
        createUser(req,res)
    })
    app.post("/api/auth/verifyUser" , async (req,res) => {
       const {email} = req.body;
       try{
        const user = await verifyUser(req,res);
        if(user.isVerified){
            req.session.isVerified = true;
        }
        else{
            req.session.isVerified = false;
            user.message = "Invalid Email or Password!!"
        }
        console.log({myUser : user});
        res.json(user);
    }
        catch(error){
            res.status(400);
            req.session.isVerified = false;
        }

    })

    app.get('/signout' , (req,res,next) => {
        req.session.isVerified = false;
        res.redirect('/signin');
    })

    app.get('/secret' , (req,res) => {
        if(req.session.email){
            res.send("HELLEW")
        }

        else{
            res.send("AAF KAUN??");
        }
    })

    app.get('*' , (req,res) => {
        return  handle(req,res)
    })
    app.listen(3000 , (err) => {
        console.log("server is ready!!");
    })
})