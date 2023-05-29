import express from 'express';
const router = express.Router();

import * as baocaotonthangController from '../controllers/baocaotonthangController.js';


// Post
router.post('/', baocaotonthangController.createReport);


export default router;
