    const express=require("express");
    const User=require("../models/usersmodel");
    const catchAsyncError = require("../middleware/asyncerrorhandler");
    const Errorhandler = require("../utlis/errorhandler");
    const GetToken=require("../utlis/gettoken");
    const messagetemplate=require("../utlis/messagetemp.js");
    const { options } = require("../routes/productsroutes");
    const { resolveHostname } = require("nodemailer/lib/shared");
    const sendEmail =require("../utlis/sendemail.js");
    const crypto=require("crypto");

    exports.register=catchAsyncError(async(req,res,next)=>{
        const {name,email,password}=req.body;
        const existingemail=await User.findOne({email});
        if(existingemail){
            return res.status(500).json({message:"email is already exsited "});
        }
        const user= await User.create(
            {name,
            email,
            password,
            avatar:{
                public_id:"samleid",
                url:"sampleurl"
            }
        })
      
       GetToken(user,201,res);
       const message=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Platform</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8f8f8;
      font-family: Arial, sans-serif;
    }
    .wrapper {
      width: 100%;
      background: url('https://images6.alphacoders.com/102/1020690.jpg') no-repeat center center;
      background-size: cover;
      padding: 20px 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    }
    .header {
      background: #4CAF50;
      color: #fff;
      text-align: center;
      padding: 20px;
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      padding: 25px;
      text-align: center;
      color: #333;
      font-size: 16px;
      line-height: 1.6;
    }
    .content ul {
      text-align: left;
      padding-left: 25px;
    }
    .button {
      display: inline-block;
      background: #4CAF50;
      color: #fff;
      text-decoration: none;
      padding: 12px 25px;
      font-size: 16px;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 15px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #666;
    }
    .footer a {
      color: #4CAF50;
      text-decoration: none;
      font-weight: bold;
    }
    @media (max-width: 600px) {
      .container {
        width: 90%;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        🎉 Welcome, ${user.name}!
      </div>
      <div class="content">
        <p>Dear <strong>${user.name}</strong>,</p>
        <p>We’re excited to have you on board! Your login was successful, and we can’t wait for you to explore what we offer.</p>
        <p>Here’s how to get started:</p>
        <ul>
          <li>Explore features tailored for you.</li>
          <li>Customize your profile to enhance your experience.</li>
          <li>Need help? Our support team is here for you.</li>
        </ul>
        <a href="https://www.yourbrand.com/dashboard" class="button">Go to Dashboard</a>
        <p>If you didn’t log in, please reset your password immediately.</p>
      </div>
      <div class="footer">
        <p>Best regards,<br><strong>Your Brand Team</strong></p>
        <p><a href="https://www.yourbrand.com">Visit Our Website</a> | 
        <a href="mailto:support@yourbrand.com">Contact Support</a></p>
      </div>
    </div>
  </div>
</body>
</html>`
;
       await sendEmail({
        email:user.email,
        subject: `Welcome ${user.name} To Opandoor`,
        message
    })
        
    
    })


    //get all user

    exports.getalluser=catchAsyncError(async(req,res,next)=>{
        const alluser=await User.find({});
        const usercount=await User.countDocuments();
        res.status(200).json({
            sucess:true,
            message:"all user getting",
            alluser,
            usercount
        })
    })


    //login user
    exports.loginuser=catchAsyncError(async(req,res,next)=>{
        const {email,password}=req.body;
        if(!email || !password){
            return next(new Errorhandler("Enter Email and Password ",400));
        }
       
        const user=await User.findOne({email:email}).select(" +password");
        if(!user){
            return next(new Errorhandler("Email or password is wrong check agian!",401));
        }
        //comapring password
        const ispasswordmatched= await user.comapringpass(password);
        if(!ispasswordmatched){
            return next(new Errorhandler("Email or password worng try agian!",401));
            
        }
       GetToken(user,200,res);
    })


    //Logout

    exports.logout=catchAsyncError(async(req,res,next)=>{
        res.cookie("Token","",{
            expires:new Date(Date.now()),
            httpOnly:true
        });
        res.status(200).json({
            success:true,
            message:"Logged out "
        })
    })


    //forgot password

    exports.forgotpassword=catchAsyncError(async(req,res,next)=>{
        const user=await User.findOne({email:req.body.email});

        if(!user){
            return next(new Errorhandler("user not found !",404));
        }
        const resettoken= await user.getresetPasswordToken();
        await user.save({validateBeforeSave:false});
        const frontedurl=process.env.FRONTEND_URL;
        const resetpasswordurl=`${frontedurl}/reset/password/${resettoken}`;
          console.log(resetpasswordurl)
  const message = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f8f8;">

  <!-- Wrapper Table -->
  <table role="presentation" width="100%" bgcolor="#f8f8f8" style="background-image: url('https://images6.alphacoders.com/102/1020690.jpg'); background-size: cover; background-position: center;">
    <tr>
      <td align="center">
        <!-- Email Container -->
        <table role="presentation" width="600" style="background: rgba(255, 255, 255, 0.32); border-radius: 10px; padding: 20px; text-align: center; font-family: Arial, sans-serif; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #FF9800; color: #fff; padding: 15px; font-size: 22px; font-weight: bold; border-radius: 10px 10px 0 0;">
              🍽️ Password Reset Request
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px; color: #333; font-size: 16px; line-height: 1.8;">
              <p>Dear <strong>${user.name}</strong>,</p>
              <p>We received a request to reset your password.</p>
              <p>If you made this request, click the button below:</p>
              <a href="${resetpasswordurl}" style="display: inline-block; background: #FF9800; color: #fff; text-decoration: none; padding: 12px 25px; font-size: 16px; border-radius: 5px; font-weight: bold;">
                Reset Password 
              </a>
              <p style="margin-top: 20px;">This link will expire in <strong>30 minutes</strong>. If you did not request this reset, please ignore this email.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 15px; font-size: 14px; color: #666;">
              <p>Best regards,<br><strong>Your Brand Team</strong></p>
              <p><a href="https://www.yourbrand.com" style="color: #FF9800; text-decoration: none; font-weight: bold;">Visit Our Website</a> | 
              <a href="mailto:support@yourbrand.com" style="color: #FF9800; text-decoration: none; font-weight: bold;">Contact Support</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>

`;

        
        
        try{
            await sendEmail({
                email:user.email,
                subject:"Opendoor password Recovery !",
                message
            })
            res.status(200).json({
                success:true,
                message:`Password reset url sended to ${user.email} sucessfuly`
            })
        }catch(error){
            user.resetPasswordToken=undefined;
            user.resetPasswordExpire=undefined;
            await user.save({validateBeforeSave:false});
            return next(new Errorhandler(error.message,404));
        }
    })



    //reset pasword 
    exports.resetpassword=catchAsyncError(async(req,res,next)=>{
      const resetpasswordtoken=crypto.createHash("sha256").update(req.params.token).digest("hex");
      console.log(resetpasswordtoken);
      const user=await User.findOne({
        resetPasswordToken:resetpasswordtoken,
        resetPasswordExpire:{$gt:Date.now()}
      });
      console.log(user);
      if(!user){
        return next(new Errorhandler("resettoken is incorrect or resertToken expired"),400);
      }
      if(req.body.password!==req.body.confirmpassword){
        return next(new Errorhandler("password is not matched !"),400);
      }

      user.password=req.body.password;
      user.resetPasswordToken=undefined;
      user.resetPasswordExpire=undefined;
      await user.save()
      GetToken(user,200,res);
      
      });

     

      //change password

      exports.changepassword=catchAsyncError(async(req,res,next)=>{
        const user=await User.findById(req.user.id).select("+password");

        const ispasswordmatched=await user.comapringpass(req.body.oldpassword);

        if(!ispasswordmatched){
          return next(new Errorhandler("old passwrod is not correct",401));
        }
        const newpassword=req.body.newpassword;
        const newcondfirmpassword=req.body.newcondfirmpassword;
        if(newpassword!==newcondfirmpassword){
          return next(new Errorhandler("Password does not matched",401));
        }
        user.password=req.body.newpassword;
        await user.save();
       GetToken(user,200,res);
      })

      //delete user

      exports.deleteuser=catchAsyncError(async(req,res,next)=>{
        await User.findByIdAndDelete(req.params.id);
        console.log(req.params.id);
        res.status(200).json({
          success:true,
          message:"user deleted successfuly"
        })
      })
       //get user details

       exports.userdetails=catchAsyncError(async(req,res,next)=>{
        const user= await User.findById(req.user.id);
        res.status(200).json({
          success:true,
          user
        })
      })

      //update user details

      exports.updateuser=catchAsyncError(async(req,res,next)=>{
       const newuserdata={
        name:req.body.name,
        email:req.body.email
       }
        const user=await User.findByIdAndUpdate(req.user.id,newuserdata,{
          new:true,
          runValidators:true,
          userFindAndModify:false
        });
        res.status(200).json({
          success:true,
          message:"user updated",
          user
        }) 
        
      })



     