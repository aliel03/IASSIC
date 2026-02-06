const express = require("express");
const productController = require("../controllers/product-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const {
    productValidator,
} = require("../middlewares/validators/product-validator");
const { requireLogin, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", catchAsyncErr(productController.getProducts));

router.get(
    "/:id",
    idValidator,
    catchAsyncErr(productController.getProductById)
);

router.get(
    "/related/:id",
    idValidator,
    catchAsyncErr(productController.getRelatedProducts)
);

router.get(
    "/image/:id",
    idValidator,
    catchAsyncErr(productController.getProductImage)
);

router.post(
    "/",
    requireLogin,
    isAdmin,
    productValidator,
    catchAsyncErr(productController.postProduct)
);

router.post(
    "/search",
    requireLogin,
    catchAsyncErr(productController.searchProducts)
);

router.patch(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    productValidator,
    catchAsyncErr(productController.patchProduct)
);

router.delete(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    catchAsyncErr(productController.deleteProduct)
);

module.exports = router;
