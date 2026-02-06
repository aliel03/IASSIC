const productModel = require("../models/product-model");

const getProducts = async (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const order = req.query.order ? req.query.order : "asc";
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    const products = await productModel
        .find()
        .select("-image")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit);

    if (products.length === 0) {
        return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ products });
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    const product = await productModel
        .findOne({ _id: id })
        .select("-image")
        .populate("category");

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
};

const getRelatedProducts = async (req, res) => {
    const { id } = req.params;
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const order = req.query.order ? req.query.order : "asc";
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;

    const product = await productModel.findOne({ _id: id });
    const products = await productModel
        .find({
            _id: { $ne: id },
            category: product.category,
        })
        .select("-image")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit);

    if (products.length === 0) {
        return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ products });
};

const getProductImage = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findOne({ _id: id });
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.set("Content-Type", product.image.contentType);
    return res.send(product.image.data);
};

const postProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;

    const image = {
        data: req.files.image.data,
        contentType: req.files.image.mimetype,
    };
    if (!image) {
        return res.status(400).json({ error: "Image not uploaded" });
    }
    if (/^image/.test(image.mimetype)) {
        return res.status(400).json({ error: "Uploaded file is not an image" });
    }

    const product = await productModel.create({
        name,
        description,
        price: parseFloat(price),
        quantity: parseFloat(quantity),
        image,
        category,
    });

    res.status(201).json({ product });
};

const searchProducts = async (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    const order = req.query.order ? req.query.order : "asc";
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    let findArgs = {};
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    const products = await productModel
        .find(findArgs)
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip);

    if (products.length === 0) {
        return res.status(404).json({ error: "No products found" });
    }

    res.status(200).json({ products });
};

const patchProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity, category } = req.body;

    const image = { data: req.files.data, contentType: req.files.mimetype };
    if (!image) {
        return res.status(400).json({ error: "Image not uploaded" });
    }
    if (/^image/.test(image.mimetype)) {
        return res.status(400).json({ error: "Uploaded file is not an image" });
    }

    const product = await productModel.findOneAndUpdate(
        { _id: id },
        {
            name,
            description,
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            image,
            category,
        },
        { new: true }
    );

    res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findOneAndDelete({ _id: id });

    res.status(200).json({ product });
};

module.exports = {
    getProducts,
    getProductById,
    getRelatedProducts,
    getProductImage,
    postProduct,
    searchProducts,
    patchProduct,
    deleteProduct,
};
