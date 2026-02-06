const orderItemModel = require("../models/order-item-model");

const getOrderItems = async (req, res) => {
    const orderItems = await orderItemModel
        .find()
        .populate("order")
        .populate("product");

    if (orderItems.length === 0) {
        return res.status(404).json({ error: "No order items found" });
    }

    res.status(200).json({ orderItems });
};

const getOrderItemsByOrderId = async (req, res) => {
    const { orderId } = req.query;

    const orderItems = await orderItemModel
        .find({ order: orderId })
        .populate("order")
        .populate("product");

    if (orderItems.length === 0) {
        return res.status(404).json({ error: "No order items found" });
    }

    res.status(200).json({ orderItems });
};

const getOrderItemsByProductId = async (req, res) => {
    const { productId } = req.query;

    const orderItems = await orderItemModel
        .find({ product: productId })
        .populate("order")
        .populate("product");

    if (orderItems.length === 0) {
        return res.status(404).json({ error: "No order items found" });
    }

    res.status(200).json({ orderItems });
};

const getOrderItemById = async (req, res) => {
    const { id } = req.params;

    const orderItem = await orderItemModel
        .findOne({ _id: id })
        .populate("order")
        .populate("product");

    if (!orderItem) {
        return res.status(404).json({ error: "Order item not found" });
    }

    res.status(200).json({ orderItem });
};

const postOrderItem = async (req, res) => {
    const { order, product, quantity } = req.body;

    const orderItem = await orderItemModel.create({
        order,
        product,
        quantity,
    });

    res.status(201).json({ orderItem });
};

const patchOrderItem = async (req, res) => {
    const { id } = req.params;
    const { order, product, quantity } = req.body;

    const orderItem = await orderItemModel.findOneAndUpdate(
        { _id: id },
        {
            order,
            product,
            quantity,
        },
        { new: true }
    );

    res.status(200).json({ orderItem });
};

const deleteOrderItem = async (req, res) => {
    const { id } = req.params;

    const orderItem = await orderItemModel.findOneAndDelete({ _id: id });

    res.status(200).json({ orderItem });
};

module.exports = {
    getOrderItems,
    getOrderItemsByOrderId,
    getOrderItemsByProductId,
    getOrderItemById,
    postOrderItem,
    patchOrderItem,
    deleteOrderItem,
};
