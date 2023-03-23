import express from 'express';
import videoHandler from './video.handler.js';
import verifyResourceAccess from '../../middleware/validation.js';
import { errors } from '../../config.js';

const router = express.Router();

router.post('/', verifyResourceAccess(errors.noAccess), videoHandler.addVideo);
router.get('/', verifyResourceAccess(errors.noAccess), videoHandler.getVideo);
router.put('/', verifyResourceAccess(errors.noAccess), videoHandler.updateVideo);
router.delete('/:videoId', verifyResourceAccess(errors.noAccess), videoHandler.deleteVideo);

export default {router};