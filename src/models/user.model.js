import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName : String,
    email: String,
    password:String,
    role: {
        type:String,
        enum:['ROLE_CUSTOMER', 'ROLE_OWNER'],
        default: "ROLE_CUSTOMER"
    },
    orders: [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Order"
        },
    ],
    favorites: [
        {
            name:String,
            description:String,
            images:[]
        }
    ],
    addresses : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Address",
        }
    ],
});

export default mongoose.model("User", UserSchema);