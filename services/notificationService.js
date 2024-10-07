import fs from 'fs-extra';

const filePath = './data/fixya.json';

// Leer datos de notificaciones desde el archivo JSON
async function notificationsData() {
    try {
        const data = await fs.readJson(filePath);
        return data.notificaciones || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

// Obtener todas las notificaciones
async function getAllNotifications() {
    return await notificationsData();
}

// Obtener una notificación por ID
async function getNotificationById(id) {
    const notifications = await notificationsData();
    return notifications.find(notification => notification.id === parseInt(id));
}

export default {
    getAllNotifications,
    getNotificationById
};
