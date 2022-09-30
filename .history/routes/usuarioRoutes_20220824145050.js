import express from 'express';
const router = express.Router();
import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword, 
    comprobarToken,
<<<<<<< HEAD
    nuevoPassword
=======
    perfil
>>>>>>> 470fd15ca3717326c0a309ca9308242fca273dfb
} from '../controllers/usuarioController.js'

import CheckAuth from "../Middleware/CheckAtuh.js"

// Autenticación, Registro y Confirmación de usuarios

router.post("/", registrar); //Crea un nuevo usuario 
router.post("/login", autenticar); 
router.get("/confirmar/:token", confirmar); 
router.post("/olvide-password", olvidePassword);
<<<<<<< HEAD
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);


=======
router.get("/olvide-password/:token", comprobarToken);

router.get("/perfil", CheckAuth, perfil)
>>>>>>> 470fd15ca3717326c0a309ca9308242fca273dfb

export default router;
