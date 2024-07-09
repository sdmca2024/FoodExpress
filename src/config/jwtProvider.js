import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

//configure the dotenv 
dotenv.config();
//declare secret key for token
const SECRET_KEY = process.env.SECRET_KEY; 

export function generateToken (userId) {
    const token = jwt.sign({userId: userId}, SECRET_KEY, {
        expiresIn: "48h"
    })
    return token;
}

export function getUserIdFromToken(token){
    const decodedToken  = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
}

 