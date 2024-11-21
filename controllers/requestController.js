import requestService from "../services/requestService.js";

const getAllRequests = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;
    try {
        const requests = await requestService.getAllRequests(page, pageSize);
        const totalRequests = await requestService.getTotalRequests();
        const totalPages = Math.ceil(totalRequests / pageSize);
        res.json({ requests, totalRequests, totalPages, currentPage: page, pageSize });
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
};

const getRequestById = async (req, res) => {
    try {
        const request = await requestService.getRequestById(req.params.id);
        if (!request) return res.status(404).json({ message: "Solicitud no encontrada" });
        res.json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRequest = async (req, res) => {
    try {
        const newRequest = await requestService.createRequest(req.body);
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRequest = async (req, res) => {
    try {
        const updatedRequest = await requestService.updateRequest(req.params.id, req.body);
        if (!updatedRequest) return res.status(404).json({ message: "Solicitud no encontrada" });
        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRequest = async (req, res) => {
    try {
        const deletedRequest = await requestService.deleteRequest(req.params.id);
        if (!deletedRequest) return res.status(404).json({ message: "Solicitud no encontrada" });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getAllRequests, getRequestById, createRequest, updateRequest, deleteRequest };