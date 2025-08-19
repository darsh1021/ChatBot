const mongoose = require('mongoose');
require("dotenv").config();

const connectDB= async() =>{
    
    try{
         await mongoose.connect(process.env.MONGO_URI);
         console.log("Connection successful");
    }
    catch(err)
    {
        console.log("conncection failed");
        process.exit(1);
    }
} 

module.exports = connectDB;