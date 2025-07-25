const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const userRoute =require('./routes/user');
const videoRoute = require('./routes/video');
const commentRoute = require('./routes/comment')
const bodyParser= require('body-parser');
const fileUpload = require('express-fileupload');


const connectDatabase= async()=>{
    try{
        const res= await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Conntected...");
    }
    catch(err){
        console.log(err);
    }
}
connectDatabase();


app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use('/user',userRoute);
app.use('/video',videoRoute);
app.use('/comment',commentRoute)

module.exports = app;