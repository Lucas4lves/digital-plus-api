const router = require("express").Router();
const controller = require("../controllers/FiltrosController");

router.post("/parceiro", controller.vendasPorParceiro);
router.post("/dia", controller.vendasPorDia);
router.post("/mes", controller.vendasPorMes);
router.get("/totalDia", controller.totalDeVendasDia);

module.exports = router;