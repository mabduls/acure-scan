export const BASE_URL = 'https://acure-scan-production.up.railway.app';

export const register = async (name, email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data.data;
    } catch (error) {
        console.error('Registration error:', error);

        let errorMessage = error.message;
        if (error.code) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'Email already registered';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters';
                    break;
                default:
                    errorMessage = 'Registration failed. Please try again.';
            }
        } else if (error.message.includes('already in use')) {
            errorMessage = 'Email already registered';
        }

        throw new Error(errorMessage);
    }
};

export const login = async (email, password) => {
    try {
        // Pertama, login ke Firebase
        const { auth, signInWithEmailAndPassword } = await import('../../server/config/firebase.js');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Dapatkan Firebase ID token
        const firebaseToken = await firebaseUser.getIdToken();

        // Kemudian kirim ke backend API Anda
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${firebaseToken}`
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Jika backend gagal, logout dari Firebase
            await signOut(auth);
            throw new Error(data.message || 'Login failed');
        }

        // Simpan token dan data user dari backend (bukan dari Firebase)
        if (data.data && data.data.token) {
            localStorage.setItem('userToken', data.data.token);
            localStorage.setItem('userData', JSON.stringify({
                uid: data.data.uid,
                email: data.data.email,
                token: data.data.token
            }));
        }

        return data.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const getUserScans = async (userId, token) => {
    try {
        if (!token) {
            token = localStorage.getItem('userToken');
        }

        if (!token) {
            throw new Error('No authentication token available');
        }

        const response = await fetch(`${BASE_URL}/api/scans?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
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
        const token = localStorage.getItem('userToken');

        if (!token) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
            return { success: true };
        }

        const response = await fetch(`${BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');

        if (!response.ok) {
            throw new Error(data.message || 'Logout failed');
        }

        return data;
    } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        throw error;
    }
};