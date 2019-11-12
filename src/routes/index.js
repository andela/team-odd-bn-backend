import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import api from './api';
import swaggerOption from '../utils/swaggerOptions';

const router = Router();
router.use('/api/v1', api);
const specs = swaggerJsdoc(swaggerOption);

router.use('/api-docs', swaggerUi.serve);
router.get(
  '/api-docs',
  swaggerUi.setup(specs, {
    explorer: true
  })
);
export default router;
