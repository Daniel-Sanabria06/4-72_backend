import express from 'express'
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
} from '../controllers/proyectoContoller.js'
import CheckAuth from '../Middleware/CheckAtuh.js'
const router = express.Router()

router.route("/")
    .get(CheckAuth, obtenerProyectos)
    .post(CheckAuth, nuevoProyecto)

router.route("/:id")
    .get(CheckAuth, obtenerProyecto)
    .put(editarProyecto)
    .delete(CheckAuth, eliminarProyecto)

router.get('/tareas/:id', CheckAuth, obtenerTareas)
router.post('/agregar-colaborador', CheckAuth, agregarColaborador)
router.post('/eliminar-colaborador', CheckAuth, eliminarColaborador)

export default router;