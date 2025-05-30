const express = require("express");
const router = express.Router();
const fortunetellerController = require("../controllers/fortunetellerController");

router.get("/top-rated", fortunetellerController.getTopRatedFortunetellers);
router.get("/lowest-price", fortunetellerController.getFortunetellersByLowestPrice);
router.get("/highest-price", fortunetellerController.getFortunetellersByHighestPrice);
router.get("/fortunetellers/:id", fortunetellerController.getFortuneTellerWithReviews);
module.exports = router;
