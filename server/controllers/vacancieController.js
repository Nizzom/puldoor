const router = require("express").Router();
const Vacancie = require("../../models/Vacancie");
const { check, validationResult } = require("express-validator");

//Vacancie
exports.getAll = async (req, res) => {
  try {
    const { categorie, city } = req.body;
    const vacancies = await Vacancie.find({
      categorie,
      city,
      status: { $ne: 0 },
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getOne =  async (req, res) => {
  try {
    const { id } = req.params;
    const vacancie = await Vacancie.findById({ id });
    res.status(200).json(vacancie);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.add = async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Noto'g'ri Malumotlar",
        });
      }
      const vacancie = new Vacancie({ ...req.body });
      await vacancie.save();
      res.status(200).json({ id: vacancie._id });
    } catch (err) {
      res.status(500).json(err);
    }
  }

router.put("/update", async (req, res) => {
  try {
    const { id, status } = req.body;
    const vacancie = await Vacancie.findById({ id });
    await vacancie.set({
      status,
    });
    res.status(200).json({ id });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/my/all", async (req, res) => {
  try {
    const { id } = req.body;
    const vacancies = await Vacancie.find({
      user: id,
      status: { $ne: 0 },
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/my/single", async (req, res) => {
  try {
    const { id } = req.body;
    const vacancies = await Vacancie.findById({ id });
    res.status(200).json(vacancies);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/search", async (req, res) => {
  try {
    const { categorie, city, text } = req.body;
    const vacancies = await Vacancie.find({
      $text: { $search: text },
      categorie,
      city,
      status: { $ne: 0 },
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/web/search", async (req, res) => {
  try {
    const { text } = req.body;
    const vacancies = await Vacancie.find({
      $text: { $search: text },
      status: { $ne: 0 },
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/web/all", async (req, res) => {
  try {
    const vacancies = await Vacancie.find({
      status: { $ne: 0 },
    }).sort({ status: 1 });
    res.status(200).json(vacancies);
  } catch (err) {
    res.status(500).json(err);
  }
});

