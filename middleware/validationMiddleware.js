import { check, validationResult } from "express-validator";

export const validateResident = [
    check('name').notEmpty().withMessage('El nombre es requerido'),
    check('idApartment').notEmpty().withMessage('El ID del departamento es requerido').isInt().withMessage('El ID de departamento debe ser un número entero'),
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

export const validateResidentRegister = [
    check('residentId').notEmpty().withMessage('El ID del residente es requerido').isInt().withMessage('El ID del residente debe ser un número entero'),
    check('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    check('email').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
    check('password').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];