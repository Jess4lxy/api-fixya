import express from 'express';
import { registerResident, loginResident } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerResident);
router.post('/login', loginResident);

export default router;
