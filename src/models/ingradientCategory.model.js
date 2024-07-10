import mongoose from "mongoose";

// define the Ingredients schema
const IngredientsCatogorySchema = new mongoose.Schema({
    name: String,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    ingredients:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IngredientsItem"
        }
    ]

})

//export the model
export default mongoose.model("IngredientsCatogory", IngredientsCatogorySchema)
