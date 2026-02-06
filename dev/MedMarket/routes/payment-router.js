const express = require("express");
const paymentController = require("../controllers/payment-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const {
    paymentValidator,
} = require("../middlewares/validators/payment-validator");
const { requireLogin, isAuth } = require("../middlewares/auth");

const router = express.Router();

router.get(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    catchAsyncErr(paymentController.getPaymentById)
);

router.post(
    "/",
    requireLogin,
    paymentValidator,
    catchAsyncErr(paymentController.postPayment)
);

router.patch(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    paymentValidator,
    catchAsyncErr(paymentController.patchPayment)
);

router.delete(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    catchAsyncErr(paymentController.deletePayment)
);

module.exports = router;
