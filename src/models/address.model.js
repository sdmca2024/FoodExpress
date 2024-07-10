import mongoose from "mongoose";

// define the address schema
const AddressSchema = new mongoose.Schema({
    fullname: String,
    streetAddress: String,
    city: String,
    state: String,
    country: String,
    pinCode: Number,
    phoneNumber: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

//export the model
export default mongoose.model("Address", AddressSchema)
