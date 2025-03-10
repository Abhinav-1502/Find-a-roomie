// Importing mongoose library
import mongoose from "mongoose";
// Creating a Schema object from mongoose
const Schema = mongoose.Schema;
// Profile management schema
const profileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User model
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    nationality: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female', 'Other']
    }
   
});

const profileModel = mongoose.model('Profile', profileSchema);

export default profileModel;
