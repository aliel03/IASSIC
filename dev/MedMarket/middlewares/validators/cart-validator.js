const mongoose = require("mongoose");
const Joi = require("../../utils/joi");

const cartSchema = Joi.object({
    user: Joi.required(),
    total: Joi.number().required(),
});

const cartValidator = (req, res, next) => {
    const { user, total } = req.body;

    if (req.auth.role === 0) {
        // Only do this if the user is not an admin
        if (!mongoose.Types.ObjectId.isValid(user) || user !== req.auth._id) {
            return res.status(400).json({ error: "Invalid user id" });
        }
    }

    const { error } = cartSchema.validate({
        user,
        total,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
};

module.exports = { cartValidator };
