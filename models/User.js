const { Schema, model } = require("mongoose");

const schema = new Schema({
  date: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  lastName: { type: String },
  city: { type: String, required: true },
  bornDate: { type: Date },
  type: { type: String },
  categorie: { type: Number },
  companyName: { type: String },
  companyDesc: { type: String },
  code: {type: Number},
  imgUrl: {type: String}
});

module.exports = model("User", schema);
