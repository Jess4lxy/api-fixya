import express from 'express';
import { createProveedor, getProveedores, updateProveedor, deleteProveedor } from '../controllers/proveedorController.js';

const router = express.Router();

router.post('/proveedores', createProveedor);
router.get('/proveedores', getProveedores);
router.put('/proveedores/:id', updateProveedor);
router.delete('/proveedores/:id', deleteProveedor);

export default router;
