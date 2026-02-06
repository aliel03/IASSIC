const cartItemModel = require("../models/cart-item-model");

const getCartItems = async (req, res) => {
    const cartItems = await cartItemModel
        .find()
        .populate("cart")
        .populate("product");

    if (cartItems.length === 0) {
        return res.status(404).json({ error: "No cart items found" });
    }

    res.status(200).json({ cartItems });
};

const getCartItemsByCartId = async (req, res) => {
    const { cartId } = req.query;

    const cartItems = await cartItemModel
        .find({ cart: cartId })
        .populate("cart")
        .populate("product");

    if (cartItems.length === 0) {
        return res.status(404).json({ error: "No cart items found" });
    }

    res.status(200).json({ cartItems });
};

const getCartItemsByProductId = async (req, res) => {
    const { productId } = req.query;

    const cartItems = await cartItemModel
        .find({ product: productId })
        .populate("cart")
        .populate("product");

    if (cartItems.length === 0) {
        return res.status(404).json({ error: "No cart items found" });
    }

    res.status(200).json({ cartItems });
};

const getCartItemById = async (req, res) => {
    const { id } = req.params;

    const cartItem = await cartItemModel
        .findOne({ _id: id })
        .populate("cart")
        .populate("product");

    if (!cartItem) {
        return res.status(404).json({ error: "Cart item not found" });
    }

    res.status(200).json({ cartItem });
};

const postCartItem = async (req, res) => {
    const { cart, product, quantity } = req.body;

    const cartItem = await cartItemModel.create({
        cart,
        product,
        quantity,
    });

    res.status(201).json({ cartItem });
};

const patchCartItem = async (req, res) => {
    const { id } = req.params;
    const { cart, product, quantity } = req.body;

    const cartItem = await cartItemModel.findOneAndUpdate(
        { _id: id },
        {
            cart,
            product,
            quantity,
        },
        { new: true }
    );

    res.status(200).json({ cartItem });
};

const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    const cartItem = await cartItemModel.findOneAndDelete({ _id: id });

    res.status(200).json({ cartItem });
};

module.exports = {
    getCartItems,
    getCartItemsByCartId,
    getCartItemsByProductId,
    getCartItemById,
    postCartItem,
    patchCartItem,
    deleteCartItem,
};
