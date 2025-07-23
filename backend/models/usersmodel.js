const validator =require("validator");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto =require("crypto");

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minlength:[5,"name should be above 5 char"],
        maxlength:[20,"name length exeed max length should be 20 char"],

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique: true,
        validate:[validator.isEmail,"please Enter a valid Email"],
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[8,"password length should be more than 8 char"],
        maxlength:[100,"password length should not be more than 50 char"],
        select:false
    },
    avatar:{
        public_id:{
            type:String, 
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"User"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

//saving hash password

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
//get jwttoken for signin
UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compare password

UserSchema.methods.comapringpass=async function (entered_password){
return  await bcrypt.compare(entered_password,this.password);
}

//resetpassword

UserSchema.methods.getresetPasswordToken= async function(){
    const resettoken=crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken=crypto.createHash("sha256").update(resettoken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;

    return resettoken;
}



module.exports =mongoose.model("user",UserSchema);

