const router = require("express").Router();
const controller = require("../controllers/adminController");

router.post("/cadastro", controller.cadastro);
router.post("/login", controller.login);


module.exports = router;