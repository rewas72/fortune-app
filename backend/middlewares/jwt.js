const jwt = require("jsonwebtoken");

module.exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token 1 saat geçerli olacak
  });

  return token;
};

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded; // Kullanıcı bilgilerini request'e ekle
    next();
  });
};
