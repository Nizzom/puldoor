const { check, validationResult } = require("express-validator");

exports.register = [
  check("name", "Noto'g'ri Ism").isString(),
  check("city", "Noto'g'ri Shahar").isString(),
  check("phone", "Noto'g'ri Telefon raqam").isLength(9),
];
exports.verify =  [check("phone", "Noto'g'ri Telefon raqam").isLength(9)];
