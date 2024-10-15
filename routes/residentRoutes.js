import express from 'express';
import {createResident, getResidents, updateResident, deleteResident, getResidentFromDepNumb} from '../controllers/residentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/residents', authMiddleware, createResident);
router.get('/residents', authMiddleware, getResidents);
router.put('/residents/:id', authMiddleware, updateResident);
router.delete('/residents/:id', authMiddleware, deleteResident);
router.get('/residents/department/:departmentNumber', authMiddleware, getResidentFromDepNumb);

export default router;
