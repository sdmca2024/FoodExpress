import mongoose from "mongoose"; 

const RestaurantSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    images: [String],
    cuisineType: String,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    },
    contact: {},
    operningHours: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order", 
        }
    ],
    numRating: Number,
    registrationDate: {
        tyoe: Date,
        default: Date.now
    },
    open: Boolean,
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
    } 

})

export default mongoose.model("Restaurant", RestaurantSchema)
