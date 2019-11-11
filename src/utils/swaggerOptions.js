const path = require('path');
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
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ]
  },
  apis: [
    path.resolve(__dirname, '../database/models/users.js'),
    path.resolve(__dirname, '../routes/api/users.js')
  ]
};
module.exports = options;
