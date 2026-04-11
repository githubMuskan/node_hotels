// Import mongoose using ES Modules
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// now we are making schema
const personSchema = new mongoose.Schema({

    name: {
        type: String,
        // required:true show that name input is required to filled
        required: true
    },

    age: {
        type: Number,
    },

    work: {
        type: String,
        // enum show only these option will be put input otherwise it will not accepted
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        // unique email should be entered
        unique: true
    },

    address: {
        type: String
    },

    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, {
    // 🔥 Optional but very useful → adds createdAt & updatedAt automatically
    timestamps: true
});


// personSchema.pre('save', async function () {
//     if (!this.isModified('password')) return;

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// pre-save hook to hash the password before saving the person document to the database
personSchema.pre('save',async function(next){
    const person=this;
    // not hash the password only if it has been modified (or is new)
    if(!person.isModified('password'))return next();
    try{
        // Only hash the password if it has been modified (or is new)
        const salt=await bcrypt.genSalt(10); // generate salt with 10 rounds

        // hash the password using the generated salt
        const hashedPassword=await bcrypt.hash(person.password,salt);
        // replace the plain text password with the hashed password

        person.password=hashedPassword;
        next();
    }catch(error){
        return next(error);
    }
})

// define a method to compare passwords
personSchema.methods.comparePassword=async function (candidatePassword){
    try{
        // compare the candidate password with the hashed password stored in the database
        const isMatch=await bcrypt.compare(candidatePassword, this.password);
        return isMatch; // returns true if passwords match, false otherwise
    }catch(error){
        throw new Error(error);
    }
}
// In the above code we are using bcrypt to hash the password before saving it to the database and also we are using comparePassword method to compare the candidate password with the hashed password stored in the database. This is a common practice to ensure that passwords are stored securely and not in plain text.
// prince -->ghsdy378hdsyu2398weiomnehuh3h929b383g
// login-->wrong password==> aggral
// step 1:  ghsdy378hdsyu2398weiomnehuh3h929b383g -->extract salt from the hashed password
// step 2: salt + aggral(candidate password) --> hash it again
// step 3: compare the newly hashed password with the stored hashed password if they match then password is correct otherwise it is incorrect


// now create person model with the use of above schema and with the use of this model we perform operation like update, delete, create, put,post etc
const Person = mongoose.model('Person', personSchema);


// EXPORT MODEL (ES MODULE)
export default Person;



