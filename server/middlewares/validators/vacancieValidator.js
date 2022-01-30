const { check } = require("express-validator");

exports.add = [
  check("positionName", "Noto'g'ri Ism").isString(),
  check("categorie", "Noto'g'ri Toyfa").isString(),
  check("budget", "Noto'g'ri Oylik").isNumeric(),
  check("desc", "Noto'g'ri Tavsif").isString(),
  check("id", "Noto'g'ri ID").exists(),
];