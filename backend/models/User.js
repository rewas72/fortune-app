const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    profileImage: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "fortuneteller"),
      defaultValue: "user",
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fortunePrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    fortuneTellerDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return User;
};