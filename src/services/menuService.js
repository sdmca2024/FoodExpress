import Menu from "../models/menu.model.js";

export default {
    
    // creating menu 
    async createMenu(req, restaurant) {
        try {

            const menu = new Menu({    
                name: req.name,
                description: req.description,
                images: req.images,
                price: req.price,
                category: req.category,
                available: req.available,
                rating: req.rating,
                restraunt: restaurant._id,
                isVeg : req.isVeg,
                isSeasonal : req.isSeasonal,
                ingradients : req.ingradients
            });
            await menu.save();
            restaurant.menu.push(menu);
            await restaurant.save();
            return menu;
        } catch (error) {
            throw new Error(`Failed to create Menu item: ${error.message}`);
        }
    },

    // delete the menu item
    async deleteMenu(menuId) {
        try {
            const menu = await Menu.findById(menuId);
            if (!menu) {
                throw new Error("Menu item not found");
            }  
            await Menu.findByIdAndDelete(menuId);
            return menu;
        } catch (error) {[

        ]
            throw new Error(`Failed to delete Menu item: ${error.message}`);
        }
    }, 

    // get menu from a restaurant

    async getRestaurantMenu(restaurantId, isVeg, isSeasonal, category) {
        try {
            let query = {restraunt: restaurantId};
            if(isVeg) query.isVeg = isVeg;
            if(isSeasonal) query.isSeasonal = isSeasonal;
            if(category) query.category = category;
            const menu = await Menu.find(query).populate([
                {path: "ingredients", populate: {
                    path: "category", select: "name"}},
                    {path:"restaurant", select: "name _id"}
            ]);
            return menu;
        } catch (error) {
                throw new Error(`Failed to get Menu item: ${error.message}`);            
        }
    }, 

    // search menu 

    async searchMenu(keyword) {
        try {
            let query = {};
            if (keyword) {
                query.$or = [
                    {name : {$regex: keyword, $options: "i"}},
                    {description : {$regex: keyword, $options: "i"}},
                    {"category.name": {$regex: keyword, $options: "i"}}
                ]
            }
            const menu = await Menu.find(query);
            return menu;
        } catch (error) {
            throw new Error(`Failed to search Menu item: ${error.message}`);
        }
    },

    // update availability status
    async updateAvailablityStatus (menuId) {
        try {
            const menu = await Menu.findById(menuId).populate([
                {path: "ingredients", populate: {
                    path: "category", select: "name"}},
                {path:"restaurant", select: "name _id"}
            ]);
        if(!menu) throw new Error("Menu item not found");       

        menu.available = !menu.available;
        await menu.save();
        return menu;
            
        } catch (error) {
            throw new Error(`Failed to update Menu item: ${error.message}`);
        }
    }, 

    //find menu by id

    async findMenuById(menuId) {
        try {
            const menu = await Menu.findById(menuId);
            if(!menu) throw new Error("Menu item not found");
            return menu;
        } catch (error) {
            throw new Error(`Failed to get Menu item: ${error.message}`);
        }
    },

}