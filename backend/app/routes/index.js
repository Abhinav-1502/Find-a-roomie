
// Importing routers from different modules.
import blogRouter from './blog-routes.js';          // Router for blog-related routes.
import userRouter from './UserManagement-routes.js'; // Router for user management-related routes.
import profileRouter from './ProfileManagement-routes.js'; // Router for profile management-related routes.
import roomFilterRouter from './roomfilters-routes.js'; // Router for room filter-related routes.
import roomRouter from './RoomManagement-routes.js';
import uploadRoutes from './image-routes.js';
import roomPostRoutes from './roomPost-routes.js'


// Exporting a function that takes the express app object as an argument.
export default (app) => {
    // All blog-related requests will be handled by the blogRouter.
    app.use('/blogs', blogRouter);

    // This will handle requests related to room filters.
    app.use('/roomlistings/filters', roomFilterRouter); 

    // User management (like registration, login) will be handled by userRouter.
    app.use('/api/users', userRouter); 

    // This will handle requests related to user profiles.
    app.use('/api', profileRouter); 
    app.use('/rooms', roomRouter);
    app.use('/upload', uploadRoutes);

    // Room Post Routes
    app.use('/roomposts', roomPostRoutes);
};
