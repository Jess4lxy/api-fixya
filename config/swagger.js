import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'FixYa API Documentation',
        version: '1.0.0',
        description: 'API para gestionar FixYa, incluyendo residentes, servicios, solicitudes y más.',
        },
        servers: [
        {
            url: 'https://api-fixya.onrender.com',  // URL recuerda cambiar despues
        },
        ],
    },
    apis: ['./routes/*.js'],  // ruta donde Swagger buscará anotaciones para la documentación
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
