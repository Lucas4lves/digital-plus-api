const router = require("express").Router();
const controller = require("../controllers/FiltrosController");

router.get("/teste", controller.teste);

module.exports = router;