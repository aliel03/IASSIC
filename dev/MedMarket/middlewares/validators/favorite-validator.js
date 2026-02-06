const mongoose = require("mongoose");

const favoriteValidator = (req, res, next) => {
    const { user, product } = req.body;

    if (!mongoose.Types.ObjectId.isValid(user) || user !== req.auth._id) {
        return res.status(400).json({ error: "Invalid user id" });
    } else if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ error: "Invalid product id" });
    }

    next();
};

module.exports = { favoriteValidator };
