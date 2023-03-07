const express = require("express");
const controller = require("../controllers/ServicoController")

const router = express.Router();

router.post("/cadastro", controller.cadastro);
router.get("/todos", controller.getAll);

module.exports = router;

