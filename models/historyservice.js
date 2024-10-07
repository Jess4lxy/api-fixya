class HistoryService {
    constructor(id, proveedorId, solicitudId, fechaFinalizacion, comentarios) {
        this.id = id;
        this.proveedorId = proveedorId;
        this.solicitudId = solicitudId;
        this.fechaFinalizacion = fechaFinalizacion;
        this.comentarios = comentarios;
    }
}

export default HistoryService;
