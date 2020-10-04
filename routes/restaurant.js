var express = require('express');
var router = express.Router();
var RESTAURANT = require('../database/restaurant');
/* SERVICIOS PARA RESTAURANTS */
router.post('/restaurant',(req,res,next)=>{
    var datosREST = req.body;
    var restaurantDB = new RESTAURANT(datosREST);
    restaurantDB.save((err,docs)=>{
      if(err){
        var errors = err.errors;
        var key = Object.keys(errors);
        var msn = {};
        for (var i=0;i<key.length;i++){
          msn[key[i]] = errors[key[i]].message;
        }
        res.status(500).json(msn);
        return;
      }
      res.status(200).json ({msn:"Restaurant Creado Correctamente"});
    });
  });

  router.get("/restaurant", async(req, res) => {
  /*router.get('/restaurant',(req, res, next)=> {
    /*var params = req.query;
    var filter = {};
    var select = {};
    var order = {};
    if(params.nombre != null){
      var expresion = new RegExp(params.nombre);
      filter["Nombre"] = expresion;
    };
    if(params.nit != null){
      var expresion = new RegExp(params.nit);
      parseInt(expresion);
      filter["Nit"] = expresion;
    };
    if(params.propietario != null){
      var expresion = new RegExp(params.propietario);
      filter["Propietario"] = expresion;
    };
    if(params.filters != null){
      var select = params.filters.toString().replace(/,/g, " ");
    };
    if(params.order != null){
      var data = params.order.split(",");
      var number = parseInt(data[1]);
      order[data[0]] = number;
    };
    RESTAURANT.find(filter).select(select).sort(order).exec((err,docs)=>{
      if (err){
        res.status(500).json({msn : "Error en el servidor."});
        return;
      };
      res.status(200).json({docs});
      return;
    });*/
    var docs = await RESTAURANT.find();
    res.status(200).json(docs);
  });
  router.put('/restaurant',(req,res,next)=>{
    var params = req.query;
    var datos = req.body;
    if(params.id == null){
      res.status(300).json({msn:"El parametro id es Necesario."});
      return;
    };
    var keylist = ["Nombre","Propietario","Calle","Telefono"];
    var keys = Object.keys(datos);
    var updateobjectdata = {};
    for (var i=0;i<keys.length;i++){
      if(keylist.indexOf(keys[i])>-1){
        updateobjectdata[keys[i]] = datos[keys[i]];
      }
    }
    RESTAURANT.updateOne({_id: params.id}, {$set: updateobjectdata},(err,docs)=>{
      if(err){
        res.status(300).json({msn:"Existen problemas en la base de datos."});
        return;
      }
      res.status(200).json(docs);
      return;
    });
  });
  router.delete('/restaurant',(req, res, next)=>{ 
    var params = req.query;
    if(params.id==null){
      res.status(300).json({msn: "El parametro ID es necesario para eliminar"});
      return;
    }
    RESTAURANT.remove({_id: params.id}, (err,docs)=>{
      if(err){
        res.status(500).json({msn: "Existen problemas en la BASE DE DATOS..."});
        console.log(params.id);
        return;
      }
      res.status(200).json(docs);
    });
});
module.exports = router;