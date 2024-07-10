import { getUserIdFromToken } from "../config/jwtProvider.js";
import userService from "../services/userService.js";

const authenticate = async (req, res, next) => { 
    // Bearer token here
    try {
        const token = req.headers.authorization.split(" ")[1];
       if(!token) res.status(401).send({message: "Unauthorized"});
       const userId = getUserIdFromToken(token);
       if(!userId) res.status(401).send({message: "Unauthorized"});
       const user = userService.findUserById(userId);
       req.user = user; // this req.user will be used in controllers
 
    } catch (error) {
        return res.send({error : error.message})
    }
    next();
}