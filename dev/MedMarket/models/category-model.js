const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            maxlength: 30,
            required: true,
        },
        description: String,
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
