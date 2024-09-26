class Resident {
    constructor(id, nombre, email, numeroContacto, numeroDepartamento, historialSolicitudes = []) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.numeroContacto = numeroContacto;
        this.numeroDepartamento = numeroDepartamento;
        this.historialSolicitudes = historialSolicitudes;
    }
}

export default Resident;
