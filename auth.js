import Person from './models/person.js';
import passport from 'passport';
import pkg from 'passport-local';
// this strategy is used for authentication in node.js and it is a middleware which is used to authenticate user by using username and password
const { Strategy: LocalStrategy } = pkg;

// =======================
// PASSPORT CONFIGURATION
// =======================
// Initialize Passport's Local Strategy (you'll need to configure it properly in a real app)
// done is callback function which is used to pass the user object to the next middleware or route handler if authentication is successful otherwise it will pass false and error message if authentication fails
// In a real application, you should hash passwords and use a secure method to compare them (e.g., bcrypt). This is just a simplified example.
passport.use(new LocalStrategy(async(user_name,password_,done)=>{  
    try {
        // authenticate user here (e.g., check username and password against database)
        console.log('Authenticating user:', user_name);
        const user= await Person.findOne({username:user_name});
        if(!user){
            return done(null, false, {message: 'Incorrect username.'});
        }
        // const isPasswordMatch=user.password===password_? true:false;
        const isPasswordMatch=await user.comparePassword(password_);
        if(!isPasswordMatch){
            return done(null, false,{message:'Incorrect password.'});
        }else{
            return done(null,user);
        }
    } catch (error) {
        return done(error);
    }
})); 
export default passport; // Export the configured Passport instance for use in other parts of the application   