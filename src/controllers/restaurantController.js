import RestaurantServices from "../services/restaurantServices.js"

export default {

    // creating a new restaurant
    createRestaurant : async (req, res) => {
        try {
            const user = req.user;
            const restaurant = await RestaurantServices.createRestaurant(req.body, user);

        } catch (error) {
           res.status(400).send({error: error.message});
        }
    },

    // delete restaurant
    deleteRestaurant : async (req,res) => {
        try {
            const user = req.user;
            const {id} = req.params;
            await RestaurantServices.deleteRestaurant(id);
            res.status(200).json({
                message: "Restaurant deleted successfully",
                sucess: true,
            })

        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },

    // update the restaurant status
    updateRestaurantStatus : async (req,res) => {
        try {
            const {id } = req.params;
            console.log("restaurant id", id);

            const restaurant = await RestaurantServices.updateRestaurantStatus(id.toString());
            res.status(200).json(restaurant);
           

        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },

    // find restaurant by user ID
     findRestaurantByUserId : async (req, res) =>{
        try {
            const user = req.user;
            const restaurant = await RestaurantServices.getRestaurantByUserId(user._id);
            res.status(200).json(restaurant);
            
        } catch (error) {
            res.status(400).send({error: error.message})
        }
     },

     //find restaurant by name 
     findRestaurantByName : async (req, res) =>{
        try {
                const {keyword} = req.query;
            const restaurant = await RestaurantServices.searchRestaurant(keyword);
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    }, 

    //get all restaurants 
    getAllRestaurants : async(req,res) => {
        try {
            const restaurants = await RestaurantServices.findAllRestaurants();
            res.status(200).json(restaurants);

        } catch (error) {
            res.status(400).send({error: error.message});
        }
    },

    // add to favorite restaurant
    addToFavorite : async (req, res) => {
        try {
            const {id} = req.params;
            const user = req.user;
            const restaurant = await RestaurantServices.addToFavorites(id, user);
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(400).send({errror: error.message})
        }
    }


}