const express=require('express');
const router=express.Router();

const MenuItem = require('../models/Menu');

router.post('/',async (req,res)=>{
    try{
        const data= req.body;
        const newMenuItem= new MenuItem(data);
        const response=await newMenuItem.save();
        console.log('menudata saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internet server error in Menu'})
    }
})

router.get('/', async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('menu data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})
// :menuType is a parameter variable you can give any other name as well
// and this value is given user or client
router.get('/:menuType',async(req,res)=>{
    try{
        const menuval=req.params.menuType;
        if(menuval=='spicy'||menuval=='sweet'||menuval=='sour'){
            const menuData=await MenuItem.find({taste:menuval});
            console.log('data fetched by menuTaste');
            res.status(200).json(menuData);
        }
        else{
            res.status(404).json({error:'Invalid taste type'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const idToUpdate=req.params.id;
        const dataToUpdate=req.body;
        const response=await MenuItem.findByIdAndUpdate(idToUpdate,dataToUpdate,{
            new:true,
            runValidators:true,
        })
        if(!response){
            res.status(404).json({error:'id for update is not found'})
        }
        console.log('data updated sccussfully')
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const idToDelete=req.params.id;
        const response=await MenuItem.findByIdAndDelete(idToDelete);
        if(!response){
            res.status(404).json({error:'id for delete is not found'})
        }
        console.log('data deleted sccussfully')
        res.status(200).json({message:'deleted menuItem successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})

module.exports=router;
// adding commants