const express= require('express');
const app=express();
const db= require('./db');
// first import body-parser in terminal by using 'npm i body-parser'
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body have data in last which come from frontend by client


app.get('/',(req,res)=>{
    res.send('welcome to hotel.... how can i help you? ')
})


const personRouter=require('./routes/personRoutes');
app.use('/person',personRouter);

const menuRouter=require('./routes/menuRoutes');
app.use('/menu',menuRouter);

app.listen(3000,()=>{
    console.log('listening on port 3000');
})