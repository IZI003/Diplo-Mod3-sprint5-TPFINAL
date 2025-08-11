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
    dashboardController,
    aboutController,
    busquedaController

} from '../controllers/superHeroController.mjs';
import { registerValidationRules } from '../validations/validationRules.mjs';
import { handleValidationErrors, handleValidationErrorsRedirect } from '../error_middle/errorMiddleware.mjs'
const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', handleValidationErrorsRedirect('/busquedaHeroes'), buscarSuperheroesPorAtributoController);

//router.post('/heroes/insertar', registerValidationRules(), handleValidationErrors, insertarSuperHeroeController);
router.put('/heroes/actualizar/:id', registerValidationRules(), handleValidationErrors, actualizarSuperHeroeController)

router.delete('/heroes/eliminar/id/:id', eliminarSuperHeroeIdController)
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperHeroeNombreController);

// Formularios
router.get('/formAgregarHero', formAgregarHeroController);
router.get('/formEditarHero/:id', formActualizarHeroeController);
router.get('/confirmarEliminar/:id', confirmarEliminacionController);
router.get('/dashboard', dashboardController);
router.get('/', dashboardController);
router.get('/about', aboutController);
router.get('/busquedaHeroes', busquedaController);


// Rutas API
router.post('/heroes/insertar', registerValidationRules(), handleValidationErrorsRedirect('/formAgregarHero'), insertarSuperHeroeController);



export default router;