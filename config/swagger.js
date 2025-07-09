

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bookstore API',
            version: '1.0.0',
            description: 'Clean Architecture Node.js API with JWT Auth and postgres',
        }, 
        servers: [
            {
                url: 'http://localhost:'+ process.env.PORT,
            },
            {
                url: 'https://bookstore-api-nodejs-clean-production.up.railway.app',
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
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./interfaces/routes/*.js'], // Scan route files for comments
}

export default swaggerOptions;