const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { FortuneRequest, FortuneRequestImage } = require("../models");
const { getAllFortuneRequests, getUserFortuneRequests, sendFortuneRequest, getFortuneRequestById } = require("../controllers/fortuneRequestController");

// POST /api/fortune-requests
router.post("/", upload.array("images", 5), sendFortuneRequest);
router.get("/", getAllFortuneRequests)
router.get("/:id", getFortuneRequestById); 
router.get("/user/:userId", getUserFortuneRequests); 


module.exports = router;
