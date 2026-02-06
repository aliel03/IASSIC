const categoryModel = require("../models/category-model");

const getCategories = async (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const order = req.query.order ? req.query.order : "asc";
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    const categories = await categoryModel
        .find()
        .sort([[sortBy, order]])
        .limit(limit);

    if (categories.length === 0) {
        return res.status(404).json({ error: "No categories found" });
    }

    res.status(200).json({ categories });
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    const category = await categoryModel.findOne({ _id: id });

    if (!category) {
        return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ category });
};

const postCategory = async (req, res) => {
    const { name, description } = req.body;

    const category = await categoryModel.create({
        name,
        description,
    });

    res.status(201).json({ category });
};

const patchCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await categoryModel.findOneAndUpdate(
        { _id: id },
        {
            name,
            description,
        },
        { new: true }
    );

    res.status(200).json({ category });
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    const category = await categoryModel.findOneAndDelete({ _id: id });

    res.status(200).json({ category });
};

module.exports = {
    getCategories,
    getCategoryById,
    postCategory,
    patchCategory,
    deleteCategory,
};
