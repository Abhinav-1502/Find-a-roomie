
import RoomFilter from '../model/room-filters.js';

// Retrieves a list of room filters based on the specified parameters.
export const list = async (params ={}) =>{
    const roomfilters = await RoomFilter.find(params).exec();
    return roomfilters;
}

// Saves a new room filter to the database.
export const save = async (newRoomFilterData) =>{
    const roomfilter = new RoomFilter(newRoomFilterData);
    return await roomfilter.save();
}

// Find a room filter in the database by its unique identifier.
export const findById = async (id) =>{
    const roomfilter = await RoomFilter.findById(id).exec();
    return await roomfilter;
}

// Edits an existing room filter identified by its unique identifier (id).
export const edit = async (id, editedRoomFilterData) =>{
    const roomfilter = await RoomFilter.findByIdAndUpdate(id, editedRoomFilterData).exec();
    return await roomfilter;
}

// Deletes a room filter from the database based on its unique identifier (id).
export const remove = async(id) => {
    const roomfilter = await RoomFilter.findByIdAndDelete(id).exec();
    return roomfilter;
}
