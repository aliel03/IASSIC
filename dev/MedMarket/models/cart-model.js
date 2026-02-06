const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        total: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
