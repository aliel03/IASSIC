const express = require("express");
const reviewController = require("../controllers/review-controller");
const { catchAsyncErr } = require("../utils/catch-async-err");
const { idValidator } = require("../middlewares/validators/id-validator");
const {
    reviewValidator,
} = require("../middlewares/validators/review-validator");
const { requireLogin, isAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", catchAsyncErr(reviewController.getReviews));

router.get(
    "/product/:id",
    idValidator,
    catchAsyncErr(reviewController.getReviewsByProductId)
);

router.get(
    "/user/:id",
    requireLogin,
    idValidator,
    isAuth,
    catchAsyncErr(reviewController.getReviewsByUserId)
);

router.get("/:id", idValidator, catchAsyncErr(reviewController.getReviewById));

router.post(
    "/",
    requireLogin,
    reviewValidator,
    catchAsyncErr(reviewController.postReview)
);

router.patch(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    reviewValidator,
    catchAsyncErr(reviewController.patchReview)
);

router.delete(
    "/:id",
    requireLogin,
    isAuth,
    idValidator,
    catchAsyncErr(reviewController.deleteReview)
);

module.exports = router;
