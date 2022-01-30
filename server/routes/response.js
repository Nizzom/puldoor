const router = require("express").Router();
const responseController = require("../controllers/responseController");

//Route for registration
router.post("/add", responseController.add);
router.get("/by-user/:id", responseController.getByUser);
router.get("/one-by-user/:id", responseController.getOneByUser);
router.get("/by-vacancie/:id", responseController.getByVacancie);
router.get("/one-by-vacancie/:id", responseController.getOneByVacancie);

module.exports = router;