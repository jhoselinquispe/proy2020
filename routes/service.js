var express = require('express');
var router = express.Router();
var CLIENTE = require('../database/cliente');
var RESTAURANT = require('../database/restaurant');
var MENUS = require('../database/menu');
var ORDEN = require('../database/orden');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
      "mns" :   "Conexion a Servicios Completa"
  });
});

/* SERVICIOS PARA RESTAURANTS */
router.post('/restaurant',(req,res,next)=>{
  var datos = req.body;
  var restaurant = {};
  restaurant["Nombre"] = datos.Nombre;
  restaurant["Nit"] = datos.Nit;
  restaurant["Propietario"] = datos.Propietario;
  restaurant["Calle"] = datos.Calle;
  restaurant["Telefono"] = datos.Telefono;
  restaurant["Log"] = datos.Log;
  restaurant["Lat"] = datos.Lat;
  restaurant["Logo"] = datos.Logo;
  restaurant["Fecharegistro"] = new Date();
  restaurant["Fotolugar"] = datos.Fotolugar;
  var newrestaurant = new RESTAURANT(restaurant);
  newrestaurant.save().then(()=>{
    res.status(200).json ({"msn":"Usuario Registrado"});
  });
});
router.get('/restaurant', function(req, res, next) {
  RESTAURANT.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
});


/* SERVICIOS PARA MENUS */
router.post('/menus',(req,res,next)=>{
  var datos = req.body;
  var menus = {};
  menus["Nombre"] = datos.Nombre;
  menus["Precio"] = datos.Precio;
  menus["Descripcion"] = datos.Descripcion;
  menus["Fecharegistro"] = new Date();
  menus["Fotoproducto"] = datos.Fotoproducto;
  var newmenus = new MENUS (menus);
  newmenus.save().then(()=>{
    res.status(200).json({
      "msn" : "Menu Registrado con exito...>!!!"
    });
  });
});
router.get('/menus',(req,res,next)=>{
  MENUS.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
});

/* SERVICIOS PARA ORDENES */
router.post('/orden',(req,res,next)=>{
  var datos = req.body;
  var Lugardeenvio = datos.Lugardeenvio.split(",");
  var orden = {};
  orden["Idmenu"]=datos.Idmenu;
  orden["Idrestaurant"]=datos.Idrestaurant;
  orden["Cantidad"]=datos.Cantidad;
  orden["Idcliente"]=datos.Idcliente;
  orden["Lugardeenvio"]=Lugardeenvio;
  orden["Pagototal"]=datos.Pagototal;
  var neworden = new ORDEN(orden);
  neworden.save().then(()=>{
    res.status(200).json({"msn" : "Orden registrada correctamente..!!"});
  });
  /*idmenu[], idrestorant[], cantidad[], idcliente, lugardeenvio(lat, long), pagototal */
});
router.get('/orden',(req,res,next)=>{
  ORDEN.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
});


router.post('/cliente',(req, res, next)=>{
    var datos = req.body;
    var cliente = {};
    cliente["Nombre"] = datos.Nombre;
    cliente["Apellido"] = datos.Apellido;
    cliente["Edad"] = datos.Edad;
    cliente["Fecharegistro"] = new Date;
    cliente["Ci"] = datos.Ci;
    cliente["Correo"] = datos.Correo;
    var newcliente = new CLIENTE(cliente);
    newcliente.save().then(()=>{
      res.status(200).json({"msn" : "Cliente registrada correctamente..!!"});
    });
});
router.get('/cliente',(req,res,next)=>{
  CLIENTE.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
});
module.exports = router;
