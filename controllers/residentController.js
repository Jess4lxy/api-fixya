import express from "express";
import { check, validationResult } from 'express-validator';
import residentService from "../services/residentService.js";
import Resident from "../models/resident.js";

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

// Crear un nuevo residente con validación
router.post("/residents", validateResident, async (req, res) => {
    try {
        const { idDepartamento, numRegistro, identificacion, nombre } = req.body;
        const newResident = new Resident(null, idDepartamento, numRegistro, identificacion, nombre);
        const addedResident = await residentService.createResident(newResident);
        res.status(201).json(addedResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un residente
router.put("/residents/:id", validateResident, async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedResident = await residentService.updateResident(id, updatedData);
        res.json(updatedResident);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar un residente
router.delete("/residents/:id", async (req, res) => {
    try {
        const result = await residentService.deleteResident(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
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
