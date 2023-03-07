const adminModel = require("../models/Admin");
const bcrypt = require("bcrypt")
class AdminController
{
    static async cadastro(req, res)
    {
        await adminModel.sync();
        var {email,senha} = req.body

        if(!email){
          return res.status(400).json({erro:true})
        }
        if(!senha){
          return res.status(400).json({erro:true})
        }

        //bcrypt
        const hash = await bcrypt.hash(senha,10)
        senha = hash


        try{
          var admin = await adminModel.create({
            email,
            senha
          })
        }catch(err){
          return res.status(400).json({erro:true,mensagem:"Não foi possível cadastrar esse usuário"})
        }

        return res.status(201).json({created:admin})
      
    }

    static async login(req,res){
      const {input_email,senha} = req.body
      if(!input_email){
        return res.status(400).json({erro:true,mensagem:"preencha todos os campos"})
      }
      if(!senha){
        return res.status(400).json({erro:true,mensagem:"preencha todos os campos"})
      }
      let result = await adminModel.findOne({email:input_email})
      return res.status(200).json({result:result})
      
    }
}

module.exports = AdminController;