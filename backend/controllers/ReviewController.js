const { Review, FortuneRequest, User } = require("../models");
const { fn, col } = require("sequelize")

exports.createReview = async (req, res) => {
  const { userId, fortunetellerId, rating, comment } = req.body;

  try {
    const hasRequest = await FortuneRequest.findOne({
      where: {
        userId,
        fortunetellerId,
        status: "answered",
      },
    });

    if (!hasRequest) {
      return res.status(403).json({ error: "Bu falcıya yorum yapamazsınız. Önce fal almalısınız." });
    }

    const existingReview = await Review.findOne({
      where: { userId, fortunetellerId },
    });

    if (existingReview) {
      return res.status(400).json({ error: "Bu falcıya zaten yorum yaptınız." });
    }

    const review = await Review.create({
      userId,
      fortunetellerId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Yorum eklendi", review });
  } catch (error) {
    res.status(500).json({ error: "Yorum eklenirken bir hata oluştu." });
    console.error("Yorum eklenirken hata:", error); // BU SATIRI EKLE
  }
};


exports.getFortuneTellerReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { fortunetellerId: id },
      include: [
        {
          model: User,
          as: "ReviewAuthor",
          attributes: ["id", "name"]
        }
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(reviews)
  } catch (error) {
    res.status(500).json({ error: "Yorumlar getirilirken bir hata oluştu." });
    console.error("veriler getirilirken:", error); // BU SATIRI EKLE

  }
}

// GET /api/fortunetellers/:id/average-rating
exports.getAverageRating = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Review.findOne({
      where: { fortunetellerId: id },
      attributes: [[fn("AVG", col("rating")), "avgRating"]],
      raw: true,
    });

    const avg = parseFloat(result.avgRating || 0).toFixed(2);

    res.json({ fortunetellerId: id, averageRating: avg });
  } catch (error) {
    res.status(500).json({ error: "Ortalama puan getirilirken bir hata oluştu." });
  }
};