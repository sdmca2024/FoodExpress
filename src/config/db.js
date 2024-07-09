import mongoose from "mongoose" // importing mongoose as middleware of db

// this is db url taken from mongodb db account 
const MONGODB_URL = "mongodb+srv://sdmca2024:4NVZHBKitLYCphAs@cluster0.thqfuuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// declare connectDB for connect the db
async function connectDB(){
    console.log("DB connected !")
    return mongoose.connect(MONGODB_URL)
}

export default connectDB;
