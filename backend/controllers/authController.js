const bcrypt = require("bcryptjs");
const jwt = require("../middlewares/jwt");
const { User } = require("../models");
const upload = require("../middlewares/upload")

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.generateToken(newUser);

    res.status(201).json({
      message: "Kullanıcı başarıyla kaydedildi.",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Yanlış şifre" });
    }

    const token = jwt.generateToken(user);

    res.status(200).json({
      message: "Giriş başarılı",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};



exports.fortunetellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, role: "fortuneteller" } });

    if (!user) {
      return res.status(400).json({ error: "Falcı bulunamadı veya kaydedilemez." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Yanlış şifre" });
    }

    const token = jwt.generateToken(user);

    res.status(200).json({
      message: "Falcı olarak giriş başarılı",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu." });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Kullanıcılar alınırken bir hata oluştu." });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params; // URL'den alınan kullanıcı ID
  const { name, email, role } = req.body;

  // Role doğrulaması yap (güvenlik için)
  const validRoles = ["user", "fortuneteller"];
  if (role && !validRoles.includes(role)) {
    return res.status(400).json({ error: "Geçersiz rol" });
  }

  try {
    const user = await User.findByPk(id); // veya findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    // Sadece gelen alanları güncelle
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({ message: "Kullanıcı başarıyla güncellendi", user });
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};

exports.topUpBalance = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    console.log("Mevcut bakiye:", user.balance); // debug

    const currentBalance = parseFloat(user.balance) || 0;
    const addedAmount = parseFloat(amount);

    if (isNaN(addedAmount)) {
      return res.status(400).json({ error: "Geçersiz bakiye miktarı" });
    }

    const newBalance = currentBalance + addedAmount;
    user.balance = newBalance;

    await user.save();

    console.log("Güncellenmiş bakiye:", user.balance); // debug

    res.json({ message: "Bakiye yüklendi", balance: user.balance });
  } catch (err) {
    console.error("Hata:", err);
    res.status(500).json({ error: "Bakiye güncellenemedi" });
  }
};



exports.updateFortunePrice = async (req, res) => {
  const { id } = req.params;
  const { fortunePrice } = req.body;

  if (!fortunePrice || isNaN(fortunePrice)) {
    return res.status(400).json({ error: 'Geçerli bir fiyat giriniz.' });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    if (user.role !== 'fortuneteller') {
      return res.status(403).json({ error: 'Sadece falcılar fiyat belirleyebilir.' });
    }

    user.fortunePrice = fortunePrice;
    await user.save();

    res.status(200).json({
      message: 'Fiyat başarıyla güncellendi.',
      fortunePrice: user.fortunePrice,
    });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu.' });
  }
};


exports.updateProfileImage = async (req, res) => {
    console.log("Yüklenen dosya:", req.file); // BAK!
  const {id} = req.params

  if(!req.file){
    return res.status(400).json({error:"dosya yüklenemedi"})
  }
  try {
    const user= await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    user.profileImage = req.file.filename;
    await user.save()

    res.status(200).json({
      message:"PROFİL FOTOĞRAFI GÜNCELLENDİ",
      profileImage:user.profileImage,
    });
  } catch(error) {
    res.status(500).json({error:"Bir Hata oluştu"})
  }
}

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu" });
  }
};


exports.changePassword = async (req, res) => {
  const {id} = req.params;
  const {currentPassword, newPassword} = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({error:"kullanıcı bulunamadı"})
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if(!isMatch){
      return status(400).json({error:"eski şifre yanlış"})
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save()
    res.status(200).json({message:"şifre başarıyla değiştirildi"})
  } catch (error) {
    res.status(500).json({error:"şifre değiştirilemedi"})
  }
}

