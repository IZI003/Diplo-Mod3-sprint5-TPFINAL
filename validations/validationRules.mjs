import { body } from 'express-validator';
import PaisRepository from '../repositories/PaisRepository.mjs';

export const registerValidationRules = () => [
    body('nombre')
        .notEmpty().withMessage('El nombre del país es requerido')
        .trim()
        .escape()
        .isLength({ min: 3, max: 90 }).withMessage('La longitud del nombre del país debe estar entre 3 y 90 caracteres')
        .custom(async (value, { req }) => {//queremos validar si existe un pais con ese nombre
            // Buscar país con ese nombre
            const existe = await PaisRepository.buscarPornombre(value);

            // ⚠️ Si estoy creando, no debe existir ninguno
            if (!req.params.id && existe) {
                throw new Error(`Ya existe un país con el nombre "${value}"`);
            }

            // ⚠️ Si estoy actualizando, permito el mismo nombre SOLO si es el mismo país
            if (req.params.id && existe && existe._id.toString() !== req.params.id) {
                throw new Error(`Ya existe otro país con el nombre "${value}"`);
            }

            return true;
        }),

    body('capital')
        .optional()
        .custom((value) => {
            if (!value) return true;
            const capitales = value.split(',').map(c => c.trim());
            capitales.forEach(c => {
                if (c.length < 3 || c.length > 90) {
                    throw new Error(`Cada capital debe tener entre 3 y 90 caracteres. "${c}" no es válido`);
                }
            });
            return true;
        }),

    body('fronteras')
        .optional()
        .custom((value) => {
            if (!value) return true;
            const fronteras = value.split(',').map(f => f.trim());
            const regex = /^[A-Z]{3}$/;
            fronteras.forEach(f => {
                if (!regex.test(f)) {
                    throw new Error(`Cada frontera debe ser exactamente 3 letras mayúsculas. "${f}" no es válido`);
                }
            });
            return true;
        }),

    body('area')
        .notEmpty().withMessage('El área es requerida')
        .isFloat({ min: 0.01 }).withMessage('El área debe ser un número positivo'),

    body('poblacion')
        .notEmpty().withMessage('La población es requerida')
        .isInt({ min: 1 }).withMessage('La población debe ser un número entero positivo')
];
