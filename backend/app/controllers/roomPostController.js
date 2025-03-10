import { setConflictResponse, setErrorResponse, setResponse } from './response-handler.js';
import * as roomServices from '../services/roomPostServices.js';

export const createRoom = async (req, res) => {
    try {
        const roomData = { ...req.body };
        const room = await roomServices.create(roomData);
        setResponse(room, res, 201, 'Room Posted Successfully');
    } catch (err) {
        if (err.message === 'PostId Already Exists') {
            setConflictResponse('PostId Already Exists', res);
        } else {
            setErrorResponse(err, res);
        }
    }
};

export const getAllRooms = async (req, res) => {
    try {
        //const filters = req.query;
        const rooms = await roomServices.getAll();
        //const rooms = await roomServices.filterRooms(filters);
        setResponse(rooms, res);
    } catch (err) {
        setErrorResponse(err, res);
    }
};

export const getRoomById = async (req, res) => {
    try {
        const id = req.params.roomId;
        const room = await roomServices.getById(id);
        setResponse(room, res);
    } catch (err) {
        setErrorResponse(err, res);
    }
};

export const updateRoom = async (req, res) => {
    try {
        const id = req.params.roomId;
        console.log(id);
        const updatedRoom = { ...req.body };
        const room = await roomServices.update(id, updatedRoom);
        setResponse(room, res, 201, 'Updated room successfully');
    } catch (err) {
        setErrorResponse(err, res);
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const id = req.params.roomId;
        const deletedRoom = await roomServices.remove(id);
        setResponse(deletedRoom, res,200, 'Deleted room successfully');
    } catch (err) {
        setErrorResponse(err, res);
    }
};
