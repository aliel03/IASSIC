const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).populate({ path: "location", populate: "city" });

    if (!user) {
        return res.status(400).json({ error: "No user found with this email" });
    }

    if (!user.authenticate(password)) {
        return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, {
        expire: new Date() + 86400000,
        sameSite: "none",
        httpOnly: "true",
        secure: "true",
    });

    const { _id, firstName, lastName, location, role } = user;
    res.status(200).json({
        token,
        user: { _id, firstName, lastName, email, location, role },
    });
};

const register = async (req, res) => {
    const { firstName, lastName, email, location, password } = req.body;

    const user = await userModel.create({
        firstName,
        lastName,
        email,
        location,
        password,
    });

    res.status(201).json({ user });
};

const logout = async (req, res) => {
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out" });
};

module.exports = { login, register, logout };
