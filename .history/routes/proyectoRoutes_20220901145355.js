import express from 'express'
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
} from '../controllers/proyectoContoller.js'
import CheckAuth from '../Middleware/CheckAtuh.js'
const router = express.Router()

router.route("/")
    .get(CheckAuth, obtenerProyectos)
    .post(CheckAuth, nuevoProyecto)

router.route("/:id")
    .get(CheckAuth, obtenerProyecto)
    .put(CheckAuth, editarProyecto)
    .delete(CheckAuth, eliminarProyecto)

router.post('/agregar-colaborador/:id', CheckAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id', CheckAuth, eliminarColaborador)

export default router;