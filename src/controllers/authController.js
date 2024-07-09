import userService from "../services/userService.js";
import bcrypt from "bcrypt"; 
import { generateToken } from "../config/jwtProvider.js";

// create the register method for user
const register = async(req, res)=> {
    try {
        const user = await userService.createUser(req.body);
        console.log(user) 
        const jwt = generateToken(user._id);
        return res.status(200).send({jwt, message: "REGISTER SUCCESSFULLY!"})
        
    } catch (error) {
        return res.status(500).send({error: error.message})   
    }
}
const login = async(req, res) => {
    const {password, email} = req.body;

    try {

        const user = await userService.getUserByEmail(email);
        // check user object password is the same with argumented password
        const isPasswordValid  = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(400).send({message: "Invalid Password!"})
        }
        const jwt = generateToken(user._id);
        return res.status(200).send({jwt, message: "Login Successfully!"})
        
    } catch (error) {
        return res.status(500).send({error: error.message})
    }
}

export default { login, register }