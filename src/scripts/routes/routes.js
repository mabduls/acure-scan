const routes = {
    '/': {
        template: '<landing-page></landing-page>',
        title: 'Landing Page',
        requiresAuth: false
    },
    '/login': {
        template: '<login-page></login-page>',
        title: 'Login Page',
        requiresAuth: false
    },
    '/register': {
        template: '<register-page></register-page>',
        title: 'Register Page',
        requiresAuth: false
    },
    '/dashboard': {
        template: '<dashboard-page></dashboard-page>',
        title: 'Dashboard Page',
        requiresAuth: true
    }
};

function getAccessToken() {
    return localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
}


function navigateToUrl(url) {
    window.location.hash = `#${url}`; 
}

function checkAuth(route) {
    const isAuthenticated = !!getAccessToken();
    
    // Jika route membutuhkan auth tapi user belum login
    if (route.requiresAuth && !isAuthenticated) {
        navigateToUrl('/login');
        return false;
    }

    // Jika route tidak membutuhkan auth tapi user sudah login
    if (!route.requiresAuth && isAuthenticated) {
        // Redirect dari landing page, login, atau register ke dashboard
        if (window.location.hash === '#/' || 
            window.location.hash === '#/login' || 
            window.location.hash === '#/register') {
            navigateToUrl('/dashboard');
            return false;
        }
    }

    return true;
}

export { routes, navigateToUrl, checkAuth, getAccessToken }
