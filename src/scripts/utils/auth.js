import { auth } from '../../server/config/firebase';

// src/utils/auth.js
export const initializeAuth = () => {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Persist the user's token and data
                const token = await user.getIdToken();
                localStorage.setItem('userToken', token);
                localStorage.setItem('userData', JSON.stringify({
                    uid: user.uid,
                    email: user.email
                }));
                sessionStorage.setItem('userToken', token);
                resolve(user);
            } else {
                // No user is signed in
                resolve(null);
            }
        });

        // Return unsubscribe function if needed
        return unsubscribe;
    });
};

export const getCurrentUser = () => {
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};

export const getToken = async () => {
    // Check storage first
    const storedToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    if (storedToken) return storedToken;

    // If no stored token but user is authenticated, get fresh token
    if (auth.currentUser) {
        try {
            const token = await auth.currentUser.getIdToken();
            return token;
        } catch (error) {
            console.error('Error getting fresh token:', error);
        }
    }

    return null;
};