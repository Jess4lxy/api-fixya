import { registerResident, loginResident } from '../services/residentService.js';

export const registerController = async (req, res) => {
    try {
        const residentData = req.body;
        const newResident = await registerResident(residentData);
        res.status(201).json({ message: 'Usuario registrado exitosamente', resident: newResident });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, resident } = await loginResident(email, password);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token, resident });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
