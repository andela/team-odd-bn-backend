import { Router } from 'express';
import authRoute from './authRoute';

import socialRoute from './socialRoute';

const router = Router();
router.use('/auth', authRoute);
router.use('/auth', socialRoute);
export default router;


module.exports = router;
