const { faker } = require("@faker-js/faker");
const { connectDatabase } = require("../config/database");
const categoryModel = require("../models/category-model");

async function categorySeeder() {
    try {
        await categoryModel.create({
            name: faker.commerce.productAdjective(),
            description: faker.commerce.productDescription(),
        });

        console.log("Category seeded successfully");
    } catch (error) {
        console.error("Category Seeding error:", error);
    }
}

async function categoriesSeeder(amount) {
    try {
        await connectDatabase();

        await categoryModel.deleteMany();

        for (let i = 0; i < amount; ++i) {
            await categorySeeder();
        }

        console.log(`All ${amount} Categories seeded successfully`);
    } catch (error) {
        console.error("Categories bulk Seeding error:", error);
    } finally {
        // Exiting the process
        process.exit();
    }
}

// Extracting the number of categories to be seeded from the command line arguments, defaulting to 10 if not provided
const amount = process.argv[2] ? process.argv[2] : 10;

categoriesSeeder(amount);
