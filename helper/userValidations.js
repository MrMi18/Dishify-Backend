import validator from 'validator';

const userValidations = (req)=>{
    const {Name,emailId,phoneNumber,password} = req.body;
            if(!validator.isStrongPassword(password)){
                    throw new Error ("Password must be Strong");
                }
            if(!validator.isEmail(emailId)){
                throw new Error("Invalid Email");
            }
            if(!validator.isMobilePhone(phoneNumber)){
                throw new Error("Invalid Phone Number");
            }
            if(phoneNumber.length!==10){
                throw new Error("Phone Number should be of 10 digits");
            }
            if(Name.length<3 ){
                throw new Error("Name should be of atleast 3 characters");
            }
            if(Name.length>15){
                throw new Error("Name should be of atmost 15 characters");
            }
}
export default userValidations;