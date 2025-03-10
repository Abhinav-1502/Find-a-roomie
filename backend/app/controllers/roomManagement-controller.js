import { response } from 'express';
import * as roomServices from '../services/roomServices.js';
import { setErrorResponse, setResponse } from './response-handler.js';

export const displayRooms = async (request, response) =>{
    try{
        const params = {...request.query};
        const rooms = await roomServices.list(params);
        setResponse(rooms, response);
    }catch(err){
        setErrorResponse(err, response, "Retrieved all the rooms successfully");
    }
};

export const postRoom = async (request, response) =>{
    try{
        const roomData = {...request.body};
        const room = await roomServices.post(roomData);
        setResponse(room, response);
    }catch(err){
        setErrorResponse(err, response, "Posted the room successfully");
    }
};

export const getRoom = async (request, response) =>{
    try{
        const id = request.params.id;
        const room = await roomServices.findById(id);
        setResponse(room, response, "Retrived room post successfully");
    }catch(err){
        setErrorResponse(err, response);
    }
};

export const updateRoom = async (request, response) => {
    try{
        const id = request.params.id;
        const updatedRoom = {...request.body};
        const room = await roomServices.update(id, updatedRoom);
        setResponse(room, response, "Updated room details successfully");
    } catch(err){
        setErrorResponse(err, response);
    }
};

export const deleteRoom = async (request, response) =>{
    try{
        const id = request.params.id;
        const deletedRoom = await roomServices.remove(id);
        setResponse(deletedRoom, response, "Deleted room post successfully");

    }catch(err){
        setErrorResponse(err, response);
    }
};
