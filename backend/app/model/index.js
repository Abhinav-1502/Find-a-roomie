// Importing various models from their respective files.

// Importing the User model from UserManagement.js. This model is typically used for managing user data in the application.
import User from './UserManagement.js';

// Importing the Blog model from blogs.js. This model is likely used for handling blog posts and related functionalities.
import Blog from './blogs.js';

// Importing the Profile model from ProfileManagement.js. This model could be used to manage user profiles and related data.
import Profile from './ProfileManagement.js';

// Importing the RoomFilter model from room-filters.js. This model might be used for managing room filters in an application, possibly for room booking or searching features.
import RoomFilter from './room-filters.js';

import Room from './roomManagement.js';

import RoomPost from './roomPost.js';

// Exporting an object that aggregates all these models.
// This approach makes it easy to import and use these models elsewhere in the application.
export default {
    User,       // Exporting the User model.
    Blog,       // Exporting the Blog model.
    Profile,    // Exporting the Profile model.
    RoomFilter,  // Exporting the RoomFilter model.
    Room,
    RoomPost
};
