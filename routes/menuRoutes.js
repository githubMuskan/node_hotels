// Import required modules (ES Modules syntax)
import express from 'express';
import MenuItem from '../models/Menu.js'; // NOTE: .js extension required in ES modules

const router = express.Router();


// =======================
// CREATE MENU ITEM
// =======================
router.post('/', async (req, res) => {
    try {
        // Create new menu item using request body
        const newMenuItem = new MenuItem(req.body);

        // Save to database
        const response = await newMenuItem.save();

        console.log('✅ Menu data saved');

        // 201 → resource created successfully
        res.status(201).json(response);

    } catch (err) {
        console.error(err);

        // 500 → internal server error
        res.status(500).json({ error: 'Internal server error in Menu' });
    }
});


// =======================
// READ ALL MENU ITEMS
// =======================
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();

        console.log('✅ Menu data fetched');

        res.status(200).json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// READ BY TASTE (IMPROVED ROUTE)
// =======================
// Instead of '/:menuType' → use '/taste/:menuType'
// This avoids conflict with '/:id'
router.get('/taste/:menuType', async (req, res) => {
    try {
        // Destructuring params
        const { menuType } = req.params;

        // Valid taste types
        const validTypes = ['spicy', 'sweet', 'sour'];

        // Validation check
        if (!validTypes.includes(menuType)) {
            // 400 → bad request (invalid input)
            return res.status(400).json({ error: 'Invalid taste type' });
        }

        // Fetch data based on taste
        const menuData = await MenuItem.find({ taste: menuType });

        console.log('✅ Data fetched by taste');

        res.status(200).json(menuData);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// UPDATE MENU ITEM
// =======================
router.put('/:id', async (req, res) => {
    try {
        const response = await MenuItem.findByIdAndUpdate(
            req.params.id,   // ID from URL
            req.body,        // Updated data
            {
                new: true,        // return updated document
                runValidators: true, // run schema validation
            }
        );

        // If ID not found
        if (!response) {
            return res.status(404).json({ error: 'ID not found for update' });
        }

        console.log('✅ Data updated successfully');

        res.status(200).json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// DELETE MENU ITEM
// =======================
router.delete('/:id', async (req, res) => {
    try {
        const response = await MenuItem.findByIdAndDelete(req.params.id);

        // If ID not found
        if (!response) {
            return res.status(404).json({ error: 'ID not found for delete' });
        }

        console.log('✅ Data deleted successfully');

        res.status(200).json({ message: 'Menu item deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// =======================
// EXPORT ROUTER (ES MODULE)
// =======================
export default router;




// const express=require('express');
// const router=express.Router();

// const MenuItem = require('../models/Menu');

// router.post('/',async (req,res)=>{
//     try{
//         const data= req.body;
//         const newMenuItem= new MenuItem(data);
//         const response=await newMenuItem.save();
//         console.log('menudata saved');
//         res.status(200).json(response);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internet server error in Menu'})
//     }
// })

// router.get('/', async(req,res)=>{
//     try{
//         const data=await MenuItem.find();
//         console.log('menu data fetched');
//         res.status(200).json(data);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server Error'});
//     }
// })
// // :menuType is a parameter variable you can give any other name as well
// // and this value is given user or client
// router.get('/:menuType',async(req,res)=>{
//     try{
//         const menuval=req.params.menuType;
//         if(menuval=='spicy'||menuval=='sweet'||menuval=='sour'){
//             const menuData=await MenuItem.find({taste:menuval});
//             console.log('data fetched by menuTaste');
//             res.status(200).json(menuData);
//         }
//         else{
//             res.status(404).json({error:'Invalid taste type'})
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server Error'});
//     }
// })
// router.put('/:id',async(req,res)=>{
//     try{
//         const idToUpdate=req.params.id;
//         const dataToUpdate=req.body;
//         const response=await MenuItem.findByIdAndUpdate(idToUpdate,dataToUpdate,{
//             new:true,
//             runValidators:true,
//         })
//         if(!response){
//             res.status(404).json({error:'id for update is not found'})
//         }
//         console.log('data updated sccussfully')
//         res.status(200).json(response);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server Error'});
//     }
// })
// router.delete('/:id',async(req,res)=>{
//     try{
//         const idToDelete=req.params.id;
//         const response=await MenuItem.findByIdAndDelete(idToDelete);
//         if(!response){
//             res.status(404).json({error:'id for delete is not found'})
//         }
//         console.log('data deleted sccussfully')
//         res.status(200).json({message:'deleted menuItem successfully'});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal server Error'});
//     }
// })

// // to exports router module
// module.exports=router;