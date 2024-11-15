import ResidentUserRepository from "../repository/residentUserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ResidentUser from "../models/residentUser.js";

const ResidentUserService = {
    // Registrar a un nuevo usuario de residente
    async registerResidentUser(residentId, username, email, password) {
        try {
            const existingUser = await ResidentUserRepository.getResidentUserByEmail(email);
            if (existingUser) {
                throw new Error('El correo electrónico ya está registrado.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const residentUser = await ResidentUserRepository.createResidentUser(residentId, username, email, hashedPassword);
            return new ResidentUser(residentUser.id, residentUser.residentId, residentUser.username, residentUser.email, residentUser.password);
        } catch (error) {
            throw new Error(`Error al registrar el usuario de residente: ${error.message}`);
        }
    },

    // Obtener un usuario de residente por su ID
    async getResidentUserById(id) {
        try {
            const residentUser = await ResidentUserRepository.getResidentUserById(id);
            if (!residentUser) {
                throw new Error("Usuario residente no encontrado");
            }
            return residentUser;
        } catch (error) {
            throw new Error(`Error al obtener el usuario de residente por ID: ${error.message}`);
        }
    },

    // Iniciar sesión de un usuario residente
    async loginResidentUser(email, password) {
        try {
            const residentUser = await ResidentUserRepository.getResidentUserByEmail(email);
            if (!residentUser) {
                throw new Error("Usuario residente no encontrado");
            }

            const match = await bcrypt.compare(password, residentUser.password);
            if (!match) {
                throw new Error("Contraseña incorrecta");
            }

            // Generacion de un token JWT
            const token = jwt.sign(
                { id: residentUser.id, username: residentUser.username, email: residentUser.email },
                process.env.SECRET_KEY,
                { expiresIn: "2h" }
            );

            return { token, residentUser };
        } catch (error) {
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    },

    // Actualizar el usuario de residente
    async updateResidentUser(id, { username, email, password }) {
        try {
            let hashedPassword;

            // Solo encriptar la nueva contraseña si se proporciona
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            // Pasar los valores de forma condicional (sin modificar los campos que no se actualizan)
            const updatedResidentUser = await ResidentUserRepository.updateResidentUser(id, { 
                username,
                email,
                password: hashedPassword
            });
            if (!updatedResidentUser) {
                throw new Error("No se pudo actualizar el usuario de residente");
            }
            return updatedResidentUser;
        } catch (error) {
            throw new Error(`Error al actualizar el usuario de residente: ${error.message}`);
        }
    },


    // Eliminar un usuario de residente
    async deleteResidentUser(id) {
        try {
            const deletedResidentUser = await ResidentUserRepository.deleteResidentUser(id);
            if (!deletedResidentUser) {
                throw new Error("No se pudo eliminar el usuario de residente");
            }
            return deletedResidentUser;
        } catch (error) {
            throw new Error(`Error al eliminar el usuario de residente: ${error.message}`);
        }
    }
};

export default ResidentUserService;
