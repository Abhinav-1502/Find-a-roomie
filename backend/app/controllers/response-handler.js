// By default, Status code to 200 (OK) and message to 'Success'
export const setResponse = (data, response, statusCode = 200, message = 'Success') => {
    response.status(statusCode).json({ message, data });
};

// Function to set a conflict response (HTTP 409)
export const setConflictResponse = (message, response) => {
    response.status(409).json({ message });
};

// Function to set an unauthorized response (HTTP 401)
export const setUnauthorizedResponse = (message, response) => {
    response.status(401).json({ message });
};

// Function to set a not found response (HTTP 404)
export const setNotFoundResponse = (message, response) => {
    response.status(404).json({ message });
};

// By default, sets the status code to 500 (Internal Server Error)
export const setErrorResponse = (err, response, statusCode = 500) => {
    let message = err.message || 'An Error Occurred While Processing Your Request';
    let code = 'Service Error';
    response.status(statusCode).json({ code, message });
};
    