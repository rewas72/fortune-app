const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../middlewares/upload")

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/fortuneteller-login", authController.fortunetellerLogin);
router.get("/users", authController.getAllUsers);
router.get("/users/getUserById/:id", authController.getUserById);
router.put("/users/:id", authController.updateUser);
router.put("/users/:id/topup", authController.topUpBalance);
router.patch('/users/:id/price', authController.updateFortunePrice);
router.post(
  "/users/:id/profile-image",
  upload.single("profileImage"),
  authController.updateProfileImage
);
router.put("/users/change-password/:id", authController.changePassword);
router.patch(
  "/users/:id/fortune/description",
  authController.updateFortuneTellerDescription
);


module.exports = router;
