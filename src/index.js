const express = require("express");
const sequelize = require("./db/Config");
const PORT = 3000;

const ServicoRoute = require("./routes/ServicoRoute");
const ParceiroRoute = require("./routes/ParceiroRoute");
const VendaRoute = require("./routes/VendaRoute");
const FiltroRoute = require("./routes/FiltroRoute");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const connect = async () =>{
    try{
        await sequelize.authenticate();
        console.log("Conectado, otário");
    }catch(err){
        console.log(err);
    }
}

connect();

app.use("/servico", ServicoRoute);
app.use("/parceiro", ParceiroRoute);
app.use("/vendas", VendaRoute);
app.use("/filtros", FiltroRoute);

app.listen(PORT, ()=>{
    console.log("App rodando na porta " + PORT);
})

