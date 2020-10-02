var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var CLIENTE = require('../database/cliente');
var fileUpload = require('express-fileupload');
var MENUS = require('../database/menu');
var RESTAURANT = require('../database/restaurant');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
      msn :   "Conexion a Servicios Completa"
  });
});
//SERVICIO PARA LOGIN
router.post('/login', async (req,res)=>{
  var params = req.body;
  if(params.Correo==null){
    res.status(300).json({msn : "El Correo es Necesario para logear"});
    return;
  }
  if(params.Password==null){
    res.status(300).json({msn : "Es necesario introducir su password"});
    return;
  }
  var result = await CLIENTE.find({Correo: params.Correo, Password: sha1(params.Password)});
  if(result.length == 1){
    res.status(200).json({msn:"Bienvenido al Sistema "});
    return;
  }
  res.status(300).json({msn:"Credenciales incorrectas"});
});

//SERVICIO PARA GUARDAR IMAGEN PRUEBA
router.use(fileUpload({
 limits: { fileSize: 50 * 1024 * 1024 }
}));

router.post('/imgmenu',(req,res)=>{
var imagen = req.files.image;
var path = __dirname.replace(/\/routes/g,("/img"));
var date = new Date();
var sign =  sha1(date.toString().substr(1,5));
var pathMenu = path + "/" + sign + "_" + imagen.name.replace(/\s/g,"_");
var obj = {};
imagen.mv(pathMenu, async (err) =>{
  if(err){
    return res.status(300).send({msn : "Error al subir la iamgen al servidor."})
  }
  obj['Fotoproducto'] = pathMenu.toString();
  var menusDB = await new MENUS (obj);
  menusDB.save().then((err,docs)=>{
    if(err){
      res.status(500).json({msn: "ERROR EN LA BASE DE DATOS"});
    }
    res.status(200).json({msn: "Imagen de MENU registrado"});
    });
  });
});
router.post('/imglogo',(req,res)=>{
  var imagen = req.files.image;
  var path = __dirname.replace(/\/routes/g,("/imgLogo"));
  var date = new Date();
  var sign =  sha1(date.toString().substr(1,5));
  var pathRestaurant = path + "/" + sign + "_" + imagen.name.replace(/\s/g,"_");
  var obj = {};
  imagen.mv(pathRestaurant, async (err) =>{
    if(err){
      return res.status(300).send({msn : "Error al subir la iamgen al servidor."})
    }
    obj['Logo'] = pathRestaurant.toString();
    var restaurantDB = await new RESTAURANT (obj);
    restaurantDB.save().then((err,docs)=>{
      if(err){
        res.status(500).json({msn: "ERROR EN LA BASE DE DATOS"});
      }
      res.status(200).json({msn: "Imagen de MENU registrado"});
      });
    });
  });
module.exports = router;