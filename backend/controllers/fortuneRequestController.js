const { FortuneRequest, FortuneRequestImage, User } = require('../models');

exports.sendFortuneRequest = async (req, res) => {
  try {
    const {
      message,
      birthDate,
      gender,
      relationshipStatus,
      userId,
      fortuneTellerId, // frontend'den gelen camelCase
    } = req.body;

    // Modelde alan adı küçük t ile fortunetellerId ise burada eşitleyelim
    const fortunetellerId = fortuneTellerId;

    // Yeni fal isteği oluştur
    const fortuneRequest = await FortuneRequest.create({
      message,
      birthDate,
      gender,
      relationshipStatus,
      userId,
      fortunetellerId, // modeldeki doğru alan adı
    });

    // Gelen dosyalar varsa resimleri kaydet
    if (req.files && req.files.length > 0) {
      const imagePromises = req.files.map((file) =>
        FortuneRequestImage.create({
          imagePath: file.path,
          fortuneRequestId: fortuneRequest.id,
        })
      );
      await Promise.all(imagePromises);
    }

    res.status(201).json({ message: "Fal isteği başarıyla gönderildi." });
  } catch (error) {
    console.error("Fal gönderme hatası:", error);
    res.status(500).json({ error: "Fal isteği oluşturulamadı." });
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

    console.log("Backend'e gelen fortuneTellerId:", req.body.fortuneTellerId);

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
      attributes: [
        'id', 'message', 'status', 'answer', 'birthDate', 'gender', 'relationshipStatus', 'userId', 'fortunetellerId', 'createdAt', 'updatedAt'
      ],
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
exports.getFortuneRequestById = async (req, res) => {
  try {
    const id = req.params.id;

    const request = await FortuneRequest.findOne({
      where: { id },
      include: [
        {
          model: FortuneRequestImage,
          as: "images",
          attributes: ['imagePath'],  // burada imagePath kullan
        },
        {
          model: User,
          as: "Sender",  // burası user mı? orijinalde Sender ilişkisi var
          attributes: ['id', 'name'],
        }
      ]
    });

    if (!request) {
      return res.status(404).json({ message: "Fal isteği bulunamadı." });
    }

    res.json({
      id: request.id,
      message: request.message,
      status: request.status,
      response: request.answer, // burada backend'de answer olarak kayıtlı
      createdAt: request.createdAt,
      user: request.Sender,  // doğru alias
      images: request.images.map(img => img.imagePath)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu." });
  }
};
