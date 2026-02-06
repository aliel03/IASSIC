const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URL;

async function connectDatabase() {
    try {
        await mongoose.connect(db_url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

module.exports = { connectDatabase };
