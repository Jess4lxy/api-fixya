import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config(); // cargando variables de entorno

const SECRET_KEY = process.env.SECRET_KEY;

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // obteniendo el token de autorizacion

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, se requiere autenticación' });
    }

    try {
        // verificacion del token
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // adjuntando los datos del usuario al request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};
