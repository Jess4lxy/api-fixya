class Invoice {
    constructor(id, monto, fechaEmision, proveedorId, solicitudId) {
        this.id = id;
        this.monto = monto;
        this.fechaEmision = fechaEmision;
        this.proveedorId = proveedorId;
        this.solicitudId = solicitudId;
    }
}

export default Invoice;
