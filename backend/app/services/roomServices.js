import Room from '../model/roomManagement.js' 

export const list = async (params = {})=>{
    const Rooms = await Room.find(params).exec();
    return Rooms;
};

export const post = async (newRoom) => {
    const room = new Room(newRoom);
    return await room.save();
};

export const findById = async (id) => {
    const room = new Room.findById(id).exec();
    return await room;
}

export const update = async (id, editedRoom) => {
    const updateRoom = await Room.findByIdAndUpdate(id, editedRoom).exec();
    return await updateRoom;
}

export const remove = async (id) => {
    const room = await Room.findByIdAndDelete(id).exec();
    return await room;
}