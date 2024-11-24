import { check, validationResult } from "express-validator";
import moment from 'moment';

export const validateRequest = [
    check("residentUserId").exists().withMessage("El ID del usuario residente es requerido").notEmpty().withMessage("El ID del usuario residente es requerido").isInt().withMessage("El ID del usuario residente debe ser un número entero"),
    check("serviceId").exists().withMessage("El ID del servicio es requerido").notEmpty().withMessage("El ID del servicio es requerido").isInt().withMessage("El ID del servicio debe ser un número entero"),
    check("quantity").exists().withMessage("La cantidad de servicios solicitados es requerida").notEmpty().withMessage("La cantidad de servicios solicitados es requerida").isInt().withMessage("La cantidad de servicios solicitados debe ser un número entero"),
    check("totalPrice").exists().withMessage("El precio total del servicio es requerido").notEmpty().withMessage("El precio total del servicio es requerido").isDecimal().withMessage("El precio total del servicio debe ser un número decimal"),
    check("requestDate").exists().withMessage("La fecha de solicitud del servicio es requerida").notEmpty().withMessage("La fecha de solicitud del servicio es requerida")
    .custom((value) => {
        if (!moment(value, "DD/MM/YY", true).isValid()) {
            throw new Error("La fecha de solicitud del servicio debe tener el formato dd/mm/yy");
        }
        return true;
    }),
    check("scheduledDate").exists().withMessage("La fecha programada del servicio es requerida").notEmpty().withMessage("La fecha programada del servicio es requerida")
    .custom((value) => {
        if (!moment(value, "DD/MM/YY", true).isValid()) {
            throw new Error("La fecha programada del servicio debe tener el formato dd/mm/yy");
        }
        return true;
    }),
    check("status").exists().withMessage("El status del servicio es requerido").notEmpty().withMessage("El status del servicio es requerido")
        .isIn(["Pendiente", "Aceptada", "Rechazada", "En Proceso", "Completa"]).withMessage("El status del servicio debe ser uno de los valores permitidos: Pendiente, Aceptada, Rechazada, En Proceso, Completa"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdatingRequest = [
    check("id").exists().withMessage("El ID de la solicitud es requerida").notEmpty().withMessage("El ID de la solicitud es requerida").isInt().withMessage("El ID de la solicitud debe ser un número entero"),
    check("residentUserId").optional({ checkFalsy: true }).isInt().withMessage("El ID del usuario residente debe ser un número entero"),
    check("serviceId").optional({ checkFalsy: true }).isInt().withMessage("El ID del servicio debe ser un número entero"),
    check("quantity").optional({ checkFalsy: true }).isInt().withMessage("La cantidad de servicios solicitados debe ser un número entero"),
    check("totalPrice").optional({ checkFalsy: true }).isDecimal().withMessage("El precio total del servicio debe ser un número decimal"),
    check("requestDate").optional({ checkFalsy: true })
    .custom((value) => {
        if (!moment(value, "DD/MM/YY", true).isValid()) {
            throw new Error("La fecha de solicitud del servicio debe tener el formato dd/mm/yy");
        }
        return true;
    }),
    check("scheduledDate").optional({ checkFalsy: true })
    .custom((value) => {
        if (!moment(value, "DD/MM/YY", true).isValid()) {
            throw new Error("La fecha programada del servicio debe tener el formato dd/mm/yy");
        }
        return true;
    }),
    check("status").optional({ checkFalsy: true })
        .isIn(["Pendiente", "Aceptada", "Rechazada", "En Proceso", "Completa"]).withMessage("El status del servicio debe ser uno de los valores permitidos: Pendiente, Aceptada, Rechazada, En Proceso, Completa"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];