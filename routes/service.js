var express = require('express');
var router = express.Router();
var CLIENTE = require('../database/cliente');
var RESTAURANT = require('../database/restaurant');
var MENUS = require('../database/menu');
var ORDEN = require('../database/orden');
const e = require('express');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
      "mns" :   "Conexion a Servicios Completa"
  });
});

/* SERVICIOS PARA RESTAURANTS */
router.post('/restaurant',(req,res,next)=>{
  var datosREST = req.body;
  var restaurantDB = new RESTAURANT(datosREST);
  restaurantDB.save((errors,docs)=>{
    if(errors){
      var errors = errors.errors;
      var key = Object.keys(errors);
      var msn = {};
      for (var i=0;i<key.length;i++){
        msn[key[i]] = errors[key[i]].message;
      }
      res.status(500).json(msn);
      return;
    }
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
  var datosREST = req.body;
  var menusDB = new MENUS (datosREST);
  menusDB.save((errors,docs)=>{
    if(errors){
      var errors = errors.errors;
      var key = Object.keys(errors);
      var msn = {};
      for (var i=0;i<key.length;i++){
        msn[key[i]] = errors[key[i]].message;
      }     
      res.status(500).json(msn);
      return;
    }
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
  var datosREST = req.body;
  var ordenDB = new ORDEN(datosREST);
  ordenDB.save((errors,docs)=>{
    if(errors){
      var errors = errors.errors;
      var key = Object.keys(errors);
      var msn = {};
      for (var i=0;i<key.length;i++){
        msn[key[i]] = errors[key[i]].message;
          }
      res.status(500).json(msn); 
      return;
    }
    res.status(200).json({"msn" : "Orden registrada correctamente..!!"});
  });
});
router.get('/orden',(req,res,next)=>{
  ORDEN.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
});


router.post('/cliente',(req, res, next)=>{
    var datosREST = req.body;
    var clienteDB = new CLIENTE(datosREST);
    clienteDB.save((errors,docs)=>{
      if(errors){
        var errors = errors.errors;
        var key = Object.keys(errors);
        var msn = {};
        for (var i=0;i<key.length;i++){
          msn[key[i]] = errors[key[i]].message;
        }
        res.status(500).json(msn);
        return;
      }      
      res.status(200).json({"msn" : "Cliente registrada correctamente..!!"});
    });
});
router.get('/cliente',(req,res,next)=>{
  CLIENTE.find({},(err,docs)=>{
    res.status(200).json(docs);
  });
});
module.exports = router;
