// mongoose act as bridge between node.js and database basically it help to connect node.js server to database server 
const mongoose=require('mongoose');

// define the MongoDB connection URL
// const mongoURL='mongodb://localhost:27017/mydatabase';  //replace 'mydatabase' with your database name
const mongoURL='mongodb://localhost:27017/hotels'; 
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; //latest use URL

// set up MongoDB connection old
// mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// set up MongoDB connect new
mongoose.connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db=mongoose.connection;
// now this db act as bridge between node.js server and database server
// this object is what you'll use to handle events and interact with database


// this help to check weather db is connected or not  
//'connected','error', 'disconnected' they all are event listner keywords which is predefine by mongoDB and this db object
db.on('connected',()=>{
    console.log('Connected to MongoDB server "hurrre"');
});
db.on('error',()=>{
    console.error('MongoDB connection error: ');
});
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

// export the database connection
module.exports=db;