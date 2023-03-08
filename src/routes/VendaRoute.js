const router = require("express").Router();
const controller = require("../controllers/VendasController")

router.post("/cadastro", controller.cadastro);
router.get("/todos", controller.getAllVendas);
router.delete("/deletar/:id", controller.deletar);


module.exports = router;