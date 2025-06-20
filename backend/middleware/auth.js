const Errorhandler = require("../utlis/errorhandler");
const asyncerrorhandler = require("./asyncerrorhandler");
const jwt=require("jsonwebtoken");
const User=require("../models/usersmodel");

exports.isauthenticated = asyncerrorhandler(async (req, res, next) => {
  let Token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Split on space and get token
    Token = req.headers.authorization.split(" ")[1];
  }

  if (!Token) {
    console.log("no token");
    return next(new Errorhandler("Login first to get this data", 401));
  }
  const decodedData = jwt.verify(Token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});



exports.authrole=(...role)=>{
  return (req,res,next)=>{
    if(!role.includes(req.user.role)){
      return next(
        new Errorhandler(`Role: ${req.user.role} are not allow to this request:`,403)
      );
     
    }
    next();
  };
  
};