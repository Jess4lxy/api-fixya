import { check, validationResult } from "express-validator";

export const validateResident = [
    check('name').notEmpty().withMessage('El nombre es requerido'),
    check('idApartment').isInt().withMessage('El ID de departamento debe ser un número entero'),
    check('numRegister').notEmpty().withMessage('El número de registro es requerido'),
    check('identification').notEmpty().withMessage('La identificación es requerida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateApartmentId = [
    check("idApartment").isInt().withMessage("El ID de departamento debe ser un número entero"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];
