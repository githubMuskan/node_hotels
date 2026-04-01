import dns from 'dns';

import { connectDB } from './db.js';
import express from 'express';
// import menuRouter from './routes/menuRoutes.js';
// import personRouter from './routes/personRoutes.js';
// first import body-parser in terminal by using 'npm i body-parser'
import bodyParser from 'body-parser';
dns.setDefaultResultOrder('ipv4first');


const app=express();
// const db= require('./db');
app.use(bodyParser.json()); //req.body have data in last which come from frontend by client

connectDB();


app.get('/',(req,res)=>{
    res.send('welcome to hotel.... how can i help you? ')
})


// app.use('/person',personRouter);

// app.use('/menu',menuRouter);

app.listen(3000,()=>{
    console.log('listening on port 3000');
})