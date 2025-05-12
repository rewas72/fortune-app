const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize,DataTypes) => {
    const Review = sequelize.define("Review", {
        rating: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
    });
    return Review
}