import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { config } from 'dotenv';

config(); // cargando variables de entorno como SECRET_KEY

const secretKey = process.env.SECRET_KEY;

// controlando la autenticacion
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // verificando si el usuario existe
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // verificando la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // creando el payload para el token
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
            // recuerda modificar los datos dependiendo de lo creado en users
        }

        // generando el token
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        // respondiendo con el token
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// apartado para controlar el registro de usuarios
export const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        // verificando si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if(existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

        // encriptando la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // creando y guardando el nuevo usuario
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });
        await newUser.save();

        res.json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
