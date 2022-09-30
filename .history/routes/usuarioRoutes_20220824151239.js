import express from 'express';
const router = express.Router();
import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword, 
    comprobarToken
} from '../controllers/usuarioController.js'

import CheckAuth from "../Middleware/CheckAtuh.js"

// Autenticación, Registro y Confirmación de usuarios

router.post("/", registrar); //Crea un nuevo usuario 
router.post("/login", autenticar); 
router.get("/confirmar/:token", confirmar); 
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

export default router;
