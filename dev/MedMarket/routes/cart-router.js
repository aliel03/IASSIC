const express = require("express");
const cartController = require("../controllers/cart-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const { cartValidator } = require("../middlewares/validators/cart-validator");
const { requireLogin, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", requireLogin, isAdmin, catchAsyncErr(cartController.getCarts));

router.get("/", requireLogin, catchAsyncErr(cartController.getCartsByUserId));

router.get(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    catchAsyncErr(cartController.getCartById)
);

router.post(
    "/",
    requireLogin,
    cartValidator,
    catchAsyncErr(cartController.postCart)
);

router.patch(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    cartValidator,
    catchAsyncErr(cartController.patchCart)
);

router.delete(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    catchAsyncErr(cartController.deleteCart)
);

module.exports = router;
