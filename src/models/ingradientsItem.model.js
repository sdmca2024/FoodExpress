import mongoose from "mongoose";

// define the Ingredients schema
const IngredientsItemSchema = new mongoose.Schema({
    name: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IngredientsCatogory"
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
     inStock : {
        type: Boolean,
        default: true   
     }

})

//export the model
export default mongoose.model("IngredientsItem", IngredientsItemSchema)
