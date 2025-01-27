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

//controllers
import cheesesController from './controllers/cheeses.js';

//create express server object
const app = express();

app.use(bodyParser.json());

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

//db connect
mongoose.connect(process.env.DB,{} )
.then((res)=>console.log('Connected to DB'))
.catch((err)=>console.log(`connection Failure: ${err}`));

//url dispatching
app.use("/api/v1/cheeses", cheesesController);

//start web server
app.listen(3000, () => { 
    console.log('Express API running on port 3000: http://localhost:3000'); 
});
console.log('See cheeses at : http://localhost:3000/api/v1/cheeses');
console.log('See API docs at: http://localhost:3000/api-docs/');