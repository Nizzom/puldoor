const { check } = require("express-validator");

exports.add = [
  check("positionName", "Noto'g'ri Ism").isString(),
  check("categorie", "Noto'g'ri Toyfa").isNumeric(),
  check("budget", "Noto'g'ri Oylik").isNumeric(),
  check("desc", "Noto'g'ri Tavsif").isString(),
];
exports.verify = [check("phone", "Noto'g'ri Telefon raqam").isLength(9)];
