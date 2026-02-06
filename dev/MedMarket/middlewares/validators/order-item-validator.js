const mongoose = require("mongoose");
const Joi = require("../../utils/joi");

const orderItemSchema = Joi.object({
    order: Joi.required(),
    product: Joi.required(),
    total: Joi.number().required(),
});

const orderItemValidator = (req, res, next) => {
    const { order, product, total } = req.body;

    if (
        !mongoose.Types.ObjectId.isValid(order) ||
        !mongoose.Types.ObjectId.isValid(product)
    ) {
        return res.status(400).json({ error: "Invalid id" });
    }

    const { error } = orderItemSchema.validate({
        order,
        product,
        total,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
};

module.exports = { orderItemValidator };
