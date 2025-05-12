const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");


module.exports = (sequelize, DataTypes) => {
  const FortuneRequestImage = sequelize.define("FortuneRequestImage", {
    imagePath: DataTypes.STRING, // yerel path ya da dosya adı
  });

  FortuneRequestImage.associate = (models) => {
    FortuneRequestImage.belongsTo(models.FortuneRequest, {
      foreignKey: "fortuneRequestId",
      onDelete: "CASCADE",
    });
  };

  return FortuneRequestImage;
};