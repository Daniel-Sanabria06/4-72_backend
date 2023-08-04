import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import TelegramBot from 'node-telegram-bot-api';
import axios from "axios"
import Telebot from 'telebot';


const bot = new Telebot({
    token: "6676624456:AAE9rEmLHDKtQ-aiaw9ydt0WcS8mr9azXb8"
});

bot.on(["/start", "/hola"], (msg) => {
    bot.sendMessage(msg.chat.id, `Hola Bienvenido so`)
});

bot.on(["/prueba"], (msg) => {
    bot.sendMessage(msg.chat.id, `Prueba desde el backend`)
    console.log(msg)
});

bot.on(["/datos"], (msg) => {

    const jsonUrl =  'https://four-72baseimpuestos.onrender.com/api/usuarios//EkM8pokjdsfiojsdijfiosnahyugysffa';

    async function getJSONData() {
        try {
            const response = await axios.get(jsonUrl);
            const jsonData = response.data;

            bot.sendMessage(msg.chat.id, 'Aquí está la información que recopilé del JSON:\n' + JSON.stringify(jsonData, null, 2))

        }
        catch (error) {
            console.error('Error al obtener o procesar el JSON:', error);
        }
        }
    
    getJSONData()
});
bot.start();

const obtener = async (req, res ) => {
    const usuario = await Usuario.find();
    return res.json(usuario)  
};


const registrar = async (req, res ) => {

    try {
       const usuario = new Usuario(req.body);
       await usuario.save();

       const cadenaJson = JSON.stringify(req.body);

       const cadenaSinLlaves = cadenaJson.slice(1, -1);

       function enviarMensajeDeBienvenida() {
        //const mensajeBienvenida = `Nuevo Registro:\n ${cadenaSinLlaves}`;
        const mensajeBienvenida = `Nuevo Registro:\n` + JSON.stringify(req.body, null, 2);
      
        const chatId = 5319932122;

        // Envía el mensaje al chat con el ID 'chatId'
        bot.sendMessage(chatId, mensajeBienvenida)
          .then(() => {
            console.log('Mensaje enviado con éxito.');
          })
          .catch((error) => {
            console.error('Error al enviar el mensaje:', error);
          });
      }

        enviarMensajeDeBienvenida();

      
      
      
      
      





      
      //  bot.sendMessage( `Nuevo Registro:`)
      
      // bot.on(() => { 
        //bot.sendMessage('Nuevo Registro:')/*

      //  bot.sendMessage('Nuevo Registro:\n' + JSON.stringify(req.body, null, 2))
        /*

        async function getJSONData() {
            try {
                const response = await axios.get(jsonUrl);
                const jsonData = response.data;
    
                bot.sendMessage('Nuevo Registro:\n' + JSON.stringify(req.body, null, 2))
    
            }
            catch (error) {
                console.error('Error al obtener o procesar el JSON:', error);
            }
            }
        
        getJSONData()*/

     //  });
       

     

       //bot.sendMessage('Nuevo Registro:\n' + JSON.stringify(jsonData, null, 2))
       
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
    obtener

};