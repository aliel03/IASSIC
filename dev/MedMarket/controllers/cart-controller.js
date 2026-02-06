const cartModel = require("../models/cart-model");

const getCarts = async (req, res) => {
    const carts = await cartModel.find().populate("user");

    if (carts.length === 0) {
        return res.status(404).json({ error: "No carts found" });
    }

    res.status(200).json({ carts });
};

const getCartsByUserId = async (req, res) => {
    const carts = await cartModel.find({ user: req.auth._id });

    if (carts.length === 0) {
        return res.status(404).json({ error: "No carts found" });
    }

    res.status(200).json({ carts });
};

const getCartById = async (req, res) => {
    const { id } = req.params;

    const cart = await cartModel.findOne({ _id: id });

    if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({ cart });
};

const postCart = async (req, res) => {
    const { total } = req.body;

    const cart = await cartModel.create({
        user: req.auth._id,
        total,
    });

    res.status(201).json({ cart });
};

const patchCart = async (req, res) => {
    const { id } = req.params;
    const { total } = req.body;

    const cart = await cartModel.findOneAndUpdate(
        { _id: id },
        {
            user: req.auth._id,
            total,
        },
        { new: true }
    );

    res.status(200).json({ cart });
};

const deleteCart = async (req, res) => {
    const { id } = req.params;

    const cart = await cartModel.findOneAndDelete({ _id: id });

    res.status(200).json({ cart });
};

module.exports = {
    getCarts,
    getCartsByUserId,
    getCartById,
    postCart,
    patchCart,
    deleteCart,
};
