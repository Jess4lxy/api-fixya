import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(); // cargando variables de entorno

const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
    // verificar si existe un encabezado de autorizacion
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado, no se encuentra un token de autorización.' });
    }

    // extraer el token del encabezado
    const token = authHeader.split(' ')[1];

    try {
        // verificar el token
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // relacionando los datos del usuario con la request
        next();
    } catch (error) {
        // verificacion de tokens expirados
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado, inicia sesión nuevamente' });
        }
        res.status(401).json({ message: 'Token inválido.' });
    }
};
