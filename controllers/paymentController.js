import express from "express";
import { check, validationResult } from "express-validator";
import paymentService from "../services/paymentService.js";
import facturaService from "../services/invoiceService.js";

const router = express.Router();

// Obtener todos los pagos
router.get("/payments", async (req, res) => {
    try {
        const payments = await paymentService.getAllPayments();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo pago con validaciones
router.post("/payments", [
    check("monto").isFloat({ gt: 0 }).withMessage("El monto debe ser un número positivo"),
    check("fechaPago").isISO8601().withMessage("Debe ser una fecha válida"),
    check("facturaId").custom(async (facturaId) => {
        const factura = await facturaService.findById(facturaId);
        if (!factura) {
            throw new Error("La factura no existe.");
        }
    }),
    check("facturaId").custom(async (facturaId, { req }) => {
        const pagos = await paymentService.findByFacturaId(facturaId);
        if (pagos.length > 0) {
            throw new Error("Ya existe un pago registrado para esta factura.");
        }
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { monto, fechaPago, metodo, facturaId } = req.body;
        const factura = await facturaService.findById(facturaId);
        if (monto > factura.monto) {
            return res.status(400).json({ error: "El monto del pago no puede ser mayor al de la factura." });
        }

        const newPayment = { monto, fechaPago, metodo, facturaId };
        const createdPayment = await paymentService.addPayment(newPayment);
        res.status(201).json(createdPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar pago con validaciones
router.put("/payments/:id", [
    check("id").isNumeric().withMessage("El ID debe ser un número"), // Validación del ID
    check("monto").isFloat({ gt: 0 }).withMessage("El monto debe ser un número positivo"),
    check("fechaPago").isISO8601().withMessage("Debe ser una fecha válida")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedPayment = await paymentService.updatePayment(req.params.id, req.body);
        res.json(updatedPayment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar pago con validación
router.delete("/payments/:id", [
    check("id").isNumeric().withMessage("El ID debe ser un número") // Validación del ID
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await paymentService.deletePayment(req.params.id);
        res.json({ message: "Pago eliminado correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
