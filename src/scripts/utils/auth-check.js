// utils/auth-check.js
let previousAuthorizedPath = null;

export function getAccessToken() {
    return localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
}

export function updateAuthorizedPath(path) {
    const blockedWhenAuth = ['/', '/login', '/register'];
    if (!blockedWhenAuth.includes(path)) {
        previousAuthorizedPath = path;
    }
}

export function checkAuth(routePath) {
    const isAuthenticated = !!getAccessToken();
    const blockedWhenAuth = ['/', '/login', '/register'];
    const protectedRoutes = ['/dashboard']; // Sesuaikan dengan route yang diproteksi

    // Jika sudah login tapi mencoba akses route yang diblokir
    if (isAuthenticated && blockedWhenAuth.includes(routePath)) {
        // Jika ada previousAuthorizedPath, kembalikan ke sana
        // Jika tidak, default ke dashboard
        return { 
            allowed: false, 
            redirect: previousAuthorizedPath || '/dashboard' 
        };
    }

    // Jika belum login tapi mencoba akses route yang diproteksi
    if (!isAuthenticated && protectedRoutes.includes(routePath)) {
        return { allowed: false, redirect: '/login' };
    }

    // Update path yang diizinkan (kecuali route yang diblokir)
    if (!blockedWhenAuth.includes(routePath)) {
        previousAuthorizedPath = routePath;
    }

    return { allowed: true };
}

export function navigateToUrl(path) {
    if (window.location.hash !== `#${path}`) {
        window.location.hash = `#${path}`;
    }
}