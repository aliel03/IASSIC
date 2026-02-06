const favoriteModel = require("../models/favorite-model");

const getFavoritesByUserId = async (req, res) => {
    const favorites = await favoriteModel
        .find({ user: req.auth._id })
        .populate("product");

    if (favorites.length === 0) {
        return res.status(404).json({ error: "No favorites found" });
    }

    res.status(200).json({ favorites });
};

const getFavoriteById = async (req, res) => {
    const { id } = req.params;

    const favorite = await favoriteModel
        .findOne({
            _id: id,
            user: req.auth._id,
        })
        .populate("product");

    if (!favorite) {
        return res.status(404).json({ error: "Favorite not found" });
    }

    res.status(200).json({ favorite });
};

const postFavorite = async (req, res) => {
    const { product } = req.body;

    const favorite = await favoriteModel.create({
        user: req.auth._id,
        product,
    });

    res.status(201).json({ favorite });
};

const patchFavorite = async (req, res) => {
    const { id } = req.params;
    const { product } = req.body;

    const favorite = await favoriteModel.findOneAndUpdate(
        { _id: id },
        {
            user: req.auth._id,
            product,
        },
        { new: true }
    );

    res.status(200).json({ favorite });
};

const deleteFavorite = async (req, res) => {
    const { id } = req.params;

    const favorite = await favoriteModel.findOneAndDelete({ _id: id });

    res.status(200).json({ favorite });
};

module.exports = {
    getFavoritesByUserId,
    getFavoriteById,
    postFavorite,
    patchFavorite,
    deleteFavorite,
};
