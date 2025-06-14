const Product=require("../models/productmodel");
const Errorhandler = require("../utlis/errorhandler");
const catchAsyncError = require("../middleware/asyncerrorhandler");
const Order=require("../models/orderModel");
const user=require("../models/usersmodel");


//create new order
exports.neworder=catchAsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body;

    const order=await Order.create(
        {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt:Date.now(),
            user:req.user._id
        }
    );
    res.status(200).json({
        success:true,
        message:"order created",
        order
    })
});


//get single order

exports.orderdetails=catchAsyncError(async(req,res,next)=>{
    const order= await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return next(new Errorhandler("order not found of this id",404));
    }
    res.status(200).json({
        success:true,
        order
    })
})

//get my order

exports.getmyorder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findOne({user:req.user.id});
    res.status(200).json({
        success:true,
        order
    })
})


//get all orders  --admin
exports.getallorder=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find({});
  let totalAmount=0;
  orders.forEach((ele)=>{
    totalAmount+=ele.totalPrice;
  })
    res.status(200).json({
        success:true,
        totalAmount,
        message:"all orders",
        orders,
        
    })
})

//update orderstatus --admin

exports.updateorder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(order.status==="delivered"){
        return next(new Errorhandler("you delivered cant change status now",400));
    }
    
    //update product stock
    order.orderItems.forEach(async(order)=>{
        await updatestock(order.product,order.quantity);
    });
    order.orderStatus=req.body.status;
        //update order delivery time
    if(order.status=="delivered"){
        order.deliverdAt=Date.now();
    }
    await order.save({
        validateBeforeSave:false
    })

    res.status(200).json({
        success:true,
        order
    })
})

async function updatestock(id,quantity){
   const product= await Product.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
}

//delete order
exports.deleteorder=catchAsyncError(async(req,res,next)=>{
    const deleteorder=await Order.findById(req.params.id);
    if(!deleteorder){
        return next(new Errorhandler("order is not found of this id"),400);
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message:"order deleted successfuly"
    })
})


