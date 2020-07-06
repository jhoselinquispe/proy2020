var mongoose = require('./connect');
var ORDENSCHEMA = mongoose.model('orden',{
    /*idmenu[], idrestorant[], cantidad[], idcliente, lugardeenvio(lat, long), pagototal */
    Idmenu:Number,
    Idrestaurant:Number,
    Cantidad:Number,
    Idcliente:Number,
    Lugardeenvio:Array,
    Pagototal:Number
});
module.exports=ORDENSCHEMA;