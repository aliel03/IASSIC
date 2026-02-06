const cityModel = require("../models/city-model");

const getCities = async (req, res) => {
    const cities = await cityModel.find().sort([["name", "asc"]]);

    if (cities.length === 0) {
        return res.status(404).json({ error: "No cities found" });
    }

    res.status(200).json({ cities });
};

const getCityById = async (req, res) => {
    const { id } = req.params;

    const city = await cityModel.findOne({ _id: id });

    if (!city) {
        return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json({ city });
};

const postCity = async (req, res) => {
    const { name } = req.body;

    const city = await cityModel.create({ name });

    res.status(201).json({ city });
};

const patchCity = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const city = await cityModel.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true }
    );

    res.status(200).json({ city });
};

const deleteCity = async (req, res) => {
    const { id } = req.params;

    const city = await cityModel.findOneAndDelete({ _id: id });

    res.status(200).json({ city });
};

module.exports = {
    getCities,
    getCityById,
    postCity,
    patchCity,
    deleteCity,
};
