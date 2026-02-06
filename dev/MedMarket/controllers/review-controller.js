const reviewModel = require("../models/review-model");

const getReviews = async (req, res) => {
    const reviews = await reviewModel
        .find()
        .populate("user")
        .populate("product");

    if (reviews.length === 0) {
        return res.status(404).json({ error: "No reviews found" });
    }

    res.status(200).json({ reviews });
};

const getReviewsByProductId = async (req, res) => {
    const { id } = req.params;

    const reviews = await reviewModel.find({ product: id }).populate("user");

    if (reviews.length === 0) {
        return res.status(404).json({ error: "No reviews found" });
    }

    res.status(200).json({ reviews });
};

const getReviewsByUserId = async (req, res) => {
    const { id } = req.params;

    const reviews = await reviewModel.find({ user: id }).populate("product");

    if (reviews.length === 0) {
        return res.status(404).json({ error: "No reviews found" });
    }

    res.status(200).json({ reviews });
};

const getReviewById = async (req, res) => {
    const { id } = req.params;

    const review = await reviewModel
        .findOne({
            _id: id,
        })
        .populate("user")
        .populate("product");

    if (!review) {
        return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ review });
};

const postReview = async (req, res) => {
    const { product, content } = req.body;

    const review = await reviewModel.create({
        user: req.auth._id,
        product,
        content,
    });

    res.status(201).json({ review });
};

const patchReview = async (req, res) => {
    const { id } = req.params;
    const { product, content } = req.body;

    const review = await reviewModel.findOneAndUpdate(
        { _id: id },
        {
            user: req.auth._id,
            product,
            content,
        },
        { new: true }
    );

    res.status(200).json({ review });
};

const deleteReview = async (req, res) => {
    const { id } = req.params;

    const review = await reviewModel.findOneAndDelete({ _id: id });

    res.status(200).json({ review });
};

module.exports = {
    getReviews,
    getReviewsByProductId,
    getReviewsByUserId,
    getReviewById,
    postReview,
    patchReview,
    deleteReview,
};
