const { registerUser, loginUser, logoutUser } = require('../services/auth-service');
const { successResponse, errorResponse } = require('../utils/response');

const register = async (request, h) => {
    try {
        const { email, password, name } = request.payload;
        const user = await registerUser(email, password, name);
        return successResponse(h, user, 'User registered successfully', 201);
    } catch (error) {
        return errorResponse(h, error.message, 400);
    }
};

const login = async (request, h) => {
    try {
        const { email, password } = request.payload;
        const user = await loginUser(email, password);
        return successResponse(h, user, 'Login successful');
    } catch (error) {
        return errorResponse(h, error.message, 401);
    }
};

const logout = async (request, h) => {
    try {
        await logoutUser();
        return successResponse(h, null, 'Logout successful');
    } catch (error) {
        return errorResponse(h, error.message, 500);
    }
};

module.exports = { register, login, logout };
