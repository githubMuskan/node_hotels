// Import modules using ES Modules
import express from 'express';
import Person from '../models/person.js';

const router = express.Router();


// POST route to add a preson
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'Request body is required and must be valid JSON' });
        }

        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');

        res.status(201).json(response);

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


// GET method to get the person
// router.get('/person',async(req,res)=>{
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');

        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server Error' });
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