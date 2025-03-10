import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    propertyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    uploadedDate:{
        type: Date,
        default: Date.now
    },
    uploadedBy:{
        type: String,
        required: true
    },
    preferences: [{
        type: String,
        description: "Preferred type of tenants"
    }],
    amenities: [{
        type: String,
        description: "Amenities provided with apartment"
    }],
    

});

const roomModel = mongoose.model('Room', roomSchema);

export default roomModel;