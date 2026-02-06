const paymentModel = require("../models/payment-model");

const getPaymentById = async (req, res) => {
    const { id } = req.params;

    const payment = await paymentModel.findOne({ _id: id });

    if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ payment });
};

const postPayment = async (req, res) => {
    const { cardNumber, cardName, expirationDate, securityCode } = req.body;

    const payment = await paymentModel.create({
        user: req.auth._id,
        cardNumber,
        cardName,
        expirationDate,
        securityCode,
    });

    res.status(201).json({ payment });
};

const patchPayment = async (req, res) => {
    const { id } = req.params;
    const { cardNumber, cardName, expirationDate, securityCode } = req.body;

    const payment = await paymentModel.findOneAndUpdate(
        { _id: id },
        {
            user: req.auth._id,
            cardNumber,
            cardName,
            expirationDate,
            securityCode,
        },
        { new: true }
    );

    res.status(200).json({ payment });
};

const deletePayment = async (req, res) => {
    const { id } = req.params;

    const payment = await paymentModel.findOneAndDelete({ _id: id });

    res.status(200).json({ payment });
};

module.exports = {
    getPaymentById,
    postPayment,
    patchPayment,
    deletePayment,
};
