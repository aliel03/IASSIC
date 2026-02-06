const mongoose = require("mongoose");
const Joi = require("../../utils/joi");

const cartItemSchema = Joi.object({
    cart: Joi.required(),
    product: Joi.required(),
    total: Joi.number().required(),
});

const cartItemValidator = (req, res, next) => {
    const { cart, product, total } = req.body;

    if (
        !mongoose.Types.ObjectId.isValid(cart) ||
        !mongoose.Types.ObjectId.isValid(product)
    ) {
        return res.status(400).json({ error: "Invalid id" });
    }

    const { error } = cartItemSchema.validate({
        cart,
        product,
        total,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
};

module.exports = { cartItemValidator };
