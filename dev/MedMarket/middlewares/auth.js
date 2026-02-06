const { expressjwt } = require("express-jwt");

const requireLogin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});

const isAuth = (req, res, next) => {
    if (req.auth.role === 1) {
        return next();
    }

    const user = req.auth && req.params.id === req.auth._id;

    if (!user) {
        return res.status(403).json({ error: "Access denied" });
    }

    next();
};

const isAdmin = (req, res, next) => {
    if (req.auth.role === 0) {
        return res.status(403).json({ error: "Access denied" });
    }

    next();
};

module.exports = { requireLogin, isAuth, isAdmin };
