const router = require("express").Router();
const userController = require("../controllers/userController");
const { register, verify } = require("../middlewares/validators/userValidator");

//Route for registration
router.post("/add", register, userController.register);
router.post("/verify", verify, userController.verify);
router.post("/code", userController.code);
router.put("/update/:id", userController.update);
router.post("/img/:id", userController.addImg);
router.get("/get/:id", userController.employer);

module.exports = router;
