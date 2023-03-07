const express = require("express");
const sequelize = require("./db/Config");
const PORT = 3000;

const ServicoRoute = require("./routes/ServicoRoute");
const ParceiroRoute = require("./routes/ParceiroRoute");
<<<<<<< HEAD
const AdminRoute = require("./routes/AdminRoute");
const Admin = require("./models/Admin");
=======
const VendaRoute = require("./routes/VendaRoute");
const FiltroRoute = require("./routes/FiltroRoute");
>>>>>>> 17eddbd0018c689225349134352cb7752279e73a

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
<<<<<<< HEAD
app.use("/admin", AdminRoute)
=======
app.use("/vendas", VendaRoute);
app.use("/filtros", FiltroRoute);

>>>>>>> 17eddbd0018c689225349134352cb7752279e73a
app.listen(PORT, ()=>{
    console.log("App rodando na porta " + PORT);
})

