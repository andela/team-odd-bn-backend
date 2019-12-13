import { Router } from 'express';
import authRoute from './authRoute';
import tripRoute from './tripRoute';
import userRoute from './userRoute';
import socialRoute from './socialRoute';
import roleRoute from './roleRoute';
import locationRoute from './locationRoute';
import commentRoute from './commentRoute';
import accommodationRoute from './accommodationRoute';
import bookingRouter from './bookingRoute';
import notificationRoute from './notificationRoute';
import searchRouter from './searchRoute';
import statusRouter from './statusRoute';

const router = Router();
router.use('/auth', authRoute);
router.use('/auth', socialRoute);
router.use('/trips', tripRoute);
router.use('/trips', commentRoute);
router.use('/users', roleRoute);
router.use('/location', locationRoute);
router.use('/users', userRoute);
router.use('/accommodations', accommodationRoute);
router.use('/trips', bookingRouter);
router.use('/notifications', notificationRoute);
router.use('/search', searchRouter);
router.use('/status', statusRouter);

export default router;
