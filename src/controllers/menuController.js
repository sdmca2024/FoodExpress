import MenuServices from "../services/menuService.js";
import RestaurantServices from "../services/restaurantService.js";

export default {

    // customer 
    searchMenu : async (req, res) => {
        try {
            const {name} = req.query;
            const menuItem = await MenuServices.searchMenu(name);
            res.status(200).json(menuItem);
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});
        }
    },

    // get menu by restaurant
    getMenuByRestaurantId : async (req, res) => {
        try {
            const {id} = req.params;
            const { isVeg, isSeasonal, category } = req.query;
            const menuItem = await MenuServices.getRestaurantMenu(id, isVeg, isSeasonal, category);
            res.status(200).json(menuItem);  
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});
        }
    },

    // admin controller 
    // creating menu item 
    async createMenuItem(req, res) {
        try {
                const item = req.body;
               // const user = req.user;
                const restaurant = await RestaurantServices.findRestaurantById(item.restrauntId);
                const menuItem = await MenuServices.createMenu(item, restaurant);
                res.status(200).json(menuItem);
        } catch (error) {
            throw new Error(`Failed to create Menu item: ${error.message}`);
        }
    },

    // delete menu item 
    async deleteMenuItem(req, res) {
        try {
            const { id } = req.params;
            await MenuServices.deleteMenu(id);
            res.status(200).json({ message: "Menu item deleted successfully" });
        } catch (error) {
            throw new Error(`Failed to delete Menu item: ${error.message}`);
        }
    }, 

    // update availability status
    async updateAvailablityStatus(req, res) {
        try {
            const { id } = req.params;
            const menuItem = await MenuServices.updateAvailablityStatus(id);
            res.status(200).json(menuItem);
        } catch (error) {
            throw new Error(`Failed to update Menu item: ${error.message}`);
        }
    }
}