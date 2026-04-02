// Import mongoose using ES Modules
import mongoose from 'mongoose';

// =======================
// DEFINE SCHEMA
// =======================
const menuItemSchema = new mongoose.Schema({

    // Name of the menu item (required string)
    name: {
        type: String,
        required: true
    },

    // Price of the item (required number)
    price: {
        type: Number,
        required: true
    },

    // Taste category (restricted using enum)
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'], // only these values allowed
        required: true
    },

    // Boolean flag to check if item is a drink
    is_drink: {
        type: Boolean,
        default: false
    },

    // List of ingredients (array of strings)
    ingredients: {
        type: [String],
        default: []
    },

    // Number of times item sold
    num_sales: {
        type: Number,
        default: 0
    }

});


// =======================
// CREATE MODEL
// =======================
// 'MenuItem' → collection will be 'menuitems' in MongoDB
const MenuItem = mongoose.model('MenuItem', menuItemSchema);


// =======================
// EXPORT MODEL (ES MODULE)
// =======================
export default MenuItem;




// const mongoose=require('mongoose');
// const menuItemSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//     taste:{
//         type:String,
//         enum:['sweet','spicy','sour'],
//         required:true
//     },
//     is_drink:{
//         type:Boolean,
//         default:false,
//     },
//     ingredients:{
//         type:[String],
//         default:[]
//     },
//     num_sales:{
//         type:Number,
//         default:0
//     }
// })
// const MenuItem=mongoose.model('MenuItem',menuItemSchema);
// module.exports=MenuItem;