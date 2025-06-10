export const initializeAuth = () => {
    return new Promise(async (resolve) => {
        try {
            // Cek token di localStorage
            const userToken = localStorage.getItem('userToken');
            const userData = localStorage.getItem('userData');

            if (userToken && userData) {
                // Verifikasi token dengan backend
                const response = await fetch(`${BASE_URL}/api/auth/verify`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (response.ok) {
                    resolve(JSON.parse(userData));
                } else {
                    // Token tidak valid, bersihkan storage
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userData');
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            resolve(null);
        }
    });
};

export const getCurrentUser = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};

export const getToken = () => {
    return localStorage.getItem('userToken');
};