import { check, validationResult } from "express-validator";

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
    check('idApartment').isInt().withMessage('El ID de departamento debe ser un número entero'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

export const validateApartmentId = [
    check("idApartment").exists().withMessage('El ID del departamento es requerido').notEmpty().withMessage('El ID del departamento es requerido').isInt().withMessage("El ID de departamento debe ser un número entero"),
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

export const validateUpdatingApartment = [
    check("id").exists().withMessage('El id del departamento es requerido').notEmpty().withMessage('El id del departamento es requerido').isInt().withMessage('El id del departamento debe ser un número entero'),
    check("floor").isInt().withMessage('El piso debe ser un número entero'),
    check("squareMeters").isFloat().withMessage('El área debe ser un número decimal'),
    check("bathroomsNumber").isInt().withMessage('El número de baños debe ser un número entero'),
    check("roomsNumber").isInt().withMessage('El número de cuartos debe ser un número entero'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];

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
    check("basePrice").isDecimal().withMessage('El precio base del servicio debe ser decimal'),
    check("quantityAdjustment").isBoolean().withMessage('La confirmación de aumento por cantidad debe ser boolean'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];