const Joi = require("../../utils/joi");

const loginSchema = Joi.object({
    email: Joi.string().email().required().escapeHTML(),
    password: Joi.string().min(8).required().escapeHTML(),
});
function login(req, res, next) {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({
        email,
        password,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}

const registerSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required().escapeHTML(),
    lastName: Joi.string().min(3).max(30).required().escapeHTML(),
    email: Joi.string().email().required().escapeHTML(),
    location: {
        address: Joi.string().min(3).required().escapeHTML(),
        city: Joi.string().required(),
    },
    password: Joi.string().min(8).required().escapeHTML(),
});
function register(req, res, next) {
    const { firstName, lastName, email, location, password } = req.body;

    const { error } = registerSchema.validate({
        firstName,
        lastName,
        email,
        location,
        password,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}

module.exports = { login, register };
