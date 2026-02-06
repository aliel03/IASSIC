const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "Shipped", // Shipped, Complete, Cancelled
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
