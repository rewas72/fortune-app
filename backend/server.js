const express = require("express");
const cors = require("cors");
const db = require("./models")
const dotenv = require("dotenv");
const  FortuneRequest  = require("./routes/FortuneRequest");
const authRoutes = require("./routes/auth")
const authenticate = require("./middlewares/jwt")
const reviewRoutes = require("./routes/review");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"))

app.use("/api/fortune-requests", FortuneRequest)
app.use("/api/auth", authRoutes);
app.use("/api", reviewRoutes);



const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
});