const router = require("express").Router();
const controller = require("../controllers/ParceiroController");

router.post("/cadastro", controller.cadastro);
router.get("/todos", controller.getAll);
router.delete("/deletar/:id", controller.deletar);

module.exports = router;