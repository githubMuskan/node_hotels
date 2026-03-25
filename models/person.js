const mongoose= require('mongoose');

// now we are making schema
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true show that name input is required to filled
        required:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        // enum show only these option will be put input otherwise it will not accepted
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // unique email should be entered
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
})

// now create person model with the use of above schema and with the use of this model we perform operation like update, delete, create, put,post etc
const Person=mongoose.model('Person',personSchema);
module.exports=Person;