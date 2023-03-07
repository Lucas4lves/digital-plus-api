const router = require("express").Router();
const controller = require("../controllers/VendasController")

router.post("/cadastro", controller.cadastro);


module.exports = router;