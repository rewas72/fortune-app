const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize,DataTypes) => {
    const Review = sequelize.define("Review", {
        rating:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                min:1,
                max:5
            }
        },
        comment: {
            type:DataTypes.TEXT,
            allowNull:true,
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        fortunetellerId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    });
    return Review
}