import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import DishifyUser from '../models/dishifyUser.js';
// import userAuth from '../middleware/userAuth.js';
import validator from 'validator';
import userValidations from '../helper/userValidations.js';


const authRouter = express.Router();
authRouter.post('/signup', async (req,res)=>{

    const{Name,password,emailId,phoneNumber} = req.body;
    
    try{
       
        const alreadyExist = await DishifyUser.findOne({emailId:emailId});
        if(alreadyExist){
            return res.status(409).send("User already exist with this email");
        }
        userValidations(req);
    

    const passwordHash = await bcrypt.hash(password,10);
  
    
        
    const user = new DishifyUser({
        Name,emailId,phoneNumber,password:passwordHash
    });
    
        await user.save();
        const token = await jwt.sign({_id:user._id},"Shane@123#",{expiresIn:'7d'});

            res.cookie("token",token)

            res.json({data:user});
            
    }
    catch(err){
        
        res.status(400).json({data:err.message});

    }

});

authRouter.post('/login', async (req,res) =>{
    
    const {emailId,password} = req.body;

    try{
        const user =  await DishifyUser.findOne({emailId:emailId});
        
        if(!user){
            return res.status(400).send("Wrong email or password  ");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){

            const token = await jwt.sign({_id:user._id},"Shane@123#",{expiresIn:'7d'});


            res.cookie("token",token)

            res.json({data:user});
        }else{
            return res.status(401).send("Wrong email or password !");
           
        }
        
    }catch(err){
        res.status(400).send("Error: "+ err.message);
    }
    
});

authRouter.post('/logout',(req,res)=>{
    // const {token} = req.cookies;
    res.clearCookie('token');
    res.send("Logout Sucessfull");

})

// authRouter.patch('/user/edit/password/:userId', userAuth, async(req,res) =>{
//     try{
//     const user = req.user;
//     const{ oldPassword ,newPassword} = req.body;
    
    
//     const isPasswordValid = await bcrypt.compare(oldPassword,user.password);
//     if(!isPasswordValid){
//         throw new Error("Invalid Password Old Password");
//     }
    
//     // signupValidation(newPassword);
//     if(!validator.isStrongPassword(newPassword)){
//             throw new Error ("Password must be Strong");
//         }
    
//     const newPasswordHash = await bcrypt.hash(newPassword,10);
    
//     await DishifyUser.findByIdAndUpdate(user._id,{password:newPasswordHash});
//     res.send("Password Change sucessfully");
//     }catch(err){
//         res.status(400).send("Error: "+ err.message);
//     }

// })

    
export default authRouter;


