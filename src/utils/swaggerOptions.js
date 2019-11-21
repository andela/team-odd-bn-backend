import path from 'path';

// Swagger definition
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad',
      version: '1.0.0',
      description: 'Making company travel and accomodation easy and convenient',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/'
      },
      contact: {
        name: 'Andela',
        url: 'https://andela.com',
        email: 'partnerships@andela.com'
      }
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'token'
        }
      }
    },
    security: [{
      ApiKeyAuth: []
    }],
    servers: [
      {
        url: 'http://localhost:3000/api/v1'
      },
      {
        url: 'https://team-odd-barefoot-backend.herokuapp.com/api/v1'
      }
    ]
  },
  apis: [
    path.resolve(__dirname, '../routes/api/authRoute.js'),
    path.resolve(__dirname, '../routes/api/socialRoute.js'),
    path.resolve(__dirname, '../routes/api/tripRoute.js'),
  ]
};
export default options;
