import connectDB from "./config/db.js"; // importing the connectDB function form db 
import app from "./index.js"; // importing the main app file

const PORT = 5454;

// we are listing our app here so we can perform all listing task here
app.listen (PORT, async() => {
    await connectDB();
    console.log("App is running on the port ", PORT);
})

export default app;