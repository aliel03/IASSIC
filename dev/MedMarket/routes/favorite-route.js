const express = require("express");
const favoriteController = require("../controllers/favorite-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const {
    favoriteValidator,
} = require("../middlewares/validators/favorite-validator");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.get(
    "/",
    requireLogin,
    catchAsyncErr(favoriteController.getFavoritesByUserId)
);

router.get(
    "/:id",
    requireLogin,
    idValidator,
    catchAsyncErr(favoriteController.getFavoriteById)
);

router.post(
    "/",
    requireLogin,
    favoriteValidator,
    catchAsyncErr(favoriteController.postFavorite)
);

router.patch(
    "/:id",
    requireLogin,
    idValidator,
    favoriteValidator,
    catchAsyncErr(favoriteController.patchFavorite)
);

router.delete(
    "/:id",
    requireLogin,
    idValidator,
    catchAsyncErr(favoriteController.deleteFavorite)
);

module.exports = router;
