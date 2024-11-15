import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
    // Verificar si existe el encabezado de autorización
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Acceso denegado. Se requiere un token de autorización con el formato "Bearer <token>".'
        });
    }

    // Extraer el token del encabezado
    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // Relacionando los datos del usuario con la request
        next(); // Continuar al siguiente middleware o ruta
    } catch (error) {
        // Verificación de tokens expirados
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expirado. Inicia sesión nuevamente para obtener un nuevo token.'
            });
        }

        // Manejo de errores genéricos de JWT
        res.status(401).json({ message: 'Token inválido o no autorizado.' });
    }
};
