import { body } from 'express-validator';

export const registerValidationRules = () => [
    body('nombreSuperHeroe')
        .notEmpty().withMessage('El nombre de superheroe es requerido')
        .trim()
        .escape()
        .isLength({ min: 3, max: 60 }).withMessage('La longitud del nombre de superheroe debe estar entre 3 y 60 caracteres'),
    body('nombreReal')
        .notEmpty().withMessage('El nombre real es requerido')
        .trim()
        .escape()
        .isLength({ min: 3, max: 60 }).withMessage('La longitud del nombre real debe estar entre 3 y 60 caracteres'),
    body('edad')
        .exists().withMessage('La edad es requerida')
        .isInt({ min: 0 }).withMessage('La edad debe ser un entero no negativo')
        .trim().escape()
    //recibimos string y no array desde la plantilla html
    /*body('poderes')
        .exists({ checkFalsy: true }).withMessage('El array debe existir')
        .isArray({ min: 1 }).withMessage('En poderes debe existir al menos un elemento'),
    body('poderes.*')
        .notEmpty().withMessage('El nombre de poder es requerido')
        .isString().withMessage('Los poderes deben describirse en String')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del poder debe tener entre 3 y 60 caracteres')
        .trim()
        .escape()*/
];