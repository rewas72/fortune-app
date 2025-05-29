const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const FortuneRequest = sequelize.define("FortuneRequest", {
    message: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("pending", "answered"),
      defaultValue: "pending"
    },
    answer: DataTypes.TEXT,
    birthDate: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    relationshipStatus: DataTypes.STRING
  });

  FortuneRequest.associate = (models) => {
    FortuneRequest.hasMany(models.FortuneRequestImage, {
      foreignKey: "fortuneRequestId",
      as: "images", 
    });

    FortuneRequest.belongsTo(models.User, { foreignKey: "userId", as: "Sender" });
    FortuneRequest.belongsTo(models.User, { foreignKey: "fortunetellerId", as: "Fortuneteller" });
  };

  return FortuneRequest;
};
