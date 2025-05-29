const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.FortuneRequest = require("./FortuneRequest")(sequelize, Sequelize.DataTypes);
db.Review = require("./Review")(sequelize, Sequelize.DataTypes);
db.FortuneRequestImage = require("./FortuneRequestImage")(sequelize, Sequelize.DataTypes);

// İlişkiler



// Kullanıcının kendi gönderdiği fallar
db.User.hasMany(db.FortuneRequest, { foreignKey: "userId", as: "SentRequests" });
db.FortuneRequest.belongsTo(db.User, { foreignKey: "userId", as: "Sender" });

// Falcıya gönderilen fallar
db.User.hasMany(db.FortuneRequest, { foreignKey: "fortunetellerId", as: "ReceivedRequests" });
db.FortuneRequest.belongsTo(db.User, { foreignKey: "fortunetellerId", as: "Fortuneteller" });

// Kullanıcının yaptığı yorumlar
db.User.hasMany(db.Review, { foreignKey: "userId", as: "GivenReviews" });
db.Review.belongsTo(db.User, { foreignKey: "userId", as: "ReviewAuthor" });

// Falcıya yapılan yorumlar
db.User.hasMany(db.Review, { foreignKey: "fortunetellerId", as: "ReceivedReviews" });
db.Review.belongsTo(db.User, { foreignKey: "fortunetellerId", as: "ReviewedFortuneteller" });

// Fal isteğine ait görseller
db.FortuneRequest.hasMany(db.FortuneRequestImage, { foreignKey: "fortuneRequestId", as: "images" });
db.FortuneRequestImage.belongsTo(db.FortuneRequest, { foreignKey: "fortuneRequestId", as: "Request" });

module.exports = db;
