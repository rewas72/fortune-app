const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { FortuneRequest, FortuneRequestImage } = require("../models");
const { getAllFortuneRequests, getUserFortuneRequests } = require("../controllers/fortuneRequestController");

// POST /api/fortune-requests
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { message, birthDate, gender, relationshipStatus, userId, fortuneTellerId } = req.body;

    const fortuneRequest = await FortuneRequest.create({
      message,
      birthDate,
      gender,
      relationshipStatus,
      userId,
      fortuneTellerId,
    });

    const imagePromises = req.files.map((file) =>
      FortuneRequestImage.create({
        imagePath: file.path,
        fortuneRequestId: fortuneRequest.id,
      })
    );

    await Promise.all(imagePromises);

    res.status(201).json({ message: "Fal isteği başarıyla gönderildi." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fal isteği oluşturulamadı." });
  }
});

router.get("/", getAllFortuneRequests)
router.get("/user/:userId", getUserFortuneRequests); 


module.exports = router;
