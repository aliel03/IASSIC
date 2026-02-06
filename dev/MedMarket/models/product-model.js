const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            maxlength: 50,
            required: true,
        },
        description: String,
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
