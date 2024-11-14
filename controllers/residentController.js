import express from "express";
import { check, validationResult } from 'express-validator';
import residentService from "../services/residentService.js";

const router = express.Router();

// Middleware de validación para residente
const validateResident = [
    check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
    check('idDepartamento').isInt().withMessage('ID de departamento debe ser un número entero'),
    check('numRegistro').not().isEmpty().withMessage('El número de registro es requerido'),
    check('identificacion').not().isEmpty().withMessage('La identificación es requerida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Obtener todos los residentes
router.get("/residents", async (req, res) => {
    try {
        const residents = await residentService.getAllResidents();
        res.json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un residente por su ID
router.get("/residents/:id", async (req, res) => {
    try {
        const resident = await residentService.getResidentById(req.params.id);
        if (!resident) {
            return res.status(404).json({ error: "Residente no encontrado" });
        }
        res.json(resident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo residente con validación
router.post("/residents", validateResident, async (req, res) => {
    try {
        const newResident = await residentService.createResident(req.body);
        res.status(201).json(newResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un residente existente
router.put("/residents/:id", validateResident, async (req, res) => {
    try {
        const updatedResident = await residentService.updateResident(req.params.id, req.body);
        if (!updatedResident) {
            return res.status(404).json({ error: "Residente no encontrado" });
        }
        res.json(updatedResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un residente
router.delete("/residents/:id", async (req, res) => {
    try {
        const deletedResident = await residentService.deleteResident(req.params.id);
        if (!deletedResident) {
            return res.status(404).json({ error: "Residente no encontrado o ya eliminado" });
        }
        res.json(deletedResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener residentes por ID de departamento con validación
router.get("/residents/department/:departmentId", [
    check("departmentId").isInt().withMessage("El ID de departamento debe ser un número entero"),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const residents = await residentService.findResidentsByDepartment(req.params.departmentId);
        res.json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
