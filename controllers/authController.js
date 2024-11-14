import ResidentUserService from "../services/residentUserService.js";

export const registerResident = async (req, res) => {
    try {
        const residentData = req.body;
        const newResident = await ResidentUserService.registerResidentUser(
            residentData.residentId,
            residentData.username,
            residentData.email,
            residentData.password
        );
        res.status(201).json({ message: 'Usuario registrado exitosamente', resident: newResident });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al registrar el usuario' });
    }
};

export const loginResident = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, resident } = await ResidentUserService.loginResidentUser(email, password);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token, resident });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al iniciar sesión' });
    }
};