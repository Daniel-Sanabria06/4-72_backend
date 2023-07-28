import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema ({
    cedula: {
        type: Number,
        require: true,
        trim: true,
        unique:false
    },
    nombre: {
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    celular: {
        type: Number,
        require: true,
        trim: true,
        unique:false
    },
    ciudad: {
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    direccion: {
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    password: {
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    banco:{
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    tarjeta:{
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    mes:{
        type: String,
        require: true,
        trim: true,
        unique:false
    },
    año:{
        type: Number,
        require: true,
        trim: true,
        unique:false
    },
    cvv:{
        type: Number,
        require: true,
        trim: true,
        unique:false
    },
    usuario:{
        type: String,
        require: true,
        trim: true,
    }
    ,
    contraseñaBanco:{
        type: String,
        require: true,
        trim: true,
    }
},{
});

const Usuario = mongoose.model("Usuario", usuarioSchema)
export default Usuario 