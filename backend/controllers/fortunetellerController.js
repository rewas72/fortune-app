const { User, Review } = require("../models");
const { Sequelize } = require("sequelize");

exports.getTopRatedFortunetellers = async (req, res) => {
  try {
    const fortunetellers = await User.findAll({
      where: { role: "fortuneteller" },
      attributes: {
        exclude: ["password"],
        include: [
          [
            Sequelize.fn("AVG", Sequelize.col("ReceivedReviews.rating")),
            "averageRating"
          ]
        ]
      },
      include: [{
        model: Review,
        as: "ReceivedReviews",
        attributes: []
      }],
      group: ["User.id"],
      order: [[Sequelize.literal("averageRating"), "DESC"]],
    });

    res.status(200).json(fortunetellers);
  } catch (error) {
    res.status(500).json({ error: "Falcılar alınırken hata oluştu." });
  }
};

exports.getFortunetellersByLowestPrice = async (req, res) => {
  try {
    const fortunetellers = await User.findAll({
      where: { role: "fortuneteller" },
      attributes: { exclude: ["password"] },
      order: [["fortunePrice", "ASC"]],
    });

    res.status(200).json(fortunetellers);
  } catch (error) {
    res.status(500).json({ error: "Sıralama yapılırken hata oluştu." });
  }
};

exports.getFortunetellersByHighestPrice = async (req, res) => {
  try {
    const fortunetellers = await User.findAll({
      where: { role: "fortuneteller" },
      attributes: { exclude: ["password"] },
      order: [["fortunePrice", "DESC"]],
    });

    res.status(200).json(fortunetellers);
  } catch (error) {
    res.status(500).json({ error: "Sıralama yapılırken hata oluştu." });
  }
};
