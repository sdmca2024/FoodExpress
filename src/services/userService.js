import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export default {
    //function for creating users taking userData object as arg
    async createUser(userData) {
        try {
            let {fullName, emailValue, password, role} = userData;
            //check if user is already exist
            const isUserExist = await User.findOne({email:emailValue})

            if(isUserExist){
                throw new Error("User already exists with email!");
            }

            // if unique user then set password
            password = await bcrypt.hash(password,8);
            // then create user with arguments
            const user = await User.create( {
                fullName,
                email: emailValue,
                password,
                role
            })


        } catch (error) {
            throw new Error(error.message)
        }
    },

    // function for get user by email 
    async getUserByEmail(email){
        try {
                //find the user in User model from email
                const user = await User.findOne({email: email})
                if(!user){
                    throw new Error("User not found!")
                }
                return user;

        } catch (error) {
            throw  new Error(error.message)
        }
    },

    // find user by id
    async findUserById(userId) {
        try {
            const user = await User.findOne(userId).populate("addresses");

            if(!user){
                throw new Error("User not found with this Id", userId);
            }
            return user;

        } catch (error) {
            throw new Error(error.message)
        }
    },

    // find user profile by jwt
    async findUserProfileByJwt(jwt) {
        //userId
        try {
                const userId = getUserIdFromToken(jwt);
                const user = await this.findUserById(userId);
                return user;
        } catch ( error) {
            throw new Error(error.message)
        }
    },

    // find all users 
    async findAllUsers () {
        try {

            const users = await User.find();
            return users;
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

 

