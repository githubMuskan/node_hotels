// Import core modules
import dns from 'dns';
import express from 'express';

// Import custom modules (IMPORTANT: keep .js extension in ES modules)
import { connectDB } from './db.js';
import menuRouter from './routes/menuRoutes.js';
import personRouter from './routes/personRoutes.js';
// first import body-parser in terminal by using 'npm i body-parser'
import bodyParser from 'body-parser';
import passport from './auth.js'; // Import the configured Passport instance

import dotenv from 'dotenv';
dotenv.config();

const PORT=process.env.PORT || 8000;
// const PORT=process.env.PORT || 3000;

// Force Node.js to prefer IPv4 (fixes MongoDB SRV ECONNREFUSED issue)
dns.setDefaultResultOrder('ipv4first');


// =======================
// INITIALIZE EXPRESS APP
// =======================
const app = express();



// req.body have data in last which come from frontend by client
app.use(bodyParser.json());

// (Optional but recommended) handle URL encoded data
app.use(express.urlencoded({ extended: true }));




// =======================
// CONNECT DATABASE
// =======================
connectDB(); // make sure this function handles errors properly


// =======================
// PASSPORT CONFIGURATION
// =======================
app.use(passport.initialize()); // Initialize Passport middleware
const localAuthenticateMiddleware=passport.authenticate('local',{session:false}); 
// This middleware will be used to protect routes that require authentication. It will check the username and password provided in the request against the Local Strategy we defined above. If authentication is successful, it will allow access to the protected route; otherwise, it will return an error response.


// =======================
// CUSTOM MIDDLEWARE
// =======================
// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next(); // Call the next middleware or route handler in the stack means when we call next() it will move to next middleware or route handler if we have any otherwise it will end the request-response cycle and send response to client if we have any response to send in that middleware or route handler
}

app.use(logRequest); // Apply the logging middleware to all routes


// =======================
// ROUTES
// =======================
app.get('/',(req, res) => {
    res.send('welcome to hotel.... how can i help you? ');
});

// Use routers
app.use('/person',localAuthenticateMiddleware ,personRouter);
app.use('/menu', menuRouter);

// Global error handler for invalid JSON and other middleware errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Invalid JSON payload:', err.message);
        return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});


// =======================
// START SERVER
// =======================

const server = app.listen(PORT, (err) => {
    if (err) {
        console.error('Server failed to start:', err);
        return;
    }
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Server address:`, server.address());
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