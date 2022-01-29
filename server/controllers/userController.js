const User = require("../../models/User");
const path = require("path");
const { check, validationResult } = require("express-validator");

// User
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Noto'g'ri Malumotlar",
      });
    }
    const can = await User.find({ phone: req.body.phone });
    if (can && can.toString()) {
      return res.status(400).json({
        message: "Raqam royhatdan otkan!",
      });
    }
    const user = new User({ ...req.body });
    await user.save();
    res.status(201).json({ id: user._id });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addImg = async (req, res) => {
  try {
    const img = req.files.img;
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User topilmadi!!",
      });
    }

    const extname = path.extname(img.name);
    img.mv(path.join(__dirname, "..", "..", `public/${id}${extname}`));
    const imgUrl = `http://localhost:5000/${id}${extname}`;
    user.set({
      imgUrl: imgUrl,
    });

    await user.save();
    res.status(200).json({ message: "Yangilandi!", imgUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User topilmadi!!",
      });
    }
    user.set({
      ...req.body,
    });

    await user.save();
    res.status(200).json({ message: "Yangilandi!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.verify = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Noto'g'ri Malumotlar",
      });
    }

    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(400).json({
        message: "Registratsiya qiling!",
      });
    }
    const code = Math.floor(1000 + Math.random() * 9000);
    user.code = code;
    await user.save();
    res.status(200).json({ message: "Kod yuborildi!", id: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.code = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(400).json({
        message: "User toqilmadi!",
      });
    }
    if (user.code !== parseInt(req.body.code)) {
      return res.status(400).json({
        message: "Notogri Kod!",
      });
    }
    user.active = true;
    await user.save();
    res.status(200).json({ message: "User tastiqlandi!", user });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.employer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select({
      city: 1,
      companyName: 1,
      companyDesc: 1,
      imgUrl: 1,
    });
    if (!user) {
      return res.status(400).json({
        message: "User toqilmadi!",
      });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
};
