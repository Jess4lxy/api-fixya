import ApartmentService from "../services/apartmentService.js";

const getAllApartments = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;
    try {
        const apartments = await ApartmentService.getAllApartments(page, pageSize);
        const totalApartments = await ApartmentService.getTotalApartments();
        const totalPages = Math.ceil(totalApartments / pageSize);
        res.json({ apartments, totalApartments, totalPages, currentPage: page, pageSize });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getApartmentById = async (req, res) => {
    try {
        const apartment = await ApartmentService.getApartmentById(req.params.id);
        if(!apartment) return res.status(404).json({ error: 'Departamento no encontrado'});
        res.json(apartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createApartment = async (req, res) => {
    try{
        const newApartment = await ApartmentService.createApartment(req.body);
        res.status(201).json(newApartment);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

const updateApartment = async (req, res) => {
    try {
        const updatedApartment = await ApartmentService.updateApartment(req.params.id, req.body);
        if(!updatedApartment) return res.status(404).json({ error: 'Departamento no encontrado'});
        res.json(updatedApartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteApartment = async (req, res)=> {
    try {
        const deletedApartment = await ApartmentService.deleteApartment(req.params.id);
        if (!deletedApartment) return res.status(404).json({ error: 'Departamento no encontrado'});
        res.json({ message: 'Departamento eliminado con éxito'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { getAllApartments, getApartmentById, createApartment, updateApartment, deleteApartment };