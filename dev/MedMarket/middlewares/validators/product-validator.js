const Joi = require("../../utils/joi");

const productSchema = Joi.object({
    name: Joi.string().max(30).required().escapeHTML(),
    description: Joi.string().max(30).required().escapeHTML(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    category: Joi.required(),
});

function productValidator(req, res, next) {
    const { name, description, price, quantity, category } = req.body;

    const { error } = productSchema.validate({
        name,
        description,
        price,
        quantity,
        category,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}

module.exports = { productValidator };
