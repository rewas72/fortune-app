const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/fortuneteller-login", authController.fortunetellerLogin);
router.get("/users", authController.getAllUsers);
router.put("/users/:id", authController.updateUser);
router.put("/users/:id/topup", authController.topUpBalance);
router.patch('/users/:id/price', authController.updateFortunePrice);


module.exports = router;
