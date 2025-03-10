import Room from '../model/roomPost.js';

export const create = async (newRoom) => {
    try {
        //console.log('Checking the database for ', newRoom.postId);
        const postExists = await Room.findOne({ postId: newRoom.postId }).exec();

        if (postExists) {
            throw new Error('PostId Already Exists');
        }
        const room = new Room(newRoom);
        return await room.save();
    } catch (error) {
        console.error('Error in create service:', error);
        throw error;
    }
};

export const getAll = async () => {
    try {
        const rooms = await Room.find().exec();
        return rooms;
    } catch (error) {
        console.error('Error in getAll service:', error);
        throw error;
    }
};

export const getById = async (id) => {
    // Retrieving a blog by its ID from the database.
    const room = await Room.findById(id).exec();
    // Returning the found blog.
    return room;
}

export const update = async (id, updatedRoom) => {
    try {
        const existingRoom = await Room.findOne({ _id:id}).exec();

        if (!existingRoom) {
            throw new Error('Room not found');
        }
        const room = await Room.findOneAndUpdate({_id:id}, updatedRoom, { new: true }).exec();
        return room;
    } catch (error) {
        console.error('Error in update service:', error);
        throw error;
    }
};

export const remove = async (id) => {
    try {
        const room = await Room.findByIdAndDelete(id).exec();

        if (!room) {
            throw new Error('Room not found');
        }

        return room;
    } catch (error) {
        console.error('Error in remove service:', error);
        throw error;
    }
};

export const filterRooms = async (filters) => {
    try {
        const filterCriteria = buildFilterCriteria(filters);
        const rooms = await Room.find(filterCriteria).exec();
        return rooms;
    } catch (error) {
        console.error('Error in filterRooms service:', error);
        throw error;
    }
};

const buildFilterCriteria = (filters) => {
    const filterCriteria = {};
    const filterMappings = {
        postType: 'Posttype',
        houseType: 'roomAndPropertyDetails.houseType',
        furnished: 'roomAndPropertyDetails.furnished',
        utilities: 'roomAndPropertyDetails.utilities',
        amenities: 'roomAndPropertyDetails.amenities',
        preferences: 'preferences.preferences',
    };

    for (const filterKey in filters) {
        if (filters[filterKey]) {
            const mongooseField = filterMappings[filterKey];
            if (mongooseField) {
                if (filterKey === 'priceRange') {
                    // Convert price range values to integers
                    const lowerLimit = parseInt(filters[filterKey][0]);
                    const upperLimit = parseInt(filters[filterKey][1]);

                    // Convert monthly rent to integer before comparison
                    filterCriteria['pricingAndLeaseDetails.monthlyRent'] = {
                        $gte: { $toInt: '$pricingAndLeaseDetails.monthlyRent' }, // Convert to integer and greater than or equal to the lower limit
                        $lte: upperLimit, // Less than or equal to the upper limit
                        $gte: lowerLimit, // Additional check for greater than or equal to the lower limit
                    };
                } else if (filterKey === 'moveInDate') {
                    const startDate = filters[filterKey][0];
                    // Convert move-in date to MongoDB Date type
                    filterCriteria['pricingAndLeaseDetails.leaseDuration'] = {
                        $gte: {
                            $toDate: startDate,
                            $subtract: [ { $toDate: { $split: ['$pricingAndLeaseDetails.leaseDuration', ' to '][0] } }, 10 * 24 * 60 * 60 * 1000 ] // Subtract 10 days
                        },
                    };
                } else {
                    filterCriteria[mongooseField] = Array.isArray(filters[filterKey])
                        ? { $in: filters[filterKey] }
                        : filters[filterKey];
                }
            }
        }
    }

    return filterCriteria;
};
