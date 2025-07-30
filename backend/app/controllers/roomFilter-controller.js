import * as roomfilterServices from '../services/roomfilterServices.js';
import { setErrorResponse, setResponse } from './response-handler.js';

// Display Roo Filters
export const displayRoomFilters = async (request, response) =>{
    try{
        const params = {...request.query};
        const roomfilters = await roomfilterServices.list(params);
        setResponse(roomfilters, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}

// Post Room Filters
export const postRoomFilter = async (request, response) =>{
    try{
        const roomfilterData = {...request.body};
        const roomfilter = await roomfilterServices.save(roomfilterData);
        setResponse(roomfilter, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}

// Get Room Filter
export const getRoomFilter = async (request, response) =>{
    try{    
        const id = request.params.id;
        const roomfilter = await roomfilterServices.findById(id);
        setResponse(roomfilter, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}

// Update Room Filter
export const updateRoomFilter = async (request, response) =>{
    try{
        const id = request.params.id;
        const editedRoomFilter = {...request.body};
        const roomfilter = await roomfilterServices.edit(id, editedRoomFilter);
        setResponse(editedRoomFilter, response);
    }catch(err){
        setErrorResponse(err, response);
    }
}
// Delete Room filter
export const deleteRoomFilter = async (request, response) =>{
    try{
        const id = request.params.id;
        const roomfilter = await roomfilterServices.remove(id);
        setResponse(roomfilter, response);

    }catch(err){
        setErrorResponse(err, response);
    }
}