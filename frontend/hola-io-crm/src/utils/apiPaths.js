export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", // Signup
        LOGIN: "/api/auth/login", // Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/me", // Get logged-in user details
        UPDATE_PROFILE: "/api/auth/me", // update profile details (PUT)
    }
};
