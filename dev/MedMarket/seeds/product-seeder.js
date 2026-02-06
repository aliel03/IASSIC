const { faker } = require("@faker-js/faker");
const { connectDatabase } = require("../config/database");
const productModel = require("../models/product-model");
const categoryModel = require("../models/category-model");

async function productSeeder(category) {
    try {
        await productModel.create({
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            quantity: faker.number.int({ min: 0, max: 1000 }),
            category,
        });

        console.log("Product seeded successfully");
    } catch (error) {
        console.error("Product Seeding error:", error);
    }
}

async function productsSeeder(amount) {
    try {
        await connectDatabase();

        const categories = await categoryModel.find();

        await productModel.deleteMany();

        for (let i = 0; i < amount; ++i) {
            const randPosition = Math.floor(Math.random() * categories.length);
            const category = categories[randPosition]._id;
            await productSeeder(category);
        }

        console.log(`All ${amount} Products seeded successfully`);
    } catch (error) {
        console.error("Products bulk Seeding error:", error);
    } finally {
        // Exiting the process
        process.exit();
    }
}

// Extracting the number of categories to be seeded from the command line arguments, defaulting to 10 if not provided
const amount = process.argv[2] ? process.argv[2] : 10;

productsSeeder(amount);
