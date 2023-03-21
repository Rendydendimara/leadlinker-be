import express from 'express';
import authRouter from './auth';
import businessOwnerRouter from './businessOwner';
import personalRouter from './personal';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/personal', personalRouter);
router.use('/business-owner', businessOwnerRouter);

export default router;
