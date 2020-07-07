var mongoose = require('./connect');
var CLIENTESCHEMA = mongoose.model('cliente',{
    Nombre : {
        type: String,
        required: [true, "EL Nombre es necesario"],
    },
    Apellido : {
        type: String,
        required: [true, "El Apellido es Requerido"],
    },
    Edad : {
        type: Number,
        required: [true, "La edad es necesaria"],
    },
    Fecharegistro: {
        type: Date,  // Sera puesta por el servidor de manera automatica.
        default: new Date
    },
    Ci: {
        type: String,
        required: [true, "EL CI o NIT son requeridos"],
        message: props => `${props.value} El CI o NIT son requeridos para su factura.`
    },
    Correo : {
        type: String,
        required: [true, "El correo es necesario"],
        validate: {
            validator: (value) =>{
                //Expresion regular
                return /^[\w\.]+@[\w\.]+\.\w{3,3}$/.test(value);
            },
            message: props => `${props.value} no es valido`
        }
    },
    Password : {
        type: String,
        required: [true, "El Password es necesario"],
        min: [6, "Debe contener minimo 6 caracteres"],
        validate: {
            validator: (value)=>{
                if (!/[\w]+/.test(value)){
                    return false;
                }
                if (!/[A-Z]+/.test(value)){
                    return false;
                }
                if (!/[\@\#\!\$\%\^\&\*\(\)\_\+\-\=\]\[\{\}\;\:\'\"\/\?\.\>\,\<]+/.test(value)){
                    return false;
                }
                return true;
            },
            message: props => `${props.value} Es necesario 1 MAYUSCULA y 1 caracter especial (!@#$%*...) como minimo para su Password.)`
        }
    },
    Roles : {
        type: Array,
        default: []
    }
});
module.exports = CLIENTESCHEMA;