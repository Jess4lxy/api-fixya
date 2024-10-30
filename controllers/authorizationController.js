import jwt from 'jsonwebtoken';
import pool from '../data/database'; // Asegúrate de usar la conexión correcta

// Registro de administrador
export const register = async (req, res) => {
    const { nombre, username, correo, contraseña } = req.body;
    try {
        // Verificar si el usuario ya existe
        const [existingAdmin] = await pool.query('SELECT * FROM Administrador WHERE Username = ? OR Correo = ?', [username, correo]);
        if (existingAdmin.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Guardar el nuevo administrador en la base de datos
        await pool.query('INSERT INTO Administrador (Nombre, Username, Correo, Contraseña) VALUES (?, ?, ?, ?)', [nombre, username, correo, contraseña]);

        res.status(201).json({ message: 'Administrador registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el administrador', error });
    }
};

// Inicio de sesión
export const login = async (req, res) => {
    const { username, contraseña } = req.body;
    try {
        // Buscar el administrador en la base de datos
        const [admin] = await pool.query('SELECT * FROM Administrador WHERE Username = ?', [username]);
        if (admin.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Verificar la contraseña (sin hashing)
        if (contraseña !== admin[0].Contraseña) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: admin[0].ID, username: admin[0].Username }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
