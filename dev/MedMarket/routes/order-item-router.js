const express = require("express");
const orderItemController = require("../controllers/order-item-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const {
    orderItemValidator,
} = require("../middlewares/validators/order-item-validator");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", requireLogin, catchAsyncErr(orderItemController.getOrderItems));

router.get(
    "/",
    requireLogin,
    catchAsyncErr(orderItemController.getOrderItemsByOrderId)
);

router.get(
    "/",
    requireLogin,
    catchAsyncErr(orderItemController.getOrderItemsByProductId)
);

router.get(
    "/:id",
    idValidator,
    catchAsyncErr(orderItemController.getOrderItemById)
);

router.post(
    "/",
    requireLogin,
    orderItemValidator,
    catchAsyncErr(orderItemController.postOrderItem)
);

router.patch(
    "/:id",
    requireLogin,
    idValidator,
    orderItemValidator,
    catchAsyncErr(orderItemController.patchOrderItem)
);

router.delete(
    "/:id",
    requireLogin,
    idValidator,
    catchAsyncErr(orderItemController.deleteOrderItem)
);

module.exports = router;
