import express from 'express';
import * as roomController from '../controllers/roomPostController.js';

const router = express.Router();

router.route('/')
    .get(roomController.getAllRooms)
    .post(roomController.createRoom);

router.route('/:roomId')
    .get(roomController.getRoomById)
    .put(roomController.updateRoom)
    .delete(roomController.deleteRoom);

export default router;