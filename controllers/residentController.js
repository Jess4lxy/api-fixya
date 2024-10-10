import express from "express";
import { check, validationResult } from 'express-validator';
import residentService from "../services/residentService.js";
import Resident from "../models/resident.js";

const router = express.Router();

// Middleware de validación para residente
const validateResident = [
    check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
    check('email').isEmail().withMessage('El email debe ser válido'),
    check('numeroContacto').isNumeric().withMessage('El número de contacto debe ser numérico'),
    check('numeroDepartamento').not().isEmpty().withMessage('El número de departamento es requerido'),
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
        const { nombre, email, numeroContacto, numeroDepartamento, historialSolicitudes } = req.body;
        const newResident = new Resident(null, nombre, email, numeroContacto, numeroDepartamento, historialSolicitudes);
        const addedResident = await residentService.addResident(newResident);
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

// Obtener residentes por número de departamento con validación
router.get("/residents/department/:departmentNumber", [
    check("departmentNumber")
        .matches(/^[a-zA-Z0-9]+$/).withMessage("El número de departamento debe contener solo letras y números"),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const residents = await residentService.findResidentsByDepartment(req.params.departmentNumber);
        res.json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;