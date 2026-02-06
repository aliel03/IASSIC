const express = require("express");
const cityController = require("../controllers/city-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const { cityValidator } = require("../middlewares/validators/city-validator");
const { requireLogin, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", catchAsyncErr(cityController.getCities));

router.get("/:id", idValidator, catchAsyncErr(cityController.getCityById));

router.post(
    "/",
    requireLogin,
    isAdmin,
    cityValidator,
    catchAsyncErr(cityController.postCity)
);

router.patch(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    cityValidator,
    catchAsyncErr(cityController.patchCity)
);

router.delete(
    "/:id",
    requireLogin,
    isAdmin,
    idValidator,
    catchAsyncErr(cityController.deleteCity)
);

module.exports = router;
