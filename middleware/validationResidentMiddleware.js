import { check, validationResult } from "express-validator";
import moment from 'moment';

export const validateResident = [
    check('name').exists().withMessage('El nombre es requerido').notEmpty().withMessage('El nombre es requerido'),
    check('idApartment').exists().withMessage('El ID del departamento es requerido').notEmpty().withMessage('El ID del departamento es requerido').isInt().withMessage('El ID de departamento debe ser un número entero'),
    check('numRegister').exists().withMessage('El número de registro es requerido').notEmpty().withMessage('El número de registro es requerido'),
    check('identification').exists().withMessage('La identificacion es requerida').notEmpty().withMessage('La identificación es requerida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateUpdatingResident = [
    check('id').exists().withMessage('El ID del residente es requerido').notEmpty().withMessage('El ID del residente es requerido').isInt().withMessage('El ID del residente debe ser un número entero'),
    check('idApartment').optional({ checkFalsy: true }).isInt().withMessage('El ID de departamento debe ser un número entero'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateResidentRegister = [
    check('residentId').exists().withMessage('El ID del residente es requerido').notEmpty().withMessage('El ID del residente es requerido').isInt().withMessage('El ID del residente debe ser un número entero'),
    check('username').exists().withMessage('El nombre de usuario es requerido').notEmpty().withMessage('El nombre de usuario es requerido'),
    check('email').exists().withMessage('El correo electrónico es requerido').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
    check('password').exists().withMessage('La contraseña es requerida').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateResidentLogin = [
    check('email').exists().withMessage('El correo electrónico es requerido').notEmpty().withMessage('El correo electrónico es requerido').isEmail().withMessage('El correo electrónico no es válido'),
    check('password').exists().withMessage('La contraseña es requerida').notEmpty().withMessage('La contraseña es requerida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];