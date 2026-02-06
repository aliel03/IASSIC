const express = require("express");
const userController = require("../controllers/user-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const { userValidator } = require("../middlewares/validators/user-validator");
const { requireLogin, isAuth, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", requireLogin, isAdmin, catchAsyncErr(userController.getUsers));
router.get(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    catchAsyncErr(userController.getUserById)
);
router.post(
    "/",
    requireLogin,
    isAdmin,
    userValidator,
    catchAsyncErr(userController.postUser)
);
router.patch(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    userValidator,
    catchAsyncErr(userController.patchUser)
);
router.delete(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    catchAsyncErr(userController.deleteUser)
);

module.exports = router;
