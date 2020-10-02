var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var CLIENTE = require('../database/cliente');
var RESTAURANT = require('../database/restaurant');
var MENUS = require('../database/menu');
var ORDEN = require('../database/orden');
const e = require('express');
const { DocumentProvider } = require('mongoose');
const { update } = require('../database/orden');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
      msn :   "Conexion a Servicios Completa"
  });
});

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
    res.status(200).json ({msn:"Usuario Registrado"});
  });
});
router.get('/restaurant',(req, res, next)=> {
  var params = req.query;
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
  });
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
/* SERVICIOS PARA MENUS */
router.post('/menus',(req,res,next)=>{
  var datosREST = req.body;
  var menusDB = new MENUS (datosREST);
  menusDB.save((err,docs)=>{
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
    res.status(200).json({
      "msn" : "Menu Registrado con exito...>!!!"
    });
  });
});
router.get('/menus',(req, res, next)=> {
  var params = req.query;
  var filter = {};
  var select = {};
  var aux = {};
  var order = {};
  if(params.nombre != null){
    var expresion = new RegExp(params.nombre);
    filter["Nombre"] = expresion;
  };
  if(params.filters != null){
    var select = params.filters.toString().replace(/,/g," ");
  };
  if(params.preciogt != null){
    var gt = parseInt(params.preciogt);
    aux["$gt"] = gt;
  };
  if(params.preciolt != null){
    var lt = parseInt(params.preciolt);
    aux["$lt"] = lt;
  };
  if(aux != {}){
    filter["Precio"] = aux;
    //console.log(filter);
  };
  if(params.order != null){
    var data = params.order.split(",");
    var number = parseInt(data[1]);
    order[data[0]] = number;
  };
  MENUS.find(filter).select(select).sort(order).exec((err,docs)=>{
    if (err){
      res.status(500).json({msn : "Error en el servidor."});
      return;
    };
    res.status(200).json({docs});
    return;
  });
});
router.put('/menus',(req,res,next)=>{
  var params = req.query;
  var datos = req.body;
  if(params.id == null){
    res.status(300).json({msn:"El parametro id es Necesario."});
    return;
  };
  var keylist = ["Nombre","Precio","Descripcion","Fotoproducto"];
  var keys = Object.keys(datos);
  var updateobjectdata = {};
  for (var i=0;i<keys.length;i++){
    if(keylist.indexOf(keys[i])>-1){
      updateobjectdata[keys[i]] = datos[keys[i]];
    }
  }
  MENUS.updateOne({_id: params.id}, {$set: updateobjectdata},(err,docs)=>{
    if(err){
      res.status(300).json({msn:"Existen problemas en la base de datos."});
      return;
    }
    res.status(200).json(docs);
    return;
  });
});
router.delete('/menus',(req, res, next)=>{ 
  var params = req.query;
  if(params.id==null){
    res.status(300).json({msn: "El parametro ID es necesario para eliminar"});
    return;
  }
  MENUS.remove({_id: params.id}, (err,docs)=>{
    if(err){
      res.status(500).json({msn: "Existen problemas en la BASE DE DATOS..."});
      console.log(params.id);
      return;
    }
    res.status(200).json(docs);
  });
});
/* SERVICIOS PARA ORDENES */
router.post('/orden',(req,res,next)=>{
  var datosREST = req.body;
  var ordenDB = new ORDEN(datosREST);
  ordenDB.save((err,docs)=>{
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
    res.status(200).json({"msn" : "Orden registrada correctamente..!!"});
  });
});
router.get('/orden',(req, res, next)=> {
  var params = req.query;
  var filter = {};
  var select = {};
  var order = {};
  if(params.cantidad != null){
    var expresion = parseInt(params.cantidad);
    filter["Cantidad"] = expresion;
  };
  if(params.pago != null){
    var expresion = parseInt(params.pago);
    filter["Pagototal"] = expresion;
  };
  if(params.lugar != null){
    var expresion = new RegExp(params.lugar);
    filter["Lugardeenvio"] = expresion;
  };
  if(params.filters != null){
    var select = params.filters.toString().replace(/,/g," ");
  };
  if(params.order != null){
    var data = params.order.split(",");
    var number = parseInt(data[1]);
    order[data[0]] = number;
  };
  ORDEN.find(filter).select(select).sort(order).exec((err,docs)=>{
    if (err){
      res.status(500).json({msn : "Error en el servidor."});
      return;
    };
    res.status(200).json({docs});
    return;
  });
});
router.put('/orden',(req,res,next)=>{
  var params = req.query;
  var datos = req.body;
  if(params.id == null){
    res.status(300).json({msn:"El parametro id es Necesario."});
    return;
  };
  var keylist = ["Cantidad","Lugardeenvio"];
  var keys = Object.keys(datos);
  var updateobjectdata = {};
  for (var i=0;i<keys.length;i++){
    if(keylist.indexOf(keys[i])>-1){
      updateobjectdata[keys[i]] = datos[keys[i]];
    }
  }
  ORDEN.updateOne({_id: params.id}, {$set: updateobjectdata},(err,docs)=>{
    if(err){
      res.status(300).json({msn:"Existen problemas en la base de datos."});
      return;
    }
    res.status(200).json(docs);
    return;
  });
});
router.delete('/orden',(req, res, next)=>{ 
  var params = req.query;
  if(params.id==null){
    res.status(300).json({msn: "El parametro ID es necesario para eliminar"});
    return;
  }
  ORDEN.remove({_id: params.id}, (err,docs)=>{
    if(err){
      res.status(500).json({msn: "Existen problemas en la BASE DE DATOS..."});
      console.log(params.id);
      return;
    }
    res.status(200).json(docs);
  });
});
//SERVICIOS PARA CLIENTES
router.post('/cliente',(req, res, next)=>{
    var datosREST = req.body;
    if(datosREST.Password == null){
      res.status(300).json({msn : "El Password es necesario"});
      return;
    }
    if (!/[\w]+/.test(datosREST.Password)){
      res.status(300).json({msn : "Es necesario tener letras en su Password"});
      return;
    }
    if (!/[A-Z]+/.test(datosREST.Password)){
      res.status(300).json({msn : "Es Necesario 1 Mayuscula en su Password"});
      return;
    }
    if (!/[\@\#\!\$\%\^\&\*\(\)\_\+\-\=\]\[\{\}\;\:\'\"\/\?\.\>\,\<]+/.test(datosREST.Password)){
      res.status(300).json({msn : "Es necesario un simbolo para su Password."});
      return;
    }
    console.log(datosREST.Password);
    datosREST.Password= sha1(datosREST.Password);
    console.log(datosREST.Password);
    console.log(datosREST);
    var clienteDB = new CLIENTE(datosREST);
    clienteDB.save((err,docs)=>{
      if(err){
        var errors = err.errors;
        var key = Object.keys(errors);
        var msn = {};
        for (var i=0;i<key.length;i++){
          msn[key[i]] = errors[key[i]].message;
        }
        res.status(500).json(docs);
        return;
      }      
      res.status(200).json({"msn" : "Cliente registrada correctamente..!!"});
    });
});
router.get('/cliente',(req, res, next)=> {
  var params = req.query;
  var filter = {};
  var select = {};
  var aux = {};
  var order = {};
  if(params.nombre != null){
    var expresion = new RegExp(params.nombre);
    filter["Nombre"] = expresion;
    console.log(filter);
  };
  if(params.apellido != null){
    var expresion = new RegExp(params.apellido);
    filter["Apellido"] = expresion;
    console.log(filter);
  };
  if(params.edad != null){
    var expresion = parseInt(params.edad);
    filter["Edad"] = expresion;
    console.log(filter);
  };
  if(params.ci != null){
    var expresion = new RegExp(params.ci);
    filter["Ci"] = expresion;
  };
  if(params.filters != null){
    var select = params.filters.toString().replace(/,/g," ");
  };
  if(params.edadgt != null){
    var gt = parseInt(params.edadgt);
    aux["$gt"] = gt;
  };
  if(params.edadlt != null){
    var lt = parseInt(params.edadlt);
    aux["$lt"] = lt;
  };
  if(aux != {}){
    filter["Edad"] = aux;
    //console.log(filter);
  };
  if(params.order != null){
    var data = params.order.split(",");
    var number = parseInt(data[1]);
    order[data[0]] = number;
  };
  CLIENTE.find(filter).select(select).sort(order).exec((err,docs)=>{
    if (err){
      res.status(500).json({msn : "Error en el servidor."});
      return;
    };
    res.status(200).json({docs});
    return;
  });
});
router.put('/cliente',(req,res,next)=>{
  var params = req.query;
  var datos = req.body;
  if(params.id == null){
    res.status(300).json({msn:"El parametro id es Necesario."});
    return;
  };
  var keylist = ["Nombre","Apellido","Edad"];
  var keys = Object.keys(datos);
  var updateobjectdata = {};
  for (var i=0;i<keys.length;i++){
    if(keylist.indexOf(keys[i])>-1){
      updateobjectdata[keys[i]] = datos[keys[i]];
    }
  }
  CLIENTE.updateOne({_id: params.id}, {$set: updateobjectdata},(err,docs)=>{
    if(err){
      res.status(300).json({msn:"Existen problemas en la base de datos."});
      return;
    }
    res.status(200).json(docs);
    return;
  });
});
router.delete('/cliente',(req, res, next)=>{ 
  var params = req.query;
  if(params.id==null){
    res.status(300).json({msn: "El parametro ID es necesario para eliminar"});
    return;
  }
  CLIENTE.remove({_id: params.id}, (err,docs)=>{
    if(err){
      res.status(500).json({msn: "Existen problemas en la BASE DE DATOS..."});
      console.log(params.id);
      return;
    }
    res.status(200).json(docs);
  });
});
//SERVICIO PARA LOGIN
router.post('/login', async (req,res)=>{
  var params = req.body;
  //console.log(body);
  if(params.Correo==""){
    res.status(200).json({msn : "El Correo es Necesario para logear"});
    return;
  }
  if(params.Password==""){
    res.status(200).json({msn : "Es necesario introducir su password"});
    return;
  }
  var result = await CLIENTE.find({Correo : params.Correo, Password : sha1(params.Password)});
  if(result.length == 1){
    res.status(200).json({msn:"Bienvenido al Sistema"});
    return;
  } else {
    res.status(200).json({msn:"Credenciales incorrectas"});
  }
});
module.exports = router;