const express=require("express");
const { register, getalluser, loginuser, deletealluser, logout, forgotpassword, resetpassword, userdetails, changepassword, deleteuser, updateuser } = require("../controllers/usercontroller");
const { isauthenticated } = require("../middleware/auth");
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(loginuser);
router.route("/password/forgot").post(forgotpassword);
router.route("/reset/password/:token").put(resetpassword);
router.route("/logout").get(logout);
router.route("/me").get(isauthenticated ,userdetails);
router.route("/password/update").put(isauthenticated,changepassword);
router.route("/delete/:id").delete(isauthenticated,deleteuser);
router.route("/update/me").put(isauthenticated,updateuser);
module.exports=router;
