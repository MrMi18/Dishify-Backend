import mongoose from "mongoose";

export const connectDb = async () =>{
    // try{
        await mongoose.connect("mongodb+srv://mrmi18:KaxZQqaqwLTNjpE7@mrmi.yq3pm.mongodb.net/DevTinder?retryWrites=true&w=majority");
        console.log("connection DOne")
    // }
    // catch(err) {
    //     console.error("Database connection failed:", err.message);
    // }
    
};

