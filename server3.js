// Import core modules
import dns from 'dns';
import express from 'express';

// Import custom modules (IMPORTANT: keep .js extension in ES modules)
import { connectDB } from './db.js';
import menuRouter from './routes/menuRoutes.js';
import personRouter from './routes/personRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT ||3000;
// first import body-parser in terminal by using 'npm i body-parser'
import bodyParser from 'body-parser';

// Force Node.js to prefer IPv4 (fixes MongoDB SRV ECONNREFUSED issue)
dns.setDefaultResultOrder('ipv4first');


// =======================
// INITIALIZE EXPRESS APP
// =======================
const app = express();


// =======================
// MIDDLEWARE
// =======================
// req.body have data in last which come from frontend by client
app.use(bodyParser.json());

// (Optional but recommended) handle URL encoded data
app.use(express.urlencoded({ extended: true }));


// =======================
// CONNECT DATABASE
// =======================
connectDB(); // make sure this function handles errors properly


// =======================
// ROUTES
// =======================
app.get('/', (req, res) => {
    res.send('welcome to hotel.... how can i help you? ');
});

// Use routers
app.use('/person', personRouter);
app.use('/menu', menuRouter);


// =======================
// START SERVER
// =======================

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});




// import dns from 'dns';
// import { connectDB } from './db.js';
// import express from 'express';
// import menuRouter from './routes/menuRoutes.js';
// import personRouter from './routes/personRoutes.js';
// // first import body-parser in terminal by using 'npm i body-parser'
// import bodyParser from 'body-parser';
// dns.setDefaultResultOrder('ipv4first');


// const app=express();
// app.use(bodyParser.json()); //req.body have data in last which come from frontend by client

// connectDB();


// app.get('/',(req,res)=>{
//     res.send('welcome to hotel.... how can i help you? ')
// })


// app.use('/person',personRouter);

// app.use('/menu',menuRouter);

// app.listen(3000,()=>{
//     console.log('listening on port 3000');
// })