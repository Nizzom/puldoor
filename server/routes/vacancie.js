const router = require("express").Router()
const vacancieController = require("../controllers/vacancieController")
const { add } = require("../middlewares/validators/vacancieValidator");

router.post("/add",add, vacancieController.add)

module.exports = router