const Joi = require("../../utils/joi");

const categorySchema = Joi.object({
    name: Joi.string().max(30).required().escapeHTML(),
    description: Joi.string().max(30).required().escapeHTML(),
});

function categoryValidator(req, res, next) {
    const { name, description } = req.body;

    const { error } = categorySchema.validate({
        name,
        description,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}

module.exports = { categoryValidator };
