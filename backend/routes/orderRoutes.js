const express=require("express");
const { isauthenticated, authrole } = require("../middleware/auth");
const { neworder, getallorder, orderdetails ,getmyorder,deleteorder, updateorder} = require("../controllers/ordercontroller");
const router=express.Router();


//user routes
router.route("/order/new").post(isauthenticated,neworder)
router.route("/orders/:id").get(orderdetails);
router.route("/order/my").get(isauthenticated, getmyorder);
//admin route
router.route("/admin/orders").get(isauthenticated,authrole("User"),getallorder);
router.route("/admin/order/:id").put(isauthenticated,authrole("User"),updateorder).delete(isauthenticated,authrole("User"),deleteorder);

module.exports =router;