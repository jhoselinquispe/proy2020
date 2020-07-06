/**Nombre, precio, descripción, fechaderegistro, fotografía del producto.  */
var mongoose = require('./connect');
var MENUSCHEMA = mongoose.model('menus',{
    Nombre: String,
    Precio: Number,
    Descripcion: String,
    Fecharegistro: Date,
    Fotoproducto: String
});
module.exports = MENUSCHEMA;