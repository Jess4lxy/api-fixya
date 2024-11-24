import { check, validationResult } from "express-validator";
import moment from 'moment';

export const validateApartmentId = [
    check("idApartment").exists().withMessage('El ID del departamento es requerido').notEmpty().withMessage('El ID del departamento es requerido').isInt().withMessage("El ID de departamento debe ser un número entero"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateApartment = [
    check("apartmentNumber").exists().withMessage('El número de departamento es requerido').notEmpty().withMessage('El número de departamento es requerido'),
    check("floor").exists().withMessage('El piso es requerido').notEmpty().withMessage('El piso es requerido').isInt().withMessage('El piso debe ser un número entero'),
    check("squareMeters").exists().withMessage('El área es requerida').notEmpty().withMessage('El área es requerida').isDecimal().withMessage('El área debe ser un número decimal'),
    check("bathroomsNumber").exists().withMessage('El número de baños es requerido').notEmpty().withMessage('El número de baños es requerido').isInt().withMessage('El número de baños debe ser un número entero'),
    check("roomsNumber").exists().withMessage('El número de cuartos es requerido').notEmpty().withMessage('El número de cuartos es requerido').isInt().withMessage('El número de cuartos debe ser un número entero'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateCreateApartment = [
    check("apartmentNumber")
        .exists().withMessage('El número de departamento es requerido')
        .notEmpty().withMessage('El número de departamento no puede estar vacío'),
    check("floor")
        .exists().withMessage('El piso es requerido')
        .notEmpty().withMessage('El piso no puede estar vacío')
        .isInt().withMessage('El piso debe ser un número entero'),
    check("squareMeters")
        .exists().withMessage('El área es requerida')
        .notEmpty().withMessage('El área no puede estar vacía')
        .isDecimal().withMessage('El área debe ser un número decimal'),
    check("bathroomsNumber")
        .exists().withMessage('El número de baños es requerido')
        .notEmpty().withMessage('El número de baños no puede estar vacío')
        .isInt().withMessage('El número de baños debe ser un número entero'),
    check("roomsNumber")
        .exists().withMessage('El número de cuartos es requerido')
        .notEmpty().withMessage('El número de cuartos no puede estar vacío')
        .isInt().withMessage('El número de cuartos debe ser un número entero'),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdateApartment = [
    param('id')
        .exists().withMessage('El ID del apartamento es requerido')
        .notEmpty().withMessage('El ID del apartamento no puede estar vacío')
        .isMongoId().withMessage('El ID del apartamento debe ser un ID válido de MongoDB'),
    check("apartmentNumber")
        .optional({ checkFalsy: true })
        .notEmpty().withMessage('El número de departamento no puede estar vacío'),
    check("floor")
        .optional({ checkFalsy: true })
        .isInt().withMessage('El piso debe ser un número entero'),
    check("squareMeters")
        .optional({ checkFalsy: true })
        .isDecimal().withMessage('El área debe ser un número decimal'),
    check("bathroomsNumber")
        .optional({ checkFalsy: true })
        .isInt().withMessage('El número de baños debe ser un número entero'),
    check("roomsNumber")
        .optional({ checkFalsy: true })
        .isInt().withMessage('El número de cuartos debe ser un número entero'),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateDeleteApartmentById = [
    param('id')
        .exists().withMessage('El ID del apartamento es requerido')
        .notEmpty().withMessage('El ID del apartamento no puede estar vacío')
        .isMongoId().withMessage('El ID del apartamento debe ser un ID válido de MongoDB'),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];