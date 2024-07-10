import mongoose from "mongoose";
import cartItemModel from "./cartItem.model";

const CartSchema = new mongoose.Schema({
    customer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"     
    },
    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem"
    }],
    total : Number
})

export default mongoose.model("Cart", CartSchema)
