const router = require("express").Router();
const controller = require("../controllers/ParceiroController");

router.post("/cadastro", controller.cadastro);
router.get("/todos", controller.getAll);

module.exports = router;