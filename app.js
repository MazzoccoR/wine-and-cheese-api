/*
Rebecca Mazzocco
Created on: January 20, 2025
Last Edited on: January 20, 2025
Description: 
 */

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//swagger for api docs
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';

//passport auth 
import passport from 'passport';
import User from './models/user.js';

//jwt auth
import cookieParser from 'cookie-parser';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';//controllers
import cheesesController from './controllers/cheeses.js';
import userController from './controllers/users.js';


//create express server object
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
// get public path for angular client app
const __dirname = path.resolve();
app.use(express.static(`${__dirname}/public`));

//EXACLY BELOW FOR ASSIGNMENT 1 (just change title)
//swagger config
const docOptions={
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'Wine and Cheese API',
            version: '1.0.0',
        }
    },
    apis: ['./controllers/*.js']//where to find api methods (controllers)
};
const openapiSpecification = swaggerJSDoc(docOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
//EXACLY ABOVE FOR ASSIGNEMNT 1 (just chnage title)

//db connect - make sure that "dev": "nodemon --env-file=.env app.js", not jsut app.js (oops)
mongoose.connect(process.env.DB,{} )
.then((res)=>console.log('Connected to DB'))
.catch((err)=>console.log(`connection Failure: ${err}`));

//cors: allow angular client http requests
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
}));

// passport auth config
app.use(passport.initialize());

//passport-local is the default
passport.use(User.createStrategy());

//jwt config
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
}

// jwt strategy
let strategy = new JwtStrategy(jwtOptions, (jwt_payload, callback) => {
    try{
        const user = User.findById(jwt_payload.id);
        if(user){
            //retrun exists, send back no errror plus the user object
            return callback(null, user);
        }
        //user not found
        return callback(null, false);
    }
    catch(err){
        return callback(err, false);
    }
});

passport.use(strategy);

//url dispatching
app.use("/api/v1/cheeses", cheesesController);
app.use("/api/v1/users", userController);
app.use('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
//start web server
app.listen(3000, () => { 
    console.log('Express API running on port 3000: http://localhost:3000'); 
});
console.log('See cheeses at : http://localhost:3000/api/v1/cheeses');
console.log('See API docs at: http://localhost:3000/api-docs/');