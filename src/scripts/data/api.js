export const BASE_URL = 'http://localhost:5000';

export const register = async (name, email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/register`, { // Tambahkan /api
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // Penting untuk cookies/session
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data.data; // Asumsikan token ada di data.data
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const getUserScans = async (userId, token) => {
    try {
        if (!token) {
            token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
        }

        if (!token) {
            throw new Error('No authentication token available');
        }

        const response = await fetch(`${BASE_URL}/api/scans?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch scans');
        }

        return data.data;
    } catch (error) {
        console.error('Failed to fetch scans:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/logout`, { // Tambahkan /api
            method: 'POST',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Logout failed');
        }

        return data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};