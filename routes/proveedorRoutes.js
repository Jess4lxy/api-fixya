import express from 'express';
import { createProveedor, getProveedores, updateProveedor, deleteProveedor } from '../controllers/proveedorController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/proveedores', authMiddleware, createProveedor);
router.get('/proveedores', authMiddleware, getProveedores);
router.put('/proveedores/:id', authMiddleware, updateProveedor);
router.delete('/proveedores/:id', authMiddleware, deleteProveedor);

export default router;
