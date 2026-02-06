const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const order = req.query.order ? req.query.order : "asc";
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    const users = await userModel
        .find()
        .populate({ path: "location", populate: "city" })
        .sort([[sortBy, order]])
        .limit(limit);

    if (users.length === 0) {
        return res.status(404).json({ error: "No users found" });
    }

    res.status(200).json({ users });
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await userModel
        .findOne({ _id: id })
        .populate({ path: "location", populate: "city" });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
};

const postUser = async (req, res) => {
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

const patchUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, location, password } = req.body;

    const userData = { firstName, lastName, email, location };
    if (password) {
        userData.password = password;
    }

    const updatedUser = await userModel
        .findOneAndUpdate({ _id: id }, userData, {
            new: true,
        })
        .populate({ path: "location", populate: "city" });

    if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
    }

    const token = jwt.sign(
        { _id: updatedUser._id, role: updatedUser.role },
        process.env.JWT_SECRET
    );

    res.cookie("token", token, {
        expire: new Date() + 86400000,
        sameSite: "none",
        httpOnly: "true",
        secure: "true",
    });

    res.status(200).json({
        token,
        user: {
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            location: updatedUser.location,
            role: updatedUser.role,
        },
    });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await userModel.findOneAndDelete({ _id: id });

    res.status(200).json({ user });
};

module.exports = { getUsers, getUserById, postUser, patchUser, deleteUser };
