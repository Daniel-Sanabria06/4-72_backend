import Usuario from '../models/Usuarios.js'
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

const registrar = async (req, res ) => {
    //Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message})
    }

    try {
       const usuario = new Usuario(req.body);
       usuario.token = generarId();
       const usuarioAlmacenado = await usuario.save();
       res.json(usuarioAlmacenado);
       
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
        const error = new Error("El password es Incorrecto");
        return res.status(403).json({msg: error.message});
    }
}

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
        res.json("Hemos enviado un email con las instrucciones");
    } catch (error) {
        console.log(error);
    };

};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if (tokenValido) {
<<<<<<< HEAD
        res.json({msg: "Token Válido y el Usuario existe"});
    } else {
        const error = new Error ("Token no Válido");
        return res.status(404).json({ msg: error.message});
=======
        res.json("Token válido y el usuario existe")
    } else {
        const error = new Error("Token no Válido");
        return res.status(404).json({msg: error.message});
>>>>>>> 470fd15ca3717326c0a309ca9308242fca273dfb
    }
};

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const usuario = await Usuario.findOne({ token });

    if (usuario) {
        usuario.password = password;
        usuario.token = ''
        await usuario.save()
        try {
            await usuario.save();
            res.json("Password Modificado Correctamente")
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error ("Token no Válido");
        return res.status(404).json({ msg: error.message});
    }

}

<<<<<<< HEAD
export { 
    registrar,
    autenticar, 
    confirmar, 
    olvidePassword, 
    comprobarToken, 
    nuevoPassword,
};
=======
const perfil = async (req, res) => {
    const {usuario} = req

    res.json(usuario)
}

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, perfil };
>>>>>>> 470fd15ca3717326c0a309ca9308242fca273dfb
