import mongoose from "mongoose";
import validator from "validator";

// const { default: mongoose } = require("mongoose");
// const { default: isEmail } = require("validator/lib/isEmail");

const dishifyUserSchema = new mongoose.Schema({
    Name:{
        
        type:String,
        required: true,
        minLength:3,
        maxLength:10,
    },
    phoneNumber:{
        
        type:Number,
        required: true,
        minLength:10,
        maxLength:10,
    },
    
    gender:{
        type:String,
        default:"Not Specified",
        validate(value){
            if(!["male","female","Not Specified"].includes(value)){
                throw new Error ("gender should be only male or female");
            }
        },
         
    } ,

    
    emailId:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Please enter valid mail id");
            }
        }

    },
    password:{
        type:String,
        required:true,
        minLength:5,
       
        validate(value){
            if(value.includes(" ")){
                throw new Error("Spaces are not allowed in password,");
            }
           
            
        },
        
           
        // validate: {
        //     validator: function (value) {
        //         return !value.includes(" "); // Returns `true` if valid
        //     },
        //     message: "Spaces are not allowed in the password",
        // },
        
    },
   
},
{
    timestamps:true,
})



export default mongoose.model("dishifyUser",dishifyUserSchema);