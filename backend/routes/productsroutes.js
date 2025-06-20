const express=require("express");
const { getallproduct ,createnewproduct,updateproduct, deleteproduct, getproductdetails, createreview, getallreview, deletereview} = require("../controllers/productcontrollers");
const router=express.Router();
const {isauthenticated,authrole}=require("../middleware/auth");
const fileupload=require("../middleware/multer");



router.route("/admin/product/new").post(isauthenticated,authrole("admin"),fileupload,createnewproduct);
router.route("/admin/product/:id")
.put(isauthenticated,authrole("User"),updateproduct)
.delete(isauthenticated,authrole("admin"),deleteproduct);
router.route("/productdetails/:id").get(getproductdetails);
router.route("/products").get(getallproduct);
router.route("/review").put(isauthenticated,createreview);

router.route("/reviews").get(getallreview).delete(isauthenticated ,deletereview);

module.exports=router;