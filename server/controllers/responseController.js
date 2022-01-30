const Vacancie = require("../../models/Vacancie");
const Response = require("../../models/Response");
const User = require("../../models/User");

//Response
exports.add = async (req, res) => {
  try {
    const { user_id, vacancie_id, message } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        message: "User topilmadi!!",
      });
    }
    const vacancie = await Vacancie.findById(vacancie_id);
    if (!vacancie) {
      return res.status(400).json({
        message: "Vacancie topilmadi!!",
      });
    }
    const response = new Response({
      message,
      name: user.name,
      lastName: user.lastName,
      bornDate: user.bornDate,
      phone: user.phone,
      city: user.city,
      imgUrl: user.imgUrl,
      companyName: vacancie.companyName,
      private: vacancie.private ? vacancie.private : null,
      companyCity: vacancie.city,
      budget: vacancie.budget,
      positionName: vacancie.positionName,
      companyImgUrl: vacancie.imgUrl,
      user: user._id,
      vacancie: vacancie._id,
    });
    await response.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const responses = await Response.find({
      user: id,
    }).sort({ status: 1 });
    res.status(200).json(responses);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getOneByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Response.findById(id);
    const vacancie = await Vacancie.findById(response.vacancie);
    res.status(200).json({ response, vacancie });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getByVacancie = async (req, res) => {
  try {
    const { id } = req.params;
    const responses = await Response.find({
      vacancie: id,
    }).sort({ status: 1 });
    res.status(200).json(responses);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getOneByVacancie = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Response.findById(id);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
