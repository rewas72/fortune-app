const { FortuneRequest, FortuneRequestImage, User } = require('../models');

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


exports.getAllFortuneRequests = async (req, res) => {
  try {
    const requests = await FortuneRequest.findAll({
      include: [
        {
          model: FortuneRequestImage,
          as: "images",
        },
        {
          model: User,
          as: 'Sender',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'Fortuneteller',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });


    res.status(200).json(requests);
  } catch (error) {
    console.error("Fal isteklerini alma hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};



exports.getUserFortuneRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await FortuneRequest.findAll({
      where: { userId },
      include: [
        { model: FortuneRequestImage, as: "images" },
        { model: User, as: "Fortuneteller", attributes: ['id', 'name', 'email'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error("Kullanıcı fal isteklerini alma hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
};
