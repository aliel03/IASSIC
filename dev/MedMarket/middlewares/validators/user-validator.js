const Joi = require("../../utils/joi");

const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required().escapeHTML(),
    lastName: Joi.string().min(3).max(30).required().escapeHTML(),
    email: Joi.string().email().required().escapeHTML(),
    location: {
        address: Joi.string().min(3).required().escapeHTML(),
        city: Joi.required(),
    },
});

function userValidator(req, res, next) {
    const { firstName, lastName, email, location, password } = req.body;

    const { error } = userSchema.validate({
        firstName,
        lastName,
        email,
        location,
    });

    if (error) {
        return res.status(400).json({
            error: error.message,
        });
    }

    if (password && password.length < 8) {
        return res.status(400).json({
            error: "Password must be at least 8 characters long.",
        });
    }

    next();
}

module.exports = { userValidator };
