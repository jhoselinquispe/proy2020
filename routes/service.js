var express = require('express');
var router = express.Router();
var USER = require('../database/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
      "mns" :   "Coneccion a Servicios Completa"
  });
});
router.post('/users',(req, res, next)=>{
    var params = req.body;
    params["date"] = new Date;
    var user = new USER(params);
    user.save().then();
    res.status(200).json(params);
});

module.exports = router;
