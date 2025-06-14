const mongoose=require("mongoose");

const productSchema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please enter title is required"]
    },
    description:{
        type:String,
        required:[true,"enter description this is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required"],
        maxLength:[8,"price cannot exceed 8 digit"],
    },
    ratings:{
        type:Number,
        default:2
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:[{
        categoryname:{
            type:String,
        required:[true,"enter category is required"]
        },
    }],
    stock:{
        type:Number,
        required:[true,"stock is required "],
        maxLength:[5,"cannnot exceed 5 digit"],
        default:1
    },
    numofreview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                requried:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("product",productSchema);