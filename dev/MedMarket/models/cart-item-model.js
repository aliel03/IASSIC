const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema(
    {
        cart: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
