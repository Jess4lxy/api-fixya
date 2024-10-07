import express from "express";
import { check, validationResult } from 'express-validator';
import serviceService from "../services/serviceService.js";
import Service from "../models/service.js";

const router = express.Router();

// Obtener todos los servicios
router.get("/services", async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo servicio con validación
router.post("/services", 
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
        check('descripcion').not().isEmpty().withMessage('La descripción es requerida'),
        check('costoBase').isFloat({ gt: 0 }).withMessage('El costo base debe ser un número mayor que 0')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { nombre, descripcion, costoBase } = req.body;
            const newService = new Service(null, nombre, descripcion, costoBase);
            const addedService = await serviceService.addService(newService);
            res.status(201).json(addedService);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar un servicio
router.put("/services/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedService = await serviceService.updateService(id, updatedData);
        res.json(updatedService);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar un servicio
router.delete("/services/:id", async (req, res) => {
    try {
        const result = await serviceService.deleteService(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Exportar las rutas
export default router;
