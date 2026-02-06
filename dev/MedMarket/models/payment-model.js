const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
    {
        cardNumber: {
            type: String,
            required: true,
        },
        cardName: {
            type: String,
            required: true,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        securityCode: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
