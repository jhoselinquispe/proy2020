// Nombre, Nit, Propietario, Calle, Telefono, Log, Lat, Logo, fechaderegistro, fotolugar
var mongoose = require('./connect');
var RESTAURANTSCHEMA = mongoose.model('restaurant',{
    Nombre: String,
    Nit: Number,
    Propietario: String,
    Calle: String,
    Telefono: String,
    Log: String,
    Lat: String,
    Logo: String,
    Fecharegistro: Date,
    Fotolugar: String
});
module.exports = RESTAURANTSCHEMA;

