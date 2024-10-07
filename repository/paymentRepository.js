import fs from 'fs-extra';

const filePath = './data/fixya.json';  // Asegúrate de que la ruta sea correcta

const getPayments = async () => {
    try {
        const data = await fs.readJson(filePath);
        return data.pagos || [];
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
};

const savePayments = async (payments) => {
    try {
        const data = await fs.readJson(filePath);
        data.pagos = payments;
        await fs.writeJson(filePath, data, { spaces: 2 });
    } catch (error) {
        console.error('Error al guardar los pagos:', error);
        throw error;
    }
};

export default {
    getPayments,
    savePayments
};
