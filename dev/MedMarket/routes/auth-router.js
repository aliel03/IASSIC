const express = require("express");
const authController = require("../controllers/auth-controller");
const authValidator = require("../middlewares/validators/auth-validator");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { requireLogin } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", authValidator.login, catchAsyncErr(authController.login));

router.post(
    "/register",
    authValidator.register,
    catchAsyncErr(authController.register)
);

router.get("/logout", requireLogin, catchAsyncErr(authController.logout));

module.exports = router;
