import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res ) => {

    try {
       const usuario = new Usuario(req.body);
       await usuario.save();

       
       //TODO: poner esto en el mensaje: , Revisa tu Email para Confirmar tu Cuenta

    res.json({ msg: 'Validando...'});
       
    } catch (error) {
        console.log(error);
    }
};


const autenticar = async (req, res) => {
    const { email, password } = req.body;
    
    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario){
      const error = new Error ("El Usuario no existe");
      return res.status(404).json({ msg: error.message})
    };

    //Comprobar si el usuario esta confirmado
    if (!usuario.confirmado){
        const error = new Error ("Tu cuenta no ha sido registrada");
        return res.status(403).json({ msg: error.message})
      };

    //Comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        });
    } else {
        const error = new Error("La contraseña es Incorrecta");
        return res.status(403).json({msg: error.message});
    }
}
{/*
const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("Token no Válido");
        return res.status(403).json({msg: error.message});
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "",
        await usuarioConfirmar.save();
        res.json({ msg: "Usuario Confirmado Correctamente"});
    } catch (error) {
        console.log(error);
    }

}

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario){
      const error = new Error ("El Usuario no existe");
      return res.status(404).json({ msg: error.message});
    };

    try {
        usuario.token = generarId();
        await usuario.save();

        //Enviar Email

        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
           })


        res.json({ msg: "Hemos enviado un email con las instrucciones"});
    } catch (error) {
        console.log(error);
    };

};
*/}
const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if (tokenValido) {
        res.json({ msg: "Token válido y el Usuario existe"})
    } else {
        const error = new Error("Token no Válido");
        return res.status(404).json({msg: error.message});
    }
}
{/*
const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ token });
    if (usuario) {
        usuario.password = password
        usuario.token = ''
        try {
            await usuario.save()
            res.json({ msg: "password Modificado Correctamente"})
        } catch (error) {
            console.log(error)
        }
        
    } else {
        const error = new Error("Token no Válido");
        return res.status(404).json({msg: error.message});
    }
}
*/}
const perfil = async (req,res) => {
    const { usuario } = req
    res.json(usuario)
}
//TODO: quitar los //
export { registrar, 
    autenticar, 
  //  confirmar, 
  //  olvidePassword,
    comprobarToken, 
   // nuevoPassword,
    perfil,
    registrarCedula

};