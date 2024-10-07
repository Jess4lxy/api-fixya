import express from "express";
import { check, validationResult } from 'express-validator';
import proveedorService from "../services/proveedorService.js";
import Proveedor from "../models/proveedor.js";

const router = express.Router();

// Obtener todos los proveedores
router.get("/proveedores", async (req, res) => {
    try {
        const proveedores = await proveedorService.getAllProveedores();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo proveedor con validación
router.post("/proveedores", 
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
        check('servicioOfrecido').not().isEmpty().withMessage('El servicio ofrecido es requerido'),
        check('calificacion').isFloat({ min: 0, max: 5 }).withMessage('La calificación debe ser entre 0 y 5'),
        check('informacionContacto.email').isEmail().withMessage('El email debe ser válido'),
        check('informacionContacto.telefono').isNumeric().withMessage('El teléfono debe ser numérico')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { nombre, servicioOfrecido, certificaciones, calificacion, informacionContacto } = req.body;
            const newProveedor = new Proveedor(null, nombre, servicioOfrecido, certificaciones, calificacion, informacionContacto);
            const addedProveedor = await proveedorService.addProveedor(newProveedor);
            res.status(201).json(addedProveedor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar un proveedor
router.put("/proveedores/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedProveedor = await proveedorService.updateProveedor(id, updatedData);
        res.json(updatedProveedor);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar un proveedor
router.delete("/proveedores/:id", async (req, res) => {
    try {
        const result = await proveedorService.deleteProveedor(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
