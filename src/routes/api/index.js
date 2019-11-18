import { Router } from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';

import socialRoute from './socialRoute';

const router = Router();
router.use('/auth', authRoute);
router.use('/auth', socialRoute);
router.use('/users', userRoute);
export default router;


module.exports = router;
