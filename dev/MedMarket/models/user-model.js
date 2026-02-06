const mongoose = require("mongoose");
const uuid = require("uuid").v4;
const crypto = require("crypto");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 30,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            minlength: 3,
            maxlength: 30,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            match: /\S+@\S+\.\S+/,
            index: true,
        },
        location: {
            address: String,
            city: {
                type: Schema.Types.ObjectId,
                ref: "City",
            },
        },
        role: {
            type: Number,
            default: 0,
        },
        hash: String,
        salt: String,
    },
    { timestamps: true }
);

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuid();
        this.hash = this.cryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    cryptPassword: function (password) {
        if (!password) return "";

        try {
            return crypto
                .createHmac("sha256", this.salt)
                .update(password)
                .digest("hex");
        } catch (error) {
            console.error(error);
            return "";
        }
    },
    authenticate: function (password) {
        return this.cryptPassword(password) === this.hash;
    },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
