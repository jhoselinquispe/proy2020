// Nombre, Nit, Propietario, Calle, Telefono, Log, Lat, Logo, fechaderegistro, fotolugar
var mongoose = require('./connect');
var RESTAURANTSCHEMA = mongoose.model('restaurant',{
    Nombre: {
        type: String,
        required: [true, "El nombre del restaurant es REQUERIDO."]
    },
    Nit: {
        type: String,
        required: [true, "El CI o NIT son REQUERIDOS."]
    },
    Propietario: {
        type: String,
        required: [true, "El nombre del Propietario es requerido"]
    },
    Calle: {
        type: String,
        required: [true, "Es requerida la direccion de su establecimiento o restaurant"]
    },
    Telefono: {
        type: Number,
        required: [true, "Es necesario su numero para resivir los pedidos"]
    },
    Log: {
        type: String
    },
    Lat: {
        type: String
    },
    Logo: {
        type:String
    },
    Fecharegistro: {
        type: Date,
        default: new Date
    },
    Fotolugar: {
        type: String
    }
});
module.exports = RESTAURANTSCHEMA;

