import jwt from 'jsonwebtoken';


// =============================================================
// Middleware function to authenticate JWT tokens
const jwtAuthMiddleware=(req,res,next)=>{
    const token= req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header (assuming it's in the format "Bearer <token>")
    if(!token){
        return res.status(401).json({message:'No token provided, authorization denied.'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET); // Verify the token using the secret key
        req.user=decoded; // Attach the decoded user information to the request object for use in subsequent middleware or route handlers
        next(); // Proceed to the next middleware or route handler
    }catch(error){
        return res.status(401).json({message:'Invalid token, authorization denied.'});
    }
}


// =============================================================
// Function to generate a JWT token for a user
const generateToken=(userData)=>{
    // Generate a JWT token with the user's information and a secret key, and set an expiration time (e.g., 1 hour)
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:'30m'}); // Adjust the expiration time as needed
}


// Export using ES Modules
export {jwtAuthMiddleware, generateToken};
