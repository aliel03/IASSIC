const mongoose = require("mongoose");

const idValidator = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    next();
};

module.exports = { idValidator };
