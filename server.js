import express from "express";
import cors from "cors";
import proxyRouter from "./Routers/proxy.js";
import { connectDb } from "./config/Database.js";
import cookieParser from "cookie-parser";
import authRouter from "./Routers/user.js";
import profileRouter from "./Routers/profile.js";

const app = express();
const PORT = 5000;

app.use(cors( {origin:"https://dishify-by-mrmi.netlify.app/",
    credentials:true,}
)); // Allow all origins
app.use(cookieParser());  // Parses cookies
app.use(express.json());  // Parses JSON bodies.
app.use("/",proxyRouter);
app.use("/",authRouter);
app.use("/", profileRouter);




connectDb()
.then(()=>{
    console.log("Database Connected Succesfully..");
    app.listen(5000,()=>{
        console.log("hey Server is running.....");
    });

})
.catch((err) =>{
    console.log("Database connection not established"+err.message)
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });













// import express from "express";
// import cors from "cors";
// import fetch from "node-fetch";

// const app = express();
// const PORT = 5000;

// app.use(cors()); // Allow all origins


// app.get("/api/restaurants", async (req, res) => {
//     try {
//       console.log("Proxy endpoint hit");
//       const response = await fetch(
//         "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.174214&lng=79.0600207"
//       );
//       console.log("Fetched Swiggy API Response Status:", response.status);
//       const data = await response.json();
//       console.log("Data received from Swiggy API:", data);
//       res.json(data);
//     } catch (error) {
//       console.error("Error fetching data from Swiggy API:", error.message);
//       res.status(500).json({ error: "Error fetching data from Swiggy API" });
//     }
//   });


// // Proxy route for menu
// app.get("/api/menu/:restaurantId", async (req, res) => {
//   const { restaurantId } = req.params;
//   try {
//     const response = await fetch(
//       `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.174214&lng=79.0600207&restaurantId=${restaurantId}`
//     );
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching menu from Swiggy API" });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
