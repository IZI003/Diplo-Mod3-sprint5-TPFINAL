import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.param,
                message: error.msg
            }))
        });
    }

    next();
}

// Para formularios HTML que requieren redirección
export const handleValidationErrorsRedirect = (redirectPath) => {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const erroresStr = encodeURIComponent(JSON.stringify(
                errors.array().map(error => ({
                    field: error.param,
                    message: error.msg
                }))
            ));
            return res.redirect(`${redirectPath}?errores=${erroresStr}`);
        }
        next();
    };
};
