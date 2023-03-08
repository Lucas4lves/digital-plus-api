const express = require("express");
const controller = require("../controllers/ServicoController")

const router = express.Router();

router.post("/cadastro", controller.cadastro);
router.get("/todos", controller.getAll);
router.delete("/deletar/:query", controller.deletar);

module.exports = router;

