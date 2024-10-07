class Payment {
    constructor(id, monto, fechaPago, metodo, facturaId) {
        this.id = id;
        this.monto = monto;
        this.fechaPago = fechaPago;
        this.metodo = metodo;
        this.facturaId = facturaId;
    }
}

export default Payment;
