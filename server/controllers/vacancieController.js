const Vacancie = require("../../models/Vacancie");
const User = require("../../models/User");
const { validationResult } = require("express-validator");

//Vacancie
exports.getAll = async (req, res) => {
  try {
    const { categorie, city } = req.body;
    const vacancies = await Vacancie.find({
      categorie,
      city,
      status: { $ne: 0 },
      active: true,
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancie = await Vacancie.findById(id);
    res.status(200).json(vacancie);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};

exports.add = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Noto'g'ri Malumotlar",
      });
    }
    const { id } = req.body;
    const can = await User.findById(id);
    if (!can) {
      return res.status(400).json({
        message: "User topilmadi!!",
      });
    }
    const vacancie = new Vacancie({
      ...req.body,
      user: can._id,
      city: can.city,
      imgUrl: can.imgUrl,
      companyName: can.companyName,
    });
    await vacancie.save();
    res.status(200).json(vacancie);
  } catch (err) {
    res.status(500).json(err);
    console.log(req.originalUrl, "\n", err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancie = await Vacancie.findById(id);
    vacancie.set({
      ...req.body,
    });
    await vacancie.save();
    res.status(200).json(vacancie);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};

exports.myAll = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancies = await Vacancie.find({
      user: id,
      status: { $ne: 0 },
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};

exports.mySingle = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancie = await Vacancie.findById(id);
    res.status(200).json(vacancie);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};

exports.search = async (req, res) => {
  try {
    const { categorie, city, text } = req.body;
    const vacancies = await Vacancie.find({
      $text: { $search: text },
      categorie,
      city,
      status: { $ne: 0 },
      active: true,
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};

exports.webSearch = async (req, res) => {
  try {
    const { text } = req.body;
    const vacancies = await Vacancie.find({
      $text: { $search: text },
      status: { $ne: 0 },
      active: true,
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};

exports.webAll = async (req, res) => {
  try {
    const vacancies = await Vacancie.find({
      status: { $ne: 0 },
      active: true,
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    console.log(req.originalUrl, "\n", err);
    res.status(500).json(err);
  }
};
