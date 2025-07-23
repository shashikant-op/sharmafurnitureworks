const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        maxlength: [8, "Price cannot exceed 8 digits"]
    },
    ratings: {
        type: Number,
        default: 2,
        min: 0,
        max: 5
    },
    images: [
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    specifications: [
        {
            public_id: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    category: {
        type: [String],
        required: [true, "Category is required"],
        enum: {
            values: [
                "bed",
                "boxbed",
                "masterbed",
                "chair",
                "dining chair",
                "table",
                "dining table",
                "sofa",
                "sofa set",
                "dressing table",
                "wardrobe",
                "almirah",
                "center table",
                "side table",
                "bookshelf",
                "TV unit",
                "office table",
                "kids furniture",
                "storage",
                "others"
            ],
            message: "Please select a valid category"
        }
    },
    tags: {
        type: [String],
        default: []
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        maxlength: [5, "Stock cannot exceed 5 digits"],
        default: 1
    },
    numofreview: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);
