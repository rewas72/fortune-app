const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize,DataTypes) => {
    const FortuneRequest = sequelize.define("FortuneRequest", {
        message: DataTypes.TEXT,
        status: {
            type: DataTypes.ENUM("pending", "answered"),
            defaultValue:"pending"
        },
        answer: DataTypes.TEXT,
        birthDate: DataTypes.DATEONLY,
        gender: DataTypes.STRING,
        RelationshipStatus:DataTypes.STRING
    })

    FortuneRequest.associate = (models) => {
    FortuneRequest.hasMany(models.FortuneRequestImage, {
      foreignKey: "fortuneRequestId",
      as: "images",
    });
    FortuneRequest.belongsTo(models.User, { foreignKey: "userId" });
    FortuneRequest.belongsTo(models.FortuneTeller, { foreignKey: "fortuneTellerId" });
  };

  return FortuneRequest;
};

