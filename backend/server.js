const express = require("express");
const cors = require("cors");
const db = require("./models")
const dotenv = require("dotenv");
const  FortuneRequest  = require("./routes/FortuneRequest");


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"))

app.use("/api/fortune-requests", FortuneRequest)

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
});