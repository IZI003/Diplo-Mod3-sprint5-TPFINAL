import express from 'express';
import { registerValidationRules } from '../validations/validationRules.mjs';
import { handleValidationErrors, handleValidationErrorsRedirect } from '../error_middle/errorMiddleware.mjs'
import {
    actualizarPaisController,
    buscarPaisPorAtributoController,
    formActualizarPaisController, insertarPaisController,
    obtenerPaisPorIdController,
    obtenerTodosLosPaisesController,

    confirmarEliminacionController,
    dashboardController,
    aboutController,
    formAgregarPaisController,
    busquedaPaisesController,
    insertarPaisAPIController,
    eliminarPaisIdController,
    landingController,
} from '../controllers/paisController.mjs';
import { validateResult } from '../validations/validateResult.mjs';
const router = express.Router();
// Rutas API
router.post('/pais/insertar', registerValidationRules(), validateResult('AgregarPais'), insertarPaisController);
router.post('/pais/insertarApi', registerValidationRules(), insertarPaisAPIController);
router.get('/pais', obtenerTodosLosPaisesController);
router.get('/pais/:id', obtenerPaisPorIdController);
router.get('/pais/buscar/:atributo/:valor', handleValidationErrorsRedirect('/busquedaPais'), buscarPaisPorAtributoController);

router.put('/pais/actualizar/:id', registerValidationRules(), handleValidationErrorsRedirect('/formEditarPais'), actualizarPaisController)

router.delete('/pais/eliminar/id/:id', eliminarPaisIdController)
// Formularios
router.get('/formAgregarPais', formAgregarPaisController);
router.get('/formEditarPais/:id', formActualizarPaisController);
router.get('/confirmarEliminar/:id', confirmarEliminacionController);
router.get('/dashboard', dashboardController);
router.get('/', landingController);
router.get('/about', aboutController);
router.get('/landing', landingController);
router.get('/busquedaPaises', busquedaPaisesController);

export default router;