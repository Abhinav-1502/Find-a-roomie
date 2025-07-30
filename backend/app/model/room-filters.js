// Importing mongoose library for MongoDB.
import mongoose  from "mongoose";

// Creating a Schema object from mongoose
const Schema = mongoose.Schema;

// Defining the schema for a room filter document.
const roomFilterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    filterParams: [
        {
            location: {type: String, required: true},
            price_range: {type: String},
            amenities: {type: [String]},
            lease_duration: {type: String},
            room_size:{type: String},
            pet_policy:{type: String},
            available_from:{type: String}
        }
    ]
});

const roomFilterModel = mongoose.model('roomFilter', roomFilterSchema);

export default roomFilterModel;