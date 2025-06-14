const nodemailer =require("nodemailer");
const dotenv=require("dotenv");
dotenv.config(); 
const sendEmail=async(options,user)=>{
    const transporter=nodemailer.createTransport({
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });
    const mailoptions={
        from: process.env.SMTP_EMAIL,  // Corrected 'SMPT' to 'SMTP'
        to: options.email,
        subject: options.subject ,
        html: options.message, 
     };
    await transporter.sendMail(mailoptions);
}

module.exports=sendEmail;