const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
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

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
