import * as profileServices from '../services/profilemanagementServices.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Get a user's profile
export const getProfile = async (request, response) => {
    try {
        const userId = request.params.userId;
        const profile = await profileServices.getProfileByUserId(userId);
        if (!profile) {
            setResponse(null, response, 404, 'Profile not found');
        } else {
            setResponse(profile, response);
        }
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Create or update a user's profile
export const saveOrUpdateProfile = async (request, response) => {
    try {
        const userId = request.params.userId;
        const profileData = { ...request.body };
        const updatedProfile = await profileServices.saveOrUpdateProfile(userId, profileData);
        setResponse(updatedProfile, response, 201, 'Profile saved successfully');
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Update specific fields in a user's profile
export const updateProfileFields = async (request, response) => {
    try {
        const userId = request.params.userId;
        const updatedData = { ...request.body };
        const updatedProfile = await profileServices.updateProfileFields(userId, updatedData);
        setResponse(updatedProfile, response, 200, 'Profile updated successfully');
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// Delete a user's profile
export const deleteProfile = async (request, response) => {
    try {
        const userId = request.params.userId;
        await profileServices.deleteProfile(userId);
        setResponse({}, response, 200, 'Profile deleted successfully');
    } catch (err) {
        setErrorResponse(err, response);
    }
};


