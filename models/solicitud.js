class Solicitud {
    constructor(id, descripcion, tipoServicio, estado, fechaCreacion, fechaFinalizacion, prioridad, residenteId, proveedorId) {
        this.id = id;
        this.descripcion = descripcion;
        this.tipoServicio = tipoServicio;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.fechaFinalizacion = fechaFinalizacion;
        this.prioridad = prioridad;
        this.residenteId = residenteId;
        this.proveedorId = proveedorId;
    }
}

export default Solicitud;
