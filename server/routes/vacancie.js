const router = require("express").Router();
const vacancieController = require("../controllers/vacancieController");
const { add } = require("../middlewares/validators/vacancieValidator");

router.post("/add", add, vacancieController.add);
router.post("/get-all", vacancieController.getAll);
router.get("/get-one/:id", vacancieController.getOne);
router.put("/update/:id", vacancieController.update);
router.get("/my-all/:id", vacancieController.myAll);
router.get("/my-single/:id", vacancieController.mySingle);
router.post("/search", vacancieController.search);
router.post("/web-search", vacancieController.webSearch);
router.get("/web-all", vacancieController.webAll);

module.exports = router;