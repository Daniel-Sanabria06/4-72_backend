import Proyecto from '../models/Proyecto.js'

const agregarTarea = async (req, res) => {
    const {proyecto} = req.body

    const existeProyecto = await Proyecto.findById(proyecto)
    console.log(existeProyecto)
}

const obtenerTarea = async (req, res) => {}
const actualizarTarea = async (req, res) => {}
const eliminarTarea = async (req, res) => {}
const cambiarEstado = async (req, res) => {}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}