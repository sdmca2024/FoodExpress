import Restaurant from "../models/restaurant.model.js";
import Address from "../models/address.model.js";

export default { 
    async createRestaurant(req, user) {
        try {
            const address = new Address({
                city: req.address.city,
                state: req.address.state,
                country: req.address.country,
                streetAddress: req.address.streetAddress,
                pinCode: req.address.pinCode,
                phoneNumber:req.address.phoneNumber
            })

            // save the address in the database
            const savedAddress = await Address.save();
            const restaurant = new Restaurant({
                address: savedAddress,
                contact: req.contact,
                cuisineType: req.cuisineType,
                description: req.description,
                images: req.images,
                name: req.name,
                open: req.open,
                operningHours: req.operningHours,
                registrationDate: req.registrationDate,
                owner: user
            })

            // save the restaurant in the database
            const savedRestaurant = await restaurant.save();
            return savedRestaurant;

    } catch (error) {
        throw new Error(error.message)
    }
 },

 //find restaurant by ID
 async findRestaurantById(restaurantId) {
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if(!restaurant) throw new Error("Restaurant not found");
        return restaurant;
    }
    catch(error){
        throw new Error(error.message);
    }

},

// find all restaurant 
async findAllRestaurants() {
    try {
        const restaurants = await Restaurant.find();
        return restaurants;

    } catch (error) {
        throw new Error(error.message)
    }
},

// delete restaurant
async deleteRestaurant(restaurantId) {
    try {
        const deleted = await Restaurant.findByIdAndDelete(restaurantId);
        if(!deleted) throw new Error("Restaurant not found");
        return deleted;
    }
    catch(error){
        throw new Error(error.message);
    }
},

// get restaurant by userid
async getRestaurantByUserId(userId) {
    try {
        const restaurant = await Restaurant.findOne({owner: userId})
                                            .populate("address")
                                            .populate("owner");
        if(!restaurant) throw new Error("Restaurant not found");
        return restaurant;
    }
    catch(error){
        throw new Error(error.message);
    }
},

// search restaurant 
async searchRestaurant(keyword) {
    try {
        const restaurant = await restaurant.find({
            $or: [
                {
                    name: {$regex: keyword, $options: "i"},
                    description: {$regex: keyword, $options: "i"},
                    cuisineType: {$regex: keyword, $options: "i"}
                }
            ]
        });
        if(!restaurant) throw new Error("Restaurant not found");
        return restaurant;
    }
    catch(error){
        throw new Error(error.message);
    }
},

// add to favorite functionality
async addToFavorites( restaurantId, user) {
        try {
            const restaurant = await Restaurant.findById(restaurantId);
            //create an object for favorite restaurant 
            const dto = {
                _id : restaurant._id,
                name : restaurant.name,
                description : restaurant.description,
                images : restaurant.images,
               }
            const favorites = user.favorites || []; 
            
            if(!favorites.includes(restaurantId)) { 
                favorites.push(restaurantId);
                user.favorites = favorites;
                user.save();
                return dto;
            }
            else {  
                throw new Error("Already added to favorite");
            }   

        } catch (error) {
            throw new Error(error.message);
        }
    },

    // update the restaurant open status 

    async updateRestaurantStatus(restaurantId) {
        try {
            const restaurant = await Restaurant.findById(restaurantId)
                                                .populate("address")
                                                .populate("owner");
            if(!restaurant) throw new Error("Restaurant not found");
            //update the status of the restaurant
            restaurant.open = !restaurant.open;
            await restaurant.save();
            return restaurant;
        } catch (error) {
            
        }
    }




}