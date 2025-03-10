// Importing mongoose library
import mongoose from "mongoose";


// Import the Mongoose library
const Schema = mongoose.Schema;

// Define a Mongoose schema for room-related data
const roomSchema = new Schema({
  // Posttype represents whether the entry is for "Looking for a Room" or "Posting for a Room"
  Posttype: {
    type: String,
    enum: ['Roomie', 'Room'],
    required: true, // It is a required field, and the value must be one of the specified enums.
  },
  postId:{
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  // Section for details of a person looking for a room
  lookingForRoom: {
    name: {
      type: String,
      required: true, // Name is required.
    },
    locationAddress: {
      type: String,
      required: true, // Location address is optional.
    },
    proximity: {
      type: String,
      required: false, // Proximity information is optional.
    },
    description: {
      type: String,
      required: true, // Description is required.
    },
  },
  // Section for pricing and lease details of the room
  pricingAndLeaseDetails: {
    monthlyRent: {
      type: String,
      required: true, // Monthly rent is optional.
    },
    utilitiesIncluded: {
      type: Boolean,
      required: false, // Information about utilities being included is optional.
    },
    leaseDuration: {
      type: String,
      required: true, // Lease duration is required.
    },
    securityDeposit: {
      type: String,
      required: false, // Security deposit is optional.
    },
  },
  // Section for room and property details
  roomAndPropertyDetails: {
    houseType: {
      type: [String],
      required: true, // House type is optional.
    },
    numBeds: {
      type: String,
      required: true, // Number of beds is optional.
    },
    numBaths: {
      type: String,
      required: true, // Number of baths is optional.
    },
    furnished: {
      type: [String],
      required: true, // Furnishing details are optional.
    },
    utilities: {
      type: [String],
      required: true, // Utilities details are optional.
    },
    amenities: {
      type: [String],
      required: true, // Amenities details are optional.
    },
  },
  // Section for user preferences
  preferences: {
    preferences: {
      type: [String],
      required: true, // User preferences are optional.
    },
    moreDescription:{
        type: String,
        required: false
    }
  },
  // Section for contact information
  contactInfo: {
    contactAvailability: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true, // Email is required.
    },
    phone: {
      type: String,
      required: true, // Phone number is required.
    },
  },
  // Photos of the room or the person (single image)
  photos: {
    type: [String],
    required: true, // Photos are required.
  },
  createdDate: {
    type: Date,
    default: Date.now
}
});

// Create a Mongoose model named 'Room' based on the defined schema
const Room = mongoose.model('RoomPost', roomSchema);

// Export the Room model for use in other parts of the application
export default Room;