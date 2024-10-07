class Proveedor {
    constructor(id, nombre, servicioOfrecido, certificaciones = [], calificacion, informacionContacto) {
        this.id = id;
        this.nombre = nombre;
        this.servicioOfrecido = servicioOfrecido;
        this.certificaciones = certificaciones;
        this.calificacion = calificacion;
        this.informacionContacto = informacionContacto;
    }
}

export default Proveedor;
