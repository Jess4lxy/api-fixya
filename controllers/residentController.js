import residentService from "../services/residentService.js";

const getAllResidents = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;
    try {
        const residents = await residentService.getAllResidents(page, pageSize);
        const totalResidents = await residentService.getTotalResidents();
        const totalPages = Math.ceil(totalResidents / pageSize);
        res.json({ residents, totalResidents, totalPages, currentPage: page, pageSize });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getResidentById = async (req, res) => {
    try {
        const resident = await residentService.getResidentById(req.params.id);
        if (!resident) return res.status(404).json({ error: "Residente no encontrado" });
        res.json(resident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createResident = async (req, res) => {
    try {
        const newResident = await residentService.createResident(req.body);
        res.status(201).json(newResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateResident = async (req, res) => {
    try {
        const updatedResident = await residentService.updateResident(req.params.id, req.body);
        if (!updatedResident) return res.status(404).json({ error: "Residente no encontrado" });
        res.json(updatedResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteResident = async (req, res) => {
    try {
        const deletedResident = await residentService.deleteResident(req.params.id);
        if (!deletedResident) return res.status(404).json({ error: "Residente no encontrado o ya eliminado" });
        res.json({ message: "Residente eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getResidentsByApartment = async (req, res) => {
    try {
        const residents = await residentService.findResidentsByApartment(req.params.idApartment);
        if (!residents.length) return res.status(404).json({ error: "No se encontraron residentes" });
        res.json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getAllResidents, getResidentById, createResident, updateResident, deleteResident, getResidentsByApartment };