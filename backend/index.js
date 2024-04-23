import express, { response } from "express";
import bodyParser from "body-parser";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()

// Parse JSON bodies for this app
app.use(bodyParser.json());

//Middleware for handling CORS Policy
// Option 1 : Allow all origins with default of cors(*)
// app.use(cors())

// Option 2 : Allow all custom origins
app.use(cors({
    origin: 'https://localhost:3000',
    methos:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

app.get('/', (req,res) => {
    return res.status(234).send('Welcome')
})

app.use('/books', booksRoute)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, () =>{
            console.log(`App is listening on port : ${PORT}`);  
        })
        
    })
    .catch(()=>{
        console.log(error);
        
    })

