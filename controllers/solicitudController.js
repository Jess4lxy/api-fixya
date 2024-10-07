import express from "express";
import { check, validationResult } from 'express-validator';
import solicitudService from "../services/solicitudService.js";
import Solicitud from "../models/solicitud.js";

const router = express.Router();

// Obtener todas las solicitudes
router.get("/solicitudes", async (req, res) => {
    try {
        const solicitudes = await solicitudService.getAllSolicitudes();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva solicitud con validación
router.post("/solicitudes",
    [
        check('descripcion').not().isEmpty().withMessage('La descripción es requerida'),
        check('tipoServicio').not().isEmpty().withMessage('El tipo de servicio es requerido'),
        check('estado').not().isEmpty().withMessage('El tipo de estado es requerido'),
        check('fechaCreacion').not().isEmpty().withMessage('La fechaCreacion es requerido'),
        check('fechaFinalizacion').not().isEmpty().withMessage('La fechaFinalizacion es requerido'),
        check('prioridad').not().isEmpty().withMessage('La prioridad es requerida'),
        check('residenteId').isNumeric().withMessage('El ID del residente debe ser numérico'),
        check('proveedorId').isNumeric().withMessage('El ID del proveedor debe ser numérico'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { descripcion, tipoServicio, estado, fechaCreacion, fechaFinalizacion, prioridad, residenteId, proveedorId } = req.body;
            const newSolicitud = new Solicitud(null, descripcion, tipoServicio, estado, fechaCreacion, fechaFinalizacion, prioridad, residenteId, proveedorId);
            const addedSolicitud = await solicitudService.addSolicitud(newSolicitud);
            res.status(201).json(addedSolicitud);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar una solicitud
router.put("/solicitudes/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedSolicitud = await solicitudService.updateSolicitud(id, updatedData);
        res.json(updatedSolicitud);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar una solicitud
router.delete("/solicitudes/:id", async (req, res) => {
    try {
        const result = await solicitudService.deleteSolicitud(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
