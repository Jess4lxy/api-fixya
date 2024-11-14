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
                url: 'https://api-fixya.onrender.com',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Exporta como default
export default swaggerSpec;
