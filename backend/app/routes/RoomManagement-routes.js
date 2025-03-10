import express from 'express';
import * as roomController from '../controllers/roomManagement-controller.js';

const router = express.Router();

router.route('/')
    .get(roomController.displayRooms)
    .post(roomController.postRoom);

router.route('/:id')
    .get(roomController.getRoom)
    .put(roomController.updateRoom)
    .delete(roomController.deleteRoom);

export default router