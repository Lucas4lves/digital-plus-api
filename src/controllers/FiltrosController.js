const ParceiroModel = require("../models/Parceiro");
const ServicoModel = require("../models/Servico");
const VendaModel = require("../models/Venda");

class FiltrosController
{
    static async teste(req, res)
    {
        let resultado = await VendaModel.findAll({
            where: {
                data_de_criacao: "07/03/2023",
                nb: "123459"
            }
        });

        if(!resultado)
        {
            return res.status(400).json({erro : true})
        }

        return res.status(200).json({result : resultado});

    }

    
}

module.exports = FiltrosController;