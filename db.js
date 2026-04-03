import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

export const connectDB = async () => {
  try {
    // const mongoURL = process.env.DB_LOCAL_URL;
    // const MONGO_URI = 'mongodb+srv://muskangarg2890_db_user:muskangarg123456@cluster0.lwmejvk.mongodb.net/hotels'; // 👈 hardcoded not working in my system srv
    const mongoURL =process.env.DB_ONLINE_URL; //get .env file variable like this 
    await mongoose.connect(mongoURL);

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Exit if DB fails
  }
};



// // mongoose act as bridge between node.js and database basically it help to connect node.js server to database server 
// import mongoose from('mongoose');
// // const mongoose=require('mongoose');

// // // define the MongoDB connection URL
// // // const mongoURL='mongodb://localhost:27017/mydatabase';  //replace 'mydatabase' with your database name
// // const mongoURL='mongodb://localhost:27017/hotels'; 
// // // const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; //latest use URL

// // const mongoURL='mongodb+srv://muskangarg2890_db_user:muskangarg123456@cluster0.lwmejvk.mongodb.net/hotels';
// // const mongoURL = "mongodb://muskangarg2890_db_user:muskangarg123456@cluster0.lwmejvk.mongodb.net/hotels";
// const mongoURL = "mongodb+srv://muskangarg2890_db_user:muskangarg123456@cluster0.lwmejvk.mongodb.net/";
// // this URL came from atles mongoDB where we create database with work online as public not for my localhost


// // set up MongoDB connection old
// // mongoose.connect(mongoURL, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // });


// // set up MongoDB connect new
// const ConnectDb=mongoose.connect(mongoURL)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.log(err));

// // get the default connection
// // Mongoose maintains a default connection object representing the MongoDB connection.
// const db=mongoose.connection;
// // now this db act as bridge between node.js server and database server
// // this object is what you'll use to handle events and interact with database


// // this help to check weather db is connected or not  
// //'connected','error', 'disconnected' they all are event listner keywords which is predefine by mongoDB and this db object
// db.on('connected',()=>{
//     console.log('Connected to MongoDB server "hurrre"');
// });
// db.on('error',()=>{
//     console.error('MongoDB connection error: ');
// });
// db.on('disconnected',()=>{
//     console.log('MongoDB disconnected');
// });

// // export the database connection
// module.exports=db;


