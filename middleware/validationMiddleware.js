import { check, validationResult } from "express-validator";

export const validateResident = [
    check('nombre').notEmpty().withMessage('El nombre es requerido'),
    check('idDepartamento').isInt().withMessage('El ID de departamento debe ser un número entero'),
    check('numRegistro').notEmpty().withMessage('El número de registro es requerido'),
    check('identificacion').notEmpty().withMessage('La identificación es requerida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateDepartmentId = [
    check("departmentId").isInt().withMessage("El ID de departamento debe ser un número entero"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];
