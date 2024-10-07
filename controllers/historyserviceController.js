import express from "express";
import { check, validationResult } from 'express-validator';
import historyService from "../services/historyserviceService.js"; // Cambiar a "historyserviceService.js"
import HistoryService from "../models/historyService.js";

const router = express.Router();

// Obtener todos los servicios
router.get("/historialServicios", async (req, res) => {
    try {
        const servicios = await historyService.getAllServices();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo servicio con validación
router.post("/historialServicios", 
    [
        check('proveedorId').not().isEmpty().withMessage('El proveedor ID es requerido'),
        check('solicitudId').not().isEmpty().withMessage('El solicitud ID es requerido'),
        check('fechaFinalizacion').isISO8601().withMessage('La fecha debe ser válida'),
        check('comentarios').not().isEmpty().withMessage('Los comentarios son requeridos')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { proveedorId, solicitudId, fechaFinalizacion, comentarios } = req.body;
            const newService = new HistoryService(null, proveedorId, solicitudId, fechaFinalizacion, comentarios);
            const addedService = await historyService.addService(newService);
            res.status(201).json(addedService);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar un servicio
router.put("/historialServicios/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedService = await historyService.updateService(id, updatedData);
        res.json(updatedService);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar un servicio
router.delete("/historialServicios/:id", async (req, res) => {
    try {
        const result = await historyService.deleteService(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
