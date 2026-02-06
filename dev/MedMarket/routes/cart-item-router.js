const express = require("express");
const cartItemController = require("../controllers/cart-item-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const {
    cartItemValidator,
} = require("../middlewares/validators/cart-item-validator");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", requireLogin, catchAsyncErr(cartItemController.getCartItems));

router.get(
    "/",
    requireLogin,
    catchAsyncErr(cartItemController.getCartItemsByCartId)
);

router.get(
    "/",
    requireLogin,
    catchAsyncErr(cartItemController.getCartItemsByProductId)
);

router.get(
    "/:id",
    idValidator,
    catchAsyncErr(cartItemController.getCartItemById)
);

router.post(
    "/",
    requireLogin,
    cartItemValidator,
    catchAsyncErr(cartItemController.postCartItem)
);

router.patch(
    "/:id",
    requireLogin,
    idValidator,
    cartItemValidator,
    catchAsyncErr(cartItemController.patchCartItem)
);

router.delete(
    "/:id",
    requireLogin,
    idValidator,
    catchAsyncErr(cartItemController.deleteCartItem)
);

module.exports = router;
