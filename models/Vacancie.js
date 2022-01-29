const { Schema, model } = require("mongoose");

const schema = new Schema({
  date: { type: Date, default: Date.now },
  status: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  positionName: { type: String, required: true },
  categorie: { type: Number, required: true },
  budget: { type: Number, required: true },
  desc: { type: String, required: true },
  city: { type: String },
  private: { type: String },
  imgUrl: {type: String},
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
schema.index({ "$**": "text" });

module.exports = model("Vacancie", schema);
