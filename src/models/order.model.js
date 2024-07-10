import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem"
        }
    ],
    total: Number,
    totalItems: Number,
    orderStatus: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },

})

export default mongoose.model("Order", OrderSchema)