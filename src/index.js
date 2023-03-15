const express = require("express");
const cors = require("cors")
const sequelize = require("./db/Config");
const PORT = 3000;
const app = express();

app.use(express.urlencoded({extended: true}))
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors())
    next()
})

const ServicoRoute = require("./routes/ServicoRoute");
const ParceiroRoute = require("./routes/ParceiroRoute");
const AdminRoute = require("./routes/AdminRoute");
const Admin = require("./models/Admin");
const VendaRoute = require("./routes/VendaRoute");
const FiltroRoute = require("./routes/FiltroRoute");


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
app.use("/admin", AdminRoute)
app.use("/vendas", VendaRoute);
app.use("/filtros", FiltroRoute);

app.listen(PORT, ()=>{
    console.log("App rodando na porta " + PORT);
})

