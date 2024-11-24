import { check, validationResult } from "express-validator";
import moment from 'moment';

export const validateService = [
    check("category").exists().withMessage('La categoría del servicio es requerido').notEmpty().withMessage('La categoría del servicio es requerido'),
    check("serviceType").exists().withMessage('El tipo de servicio es requerido').notEmpty().withMessage('El tipo de servicio es requerido'),
    check("description").exists().withMessage('La descripción del servicio es requerida').notEmpty().withMessage('La descripción del servicio es requerida'),
    check("basePrice").exists().withMessage('El precio base del servicio es requerido').notEmpty().withMessage('El precio base del servicio es requerido').isDecimal().withMessage('El precio base del servicio debe ser decimal'),
    check("quantityAdjustment").exists().withMessage('La confirmación de aumento por cantidad es requerida').notEmpty().withMessage('La confirmación de aumento por cantidad es requerida').isBoolean().withMessage('La confirmación de aumento por cantidad debe ser boolean'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateUpdatingService = [
    check("id").exists().withMessage('El id del servicio es requerido').notEmpty().withMessage('El id del servicio es requerido').isInt().withMessage('El id del servicio debe ser un número entero'),
    check("basePrice").optional({ checkFalsy: true }).isDecimal().withMessage('El precio base del servicio debe ser decimal'),
    check("quantityAdjustment").optional({ checkFalsy: true }).isBoolean().withMessage('La confirmación de aumento por cantidad debe ser boolean'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateCreateService = [
    check("category")
        .exists().withMessage("La categoría del servicio es requerida")
        .notEmpty().withMessage("La categoría del servicio no puede estar vacía"),
    check("serviceType")
        .exists().withMessage("El tipo de servicio es requerido")
        .notEmpty().withMessage("El tipo de servicio no puede estar vacío"),
    check("description")
        .exists().withMessage("La descripción del servicio es requerida")
        .notEmpty().withMessage("La descripción del servicio no puede estar vacía"),
    check("basePrice")
        .exists().withMessage("El precio base del servicio es requerido")
        .notEmpty().withMessage("El precio base del servicio no puede estar vacío")
        .isDecimal().withMessage("El precio base del servicio debe ser un número decimal"),
    check("quantityAdjustment")
        .exists().withMessage("La confirmación de aumento por cantidad es requerida")
        .notEmpty().withMessage("La confirmación de aumento por cantidad no puede estar vacía")
        .isBoolean().withMessage("La confirmación de aumento por cantidad debe ser un valor booleano"),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateGetServiceById = [
    param("id")
        .exists().withMessage("El ID del servicio es requerido")
        .notEmpty().withMessage("El ID del servicio no puede estar vacío")
        .isInt().withMessage("El ID del servicio debe ser un número entero"),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateDeleteServiceById = [
    param("id")
        .exists().withMessage("El ID del servicio es requerido")
        .notEmpty().withMessage("El ID del servicio no puede estar vacío")
        .isInt().withMessage("El ID del servicio debe ser un número entero"),
    // Middleware para manejar los errores de validación
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];