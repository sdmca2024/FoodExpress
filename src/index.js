// importing require modules for set up server

import express from "express/index.js";
import cors from "cors/lib/index.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";


// decalare app for the express 
const app = express();

// after connecting db creating home Routers for all routes of the app
import homeRouter from "./routes/homeRoutes.js";
app.use("/", homeRouter)

// cors for cross origin resourse sharing issue
app.use(cors())
// bodyparse is responsible for parsing the incoming request bodies in a middleware before you handle it.
app.use(bodyParser.json());

// register the routes with app
app.use("/auth", authRoutes)

// exporting the app 
export default app;