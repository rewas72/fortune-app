const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        fullName : DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique:true
        },
        password: DataTypes.STRING,
        role:{
            type:DataTypes.ENUM("user","fortune"), 
            defaultValue: "user"
        },
        balance: {
            type:DataTypes.FLOAT,
            defaultValue:0
        }
    })
    return User
}