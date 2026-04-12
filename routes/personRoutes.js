// Import modules using ES Modules
import express from 'express';
import Person from '../models/person.js';
import {jwtAuthMiddleware,generateToken} from '../jwt.js';


const router = express.Router();


// POST route to add a preson
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'Request body is required and must be valid JSON' });
        }

        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');

        // Generate a JWT token for the newly created user
        const payload={
            id:response.id,
            username:response.username
        }
        const token=generateToken(payload); // Generate a JWT token for the newly created user
        console.log('JWT token generated:', token);
        // Send the token back to the client in the response (you can also include user info if needed)
        res.status(201).json({response:response, token: token});

    } catch (err) {
        console.error(err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed', details: err.errors });
        }

        if (err.code === 11000) {
            return res.status(400).json({ error: 'Duplicate field value', details: err.keyValue });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
});


// POST route for user login (authentication)
router.post('/login', async (req, res) => {
    try {
        console.log('Login request received:', req.body);
        
        // Extract username and password from the request body
        const { username, password } = req.body;
        
        // Validate inputs
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        
        // Find the user in the database by username
        const user = await Person.findOne({ username: username });
        
        // If user is not found, return an error response
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // Compare passwords
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        // If authentication is successful, generate a JWT token for the user
        const payload = {
            id: user.id,
            username: user.username
        };
        const token = generateToken(payload); // Generate a JWT token for the authenticated user
        
        // Return the token in the response to the client
        res.status(200).json({ message: 'Login successful', token: token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to get the person
// router.get('/person',async(req,res)=>{
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');

        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server Error' });
    }
});

// GET route to get user profile (protected route, requires JWT authentication)
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        console.log('Profile route hit');
        // The jwtAuthMiddleware will verify the token and attach the decoded user information to req.user
        const userData=req.user; // Access the decoded user information from the request object
        console.log('Authenticated user data:', userData);
        const userId=userData.id; // Get the user ID from the decoded token
        const user= await Person.findById(userId); // Fetch the user profile from the database using the user ID
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        res.status(200).json({profile:user}); // Return the user profile in the response
    }catch(error){
        console.error('Error fetching user profile:', error);
        res.status(500).json({error:'Internal server error'});
    }
});

// /:workType in this "workType" is a variable name which define the key or value you want data 
// 🔥 FIX: changed route to '/work/:workType' to avoid conflict with '/:id'
router.get('/work/:workType', async (req, res) => {
    try {
        const workdata = req.params.workType;

        if (workdata == 'chef' || workdata == 'waiter' || workdata == 'manager') {
            const response = await Person.find({ work: workdata });
            console.log('response for WorkType fetched');

            res.status(200).json(response);

        } else {
            // 400 → bad request
            return res.status(400).json({ error: 'invalid work type' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internet server error' });
    }
});


// UPDATE PERSON
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the id from URL paramter which is given
        const updatedData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedData, {
            new: true, //return the updated document in 'response' variable
            runValidators: true, //run mongoose validation means it will automatically check the validation that we apply in person.js and update accordingly
        });

        // let if we enter wrong id value then there will be nothing in response becuase personId will not find so no update then response is empty
        if (!response) {
            return res.status(404).json({ error: 'invalid ID parameter (person not found)' });
        }

        console.log('data updated');
        res.status(200).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internet server error' });
    }
});


// DELETE PERSON
router.delete('/:id', async (req, res) => {
    try {
        const idToDelete = req.params.id;

        const response = await Person.findByIdAndDelete(idToDelete);

        if (!response) {
            return res.status(404).json({ error: 'invalid ID parameter' });
        }

        console.log('data deleted');
        res.status(200).json({ message: 'person deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internet server error' });
    }
});


// EXPORT ROUTER (ES MODULE)
export default router;



// const express=require('express');
// const Person = require('../models/person');
// const router=express.Router();


// // POST route to add a preson
// router.post('/',async(req,res)=>{
//     try{
//         const data=req.body; // assume the request body contain the person's data

//         // create a new person document using the Mongoose model
//         const newPerson=new Person(data);

//         // save the new person to the database
//         const response=await newPerson.save();
//         console.log('data saved');
//         res.status(200).json(response);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server Error'});
//     }
// })

// // GET method to get the person
// // router.get('/person',async(req,res)=>{
// router.get('/',async(req,res)=>{
//     try{
//         const data=await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server Error'});
//     }
// })

// // /:workType in this "workType" is a variable name which define the key or value you want data 
// router.get('/:workType',async(req,res)=>{
//     try{
//         const workdata=req.params.workType;
//         if(workdata=='chef'||workdata=='waiter'||workdata=='manager'){
//             const response=await Person.find({work:workdata});
//             console.log('response for WorkType fetched');
//             res.status(200).json(response);
//         }
//         else{
//             res.status(404).json({error:'invalid work type'})
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'internet server error'});
//     }
// })

// router.put('/:id',async(req,res)=>{
//     try{
//         const personId=req.params.id; //Extract the id from URL paramter which is given
//         const updatedData=req.body;
//         const response=await Person.findByIdAndUpdate(personId,updatedData,{
//             new:true, //return the updated document in 'response' variable
//             runValidators:true, //run mongoose validation means it will automatically check the validation that we apply in person.js and update accordingly
//         })
//         // let if we enter wrong id value then there will be nothing in response becuase personId will not find so no update then response is empty
//         if(!response){
//             res.status(404).json({error:'invalid ID parameter (person not found)'});
//         }
//         console.log('data updated');
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'internet server error'});
//     }
// })
// router.delete('/:id',async(req,res)=>{
//     try{
//         const idToDelete=req.params.id;
//         const response=await Person.findByIdAndDelete(idToDelete);
//         if(!response){
//             res.status(404).json({error:'invalid ID parameter'})
//         }
//         console.log('data deleted');
//         res.status(200).json({message:'person deleted successfully'});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'internet server error'});
//     }
// })


// module.exports=router;