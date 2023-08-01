import express from 'express';
const router = express.Router();
//TODO: quitar los //
import { 
    registrar,
    autenticar,
    obtener,
  //  confirmar,
    // olvidePassword, 
    comprobarToken,
  //  nuevoPassword,
    perfil
} from '../controllers/usuarioController.js'

import CheckAuth from "../Middleware/CheckAtuh.js"

// Autenticación, Registro y Confirmación de usuarios
//TODO:quitar los //

router.post("/", registrar); //Crea un nuevo usuario 
router.post("/login", autenticar); 
router.get("/EkM8pokjdsfiojsdijfiosnahyugysffa", obtener); 
//router.post("/olvide-password", olvidePassword);
//router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)
router.get("/perfil", CheckAuth, perfil)

export default router;
