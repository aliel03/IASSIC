const mongoose = require("mongoose");
const Joi = require("../../utils/joi");

const reviewSchema = Joi.object({
    user: Joi.required(),
    product: Joi.required(),
    content: Joi.string().required().escapeHTML(),
});

const reviewValidator = (req, res, next) => {
    const { user, product, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user) || user !== req.auth._id) {
        return res.status(400).json({ error: "Invalid user id" });
    } else if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ error: "Invalid product id" });
    }

    const { error } = reviewSchema.validate({
        user,
        product,
        content,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
};

module.exports = { reviewValidator };
