import { validationResult } from 'express-validator';

export const validateResult = (redirectPath) => {
    return (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Convertimos el array de errores en un objeto clave:valor
            const extractedErrors = {};
            errors.array().forEach(err => {
                extractedErrors[err.path] = err.msg; // usar path en vez de param
            });

            console.log("Errores de validación:", extractedErrors);

            if (req.params.id) {
                url = `${redirectPath}/${req.params.id}`;
            }
            // Si es vista → devolvemos al formulario
            return res.render(redirectPath, {
                errores: extractedErrors, // 👈 acá pasa como objeto
                info: req.body            // 👈 para rellenar los campos
            });

            /*
            return res.status(400).json({
                errors: extractedErrors
            });*/
        }

        next();
    }
};

