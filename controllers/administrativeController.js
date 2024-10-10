import express from "express";
import { check, validationResult } from "express-validator";
import administrativeService from "../services/administrativeService.js";

const router = express.Router();

// Middleware de validación para administrador
const validateAdministrative = [
    check("nombre").notEmpty().withMessage("El nombre es requerido"),
    check("email").isEmail().withMessage("Debe ser un email válido"),
    check("rol").notEmpty().withMessage("El rol es requerido"),
    check("email").custom(async (email) => {
        const exists = await administrativeService.findByEmail(email);
        if (exists) {
            throw new Error("Ya existe un administrador con ese email.");
        }
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Obtener todos los administradores
router.get("/administrators", async (req, res) => {
    try {
        const admins = await administrativeService.getAllAdministratives();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un administrador por ID con validación
router.get("/administrators/:id", [
    check("id").isNumeric().withMessage("El ID debe ser un número"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
], async (req, res) => {
    try {
        const admin = await administrativeService.getAdministrativeById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado" });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo administrador con validación
router.post("/administrators", validateAdministrative, async (req, res) => {
    try {
        const { nombre, email, rol, fechaIngreso } = req.body;
        const newAdmin = { nombre, email, rol, fechaIngreso };
        const createdAdmin = await administrativeService.addAdministrative(newAdmin);
        res.status(201).json(createdAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un administrador con validación
router.put("/administrators/:id", validateAdministrative, async (req, res) => {
    try {
        const updatedAdmin = await administrativeService.updateAdministrative(req.params.id, req.body);
        res.json(updatedAdmin);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar un administrador
router.delete("/administrators/:id", async (req, res) => {
    try {
        await administrativeService.deleteAdministrative(req.params.id);
        res.json({ message: "Administrador eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
