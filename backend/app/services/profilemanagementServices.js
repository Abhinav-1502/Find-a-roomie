import Profile from '../model/ProfileManagement.js';

// Finding user profile by user ID
export const getProfileByUserId = async (userId) => {
    return await Profile.findOne({ userId }).exec();
};

// Create or update profile
export const saveOrUpdateProfile = async (userId, profileData) => {
    const existingProfile = await Profile.findOne({ userId }).exec();
    
    if (existingProfile) {
        return await Profile.findOneAndUpdate({ userId }, profileData, { new: true }).exec();
    } else {
        const newProfile = new Profile({ userId, ...profileData });
        return await newProfile.save();
    }
};

// Update profile
export const updateProfileFields = async (userId, updatedData) => {
    return await Profile.findOneAndUpdate({ userId }, updatedData, { new: true }).exec();
};

// Delete profile
export const deleteProfile = async (userId) => {
    return await Profile.findOneAndDelete({ userId }).exec();
};


