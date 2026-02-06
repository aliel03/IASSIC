const express = require("express");
const orderController = require("../controllers/order-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const { orderValidator } = require("../middlewares/validators/order-validator");
const { requireLogin, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get(
    "/",
    requireLogin,
    isAdmin,
    catchAsyncErr(orderController.getOrders)
);

router.get(
    "/user",
    requireLogin,
    catchAsyncErr(orderController.getOrdersByUserId)
);

router.get(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    catchAsyncErr(orderController.getOrderById)
);

router.post(
    "/",
    requireLogin,
    orderValidator,
    catchAsyncErr(orderController.postOrder)
);

router.patch(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    orderValidator,
    catchAsyncErr(orderController.patchOrder)
);

router.delete(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    catchAsyncErr(orderController.deleteOrder)
);

module.exports = router;
