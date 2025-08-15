const Product=require("../models/productmodel");
const Errorhandler = require("../utlis/errorhandler");
const catchAsyncError = require("../middleware/asyncerrorhandler");
const ApiFeature = require("../utlis/apifeature");



//get all product 
exports.getallproduct=catchAsyncError(
    async(req,res)=>{
        const resultperpage=20;
        const productcount=await Product.countDocuments();
       const apifeature= new ApiFeature(Product.find(),req.query)
       .search()
       .filter().pagination(resultperpage);
        const products=await apifeature.query;
        res.status(200).json({
            message:"all product successfuly",
            products,
            resultperpage,
            productcount,
        })
    
    }
);

//get single product details 
exports.getproductdetails=catchAsyncError(
    async(req,res,next)=>{
        const product=await Product.findById(req.params.id);
        if(!product){
            return next(new Errorhandler("product is not found ",404));
        }
        res.status(200).json({
            sucess:true,
            product
        })
    }
);

//create new product -->admin

exports.createnewproduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  console.log("hiii");
  
    // ✅ Parse category and tags (stringified arrays in FormData)
    const category = JSON.parse(req.body.category || "[]");
    const tags = JSON.parse(req.body.tags || "[]");

  const ProductImg = req.files.productimg.map((img) => ({
    public_id: img.filename,
    url: img.path,
  }));

  const ProductCatalog = req.files.productspecificationimg.map((img) => ({
    public_id: img.filename,
    url: img.path,
  }));

   const productdetail = {
      title: req.body.name,
      description: req.body.description,
      price: req.body.price,
      oldprice: req.body.oldprice,
      user: req.body.user,
      category,
      tags,
      images: ProductImg,
      specifications: ProductCatalog,
    };


 try {
  const product = await Product.create(productdetail);
  console.log(product,"savedproduct");
  res.status(200).json({ message: "success", product });
} catch (error) {
  console.error(" Mongoose error:", error);
  res.status(500).json({ message: error.message });
}
  
});


//update products-->admin
exports.updateproduct=catchAsyncError(
    async(req,res,next)=>{
        console.log(req.params.id);
            const product =await Product.findById(req.params.id);
            if(!product){
                return next(new Errorhandler("product is not found ",404));
            }
           const updatedproduct= await Product.findByIdAndUpdate(req.params.id,req.body,{
                    new:true,
                    runValidator:true,
                    useFindAndModify:false
                });
           res.status(200).json({
            sucess:true,
            updatedproduct
           })}
);

//delete product -->admin

exports.deleteproduct=catchAsyncError(
    async(req,res,next)=>{
        const deletedproduct=await Product.findById(req.params.id);
        if(!deletedproduct){
            return next(new Errorhandler("product is not found ",404));
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            sucess:true,
            message:"deleted sucessfuly"
        })
    }
)

//review product

exports.createreview=catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product=await Product.findById(productId);

    const isreviewed=product.reviews.find((ele)=>
        ele.user.toString()===req.user._id.toString());
    if(isreviewed){
            product.reviews.forEach((ele)=>{
                if(ele.user.toString()===req.user._id.toString())
                    (ele.rating=rating),
                    (ele.comment=comment)
            })
    }else{
        product.reviews.push(review);
        product.numofreview=product.reviews.length;
    }
    let avg=0;
    const sumofreview=product.reviews.forEach((ele)=>{
          avg+=ele.rating;
    }
    );
    product.ratings=avg/product.numofreview;
    const saving=await product.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        message:"review created",
        product
    })
})

//getall review

exports.getallreview=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);
    
    if(!product){
        return new Errorhandler("product not found",500);
    }
    const allreview=product.reviews;
    console.log(allreview);
    res.status(200).json({
        success:true,
        allreview
    })
})
//delete review

exports.deletereview=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);
    
    if(!product){
        return new Errorhandler("product not found",500);
    }
   
   const reviews=product.reviews.filter(
    (ele)=>{
        const isuser=(ele._id.toString()!==req.query.reviewId.toString())||(ele.user.toString()!==req.user.id.toString());
        return isuser;
    }
   )
   const numofreview=reviews.length;
   let avg=0;
   product.reviews.forEach((ele)=>{
         avg+=ele.rating;
   }
   );
   const ratings=avg/reviews.length;
   const updatedproduct=await Product.findByIdAndUpdate(req.query.productId,
   { reviews,
    ratings,
    numofreview},
    {
        new:true,
        runValidator:true,
        useFindAndModify:false
    }
   );
    res.status(200).json({
        success:true,
        updatedproduct,
        reviews
    })

})

