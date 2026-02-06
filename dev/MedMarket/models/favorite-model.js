const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoriteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
    },
    { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;
