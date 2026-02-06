const Joi = require("../../utils/joi");

const citySchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
});

function cityValidator(req, res, next) {
    const { name } = req.body;

    const { error } = citySchema.validate({
        name,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}

module.exports = { cityValidator };
