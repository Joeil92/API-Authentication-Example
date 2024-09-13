import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AthleticsPerformances',
            version: '1.0.0',
            description: "REST API app made with Express."
        },
        tags: [
            { name: 'User', description: 'Operations related to users' },
            { name: 'Authentication', description: 'Operations related to authentication' },
        ],
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./docs/swagger/*.yaml']
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;