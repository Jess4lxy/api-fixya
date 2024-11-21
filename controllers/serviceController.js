import servicesService from "../services/servicesService.js";

const getAllServices = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.page) || 50;
    try {
        const services = await servicesService.getAllServices(page, pageSize);
        const totalServices = await servicesService.getTotalServices();
        const totalPages = Math.ceil(totalServices / pageSize);
        res.json({ services, totalServices, totalPages, currentPage: page, pageSize });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await servicesService.getServiceById(req.params.id);
        if (!service) return res.status(404).json({ error: "Servicio no encontrado" });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createService = async (req, res) => {
    try {
        const newService = await servicesService.createService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const updatedService = await servicesService.updateService(req.params.id, req.body);
        if (!updatedService) return res.status(404).json({ error: "Servicio no encontrado" });
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const deletedService = await servicesService.deleteService(req.params.id);
        if (!deletedService) return res.status(404).json({ error: "Servicio no encontrado" });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getAllServices, getServiceById, createService, updateService, deleteService };