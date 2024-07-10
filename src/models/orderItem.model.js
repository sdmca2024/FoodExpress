import mongoose from "mongoose";
import ingradientCategoryModel from "./ingradientCategory.model";

const OrderItemSchema = new mongoose.Schema({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    },
    quantity: Number,
    total: Number,
    ingradients : [String],
})

export default mongoose.model("OrderItem", OrderItemSchema)