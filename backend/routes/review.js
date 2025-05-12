const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");

// POST /api/reviews
router.post("/reviews", reviewController.createReview);
router.get("/fortunetellers/:id/reviews", reviewController.getFortuneTellerReviews)
router.get("/fortunetellers/:id/average-rating", reviewController.getAverageRating);


module.exports = router;