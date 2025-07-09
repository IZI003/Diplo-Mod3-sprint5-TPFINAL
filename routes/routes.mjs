import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    insertarSuperHeroeController,
    eliminarSuperHeroeIdController,
    eliminarSuperHeroeNombreController,
    actualizarSuperHeroeController,

    formAgregarHeroController,
    formActualizarHeroeController,
    confirmarEliminacionController,
    dashboardController

} from '../controllers/superHeroController.mjs';
import { registerValidationRules } from '../validations/validationRules.mjs';
import { handleValidationErrors } from '../error_middle/errorMiddleware.mjs'
const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

router.post('/heroes/insertar', registerValidationRules(), handleValidationErrors, insertarSuperHeroeController);
router.put('/heroes/actualizar/:id', registerValidationRules(), handleValidationErrors, actualizarSuperHeroeController)

router.delete('/heroes/eliminar/id/:id', eliminarSuperHeroeIdController)
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperHeroeNombreController);

// Formularios
router.get('/formAgregarHero', formAgregarHeroController);
router.get('/formEditarHero/:id', formActualizarHeroeController);
router.get('/confirmarEliminar/:id', confirmarEliminacionController);
router.get('/dashboard', dashboardController);



export default router;