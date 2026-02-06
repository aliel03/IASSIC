// NPM Modules
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config();

// Local Modules
const { connectDatabase } = require("./config/database");
const { errorHandler } = require("./middlewares/error-handler");
const authRouter = require("./routes/auth-router");
const usersRouter = require("./routes/user-router");
const productRouter = require("./routes/product-router");
const categoryRouter = require("./routes/category-router");
const reviewRouter = require("./routes/review-router");
const cityRouter = require("./routes/city-router");
const favoriteRouter = require("./routes/favorite-route");
const orderRouter = require("./routes/order-router");
const orderItemRouter = require("./routes/order-item-router");
const cartRouter = require("./routes/cart-router");
const cartItemRouter = require("./routes/cart-item-router");
const paymentRouter = require("./routes/payment-router");

// Config
const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectDatabase();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        limits: {
            fileSize: 4000000, // 4MB
        },
        abortOnLimit: true,
    })
);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/cities", cityRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/favorites", favoriteRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);
app.use("/api/order-items", orderItemRouter);
app.use("/api/carts", cartRouter);
app.use("/api/cart-items", cartItemRouter);
app.use("/api/payments", paymentRouter);
app.use("/api", authRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
