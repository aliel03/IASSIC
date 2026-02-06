const { connectDatabase } = require("../config/database");
const cityModel = require("../models/city-model");

const cities = [
    "Agadir",
    "Al Hoceima",
    "Azemmour",
    "Beni Mellal",
    "Benguerir",
    "Beni Ansar",
    "Berkane",
    "Berrechid",
    "Casablanca",
    "Chefchaouen",
    "Dakhla",
    "El Jadida",
    "Errachidia",
    "Essaouira",
    "Fes",
    "Guelmim",
    "Ifrane",
    "Kénitra",
    "Khouribga",
    "Laayoune",
    "Larache",
    "Marrakech",
    "Meknès",
    "Mohammedia",
    "Nador",
    "Ouarzazate",
    "Oujda",
    "Rabat",
    "Safi",
    "Salé",
    "Settat",
    "Sidi Kacem",
    "Tangier",
    "Taza",
    "Témara",
    "Tétouan",
];

async function citiesSeeder() {
    try {
        await connectDatabase();

        await cityModel.deleteMany();

        for (let i = 0; i < cities.length; ++i) {
            await cityModel.create({
                name: cities[i],
            });
            console.log("City seeded successfully");
        }

        console.log("All Cities seeded successfully");
    } catch (error) {
        console.error("Cities bulk Seeding error:", error);
    } finally {
        process.exit();
    }
}

citiesSeeder();
