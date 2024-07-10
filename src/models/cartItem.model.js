import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    cart :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    },
    quantity: Number,
    total: Number
})

export default mongoose.model("CartItem", CartItemSchema)
