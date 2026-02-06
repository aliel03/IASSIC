const orderModel = require("../models/order-model");

const getOrders = async (req, res) => {
    const orders = await orderModel.find().populate("user");

    if (orders.length === 0) {
        return res.status(404).json({ error: "No orders found" });
    }

    res.status(200).json({ orders });
};

const getOrdersByUserId = async (req, res) => {
    const orders = await orderModel.find({ user: req.auth._id });

    if (orders.length === 0) {
        return res.status(404).json({ error: "No orders found" });
    }

    res.status(200).json({ orders });
};

const getOrderById = async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.findOne({ _id: id });

    if (!order) {
        return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
};

const postOrder = async (req, res) => {
    const { total } = req.body;

    const order = await orderModel.create({
        user: req.auth._id,
        total,
    });

    res.status(201).json({ order });
};

const patchOrder = async (req, res) => {
    const { id } = req.params;
    const { total } = req.body;

    const order = await orderModel.findOneAndUpdate(
        { _id: id },
        {
            user: req.auth._id,
            total,
        },
        { new: true }
    );

    res.status(200).json({ order });
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const order = await orderModel.findOneAndDelete({ _id: id });

    res.status(200).json({ order });
};

module.exports = {
    getOrders,
    getOrdersByUserId,
    getOrderById,
    postOrder,
    patchOrder,
    deleteOrder,
};
