import express from "express";
import { check, validationResult } from "express-validator";
import invoiceService from "../services/invoiceService.js";

const router = express.Router();

// Obtener todas las facturas
router.get("/invoices", async (req, res) => {
    try {
        const invoices = await invoiceService.getAllInvoices();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva factura con validaciones
router.post("/invoices", [
    check("monto").isFloat({ gt: 0 }).withMessage("El monto debe ser un número positivo"),
    check("fechaEmision").isISO8601().withMessage("Debe ser una fecha válida"),
    check("proveedorId").custom(async (proveedorId) => {
        const proveedor = await proveedorService.findById(proveedorId);
        if (!proveedor) {
            throw new Error("El proveedor no existe.");
        }
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { monto, fechaEmision, proveedorId, solicitudId } = req.body;
        const newInvoice = { monto, fechaEmision, proveedorId, solicitudId };
        const createdInvoice = await invoiceService.addInvoice(newInvoice);
        res.status(201).json(createdInvoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar factura
router.delete("/invoices/:id", async (req, res) => {
    try {
        await invoiceService.deleteInvoice(req.params.id);
        res.json({ message: "Factura eliminada correctamente" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
