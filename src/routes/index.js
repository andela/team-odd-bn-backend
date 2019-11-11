import api from './api';

const router = require('express').Router();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOption = require('../utils/swaggerOptions');

router.use('/api/', api);
const specs = swaggerJsdoc(swaggerOption);
router.use('/api-docs', swaggerUi.serve);
router.get(
  '/api-docs',
  swaggerUi.setup(specs, {
    explorer: true
  })
);
export default router;
