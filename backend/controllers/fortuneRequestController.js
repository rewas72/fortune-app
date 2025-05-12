const { FortuneRequest } = require("../models");

exports.createFortuneRequest = async (req, res) => {
  try {
    const { message, birthDate, gender, maritalStatus, userId } = req.body;

    const imagePaths = req.files.map(file => file.path);

    const newRequest = await FortuneRequest.create({
      message,
      birthDate,
      gender,
      maritalStatus,
      userId,
      imageUrls: imagePaths,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fal isteği gönderilemedi." });
  }
};
