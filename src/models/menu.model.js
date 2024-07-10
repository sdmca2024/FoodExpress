import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    name: String,
    description: String,
    images: [String],
    price: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    available: Boolean,
    rating: Number ,
    restraunt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    isVeg : Boolean,
    isSeasonal : Boolean,
    ingradients : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "IngradientsItem"
    }]
})

export default mongoose.model("Menu", MenuSchema)
