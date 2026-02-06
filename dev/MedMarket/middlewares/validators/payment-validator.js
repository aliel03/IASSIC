const Joi = require("../../utils/joi");

const paymentSchema = Joi.object({
    cardNumber: Joi.string().creditCard().required().escapeHTML(),
    cardName: Joi.string().required().escapeHTML(),
    expirationDate: Joi.date().required(),
    securityCode: Joi.string().length(3).required().escapeHTML(),
});

function paymentValidator(req, res, next) {
    const { cardNumber, cardName, expirationDate, securityCode } = req.body;

    const { error } = paymentSchema.validate({
        cardNumber,
        cardName,
        expirationDate,
        securityCode,
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}

module.exports = { paymentValidator };
