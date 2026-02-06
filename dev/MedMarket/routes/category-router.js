const express = require("express");
const categoryController = require("../controllers/category-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const {
    categoryValidator,
} = require("../middlewares/validators/category-validator");
const { requireLogin, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", catchAsyncErr(categoryController.getCategories));
router.get(
    "/:id",
    idValidator,
    catchAsyncErr(categoryController.getCategoryById)
);
router.post(
    "/",
    requireLogin,
    isAdmin,
    categoryValidator,
    catchAsyncErr(categoryController.postCategory)
);
router.patch(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    categoryValidator,
    catchAsyncErr(categoryController.patchCategory)
);
router.delete(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    catchAsyncErr(categoryController.deleteCategory)
);

module.exports = router;
