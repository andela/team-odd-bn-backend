import { Router } from 'express';
import authRoute from './authRoute';
import tripRoute from './tripRoute';
import socialRoute from './socialRoute';
import roleRoute from './roleRoute';

const router = Router();
router.use('/auth', authRoute);
router.use('/auth', socialRoute);
router.use('/trips', tripRoute);
router.use('/users', roleRoute);

export default router;
