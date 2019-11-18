import { Router } from 'express';
import authRoute from './authRoute';
import tripRoute from './tripRoute';
import userRoute from './userRoute';
import socialRoute from './socialRoute';
import roleRoute from './roleRoute';
import locationRoute from './locationRoute';

const router = Router();
router.use('/auth', authRoute);
router.use('/auth', socialRoute);
router.use('/trips', tripRoute);
router.use('/users', roleRoute);
router.use('/location', locationRoute);
router.use('/users', userRoute);


export default router;
