var mongoose = require('mongoose');
mongoose.connect("mongodb://172.22.0.2:27017/pedidos",{useNewUrlParser: true});
var database = mongoose.connection;
database.on("err",()=>{
    console.log("ERROR no es puede conectar al servidor de Base de DAtos.");
});
database.on("open",()=>{
    console.log("Conexion Exitosa con la BASE DE DATOS.!!");
});
module.exports = database;