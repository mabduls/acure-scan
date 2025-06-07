const routes = {
    '/': {
        template: '<landing-page></landing-page>',
        title: 'Landing Page'
    },
    '/login': {
        template: '<login-page></login-page>',
        title: 'Login Page'
    },
    '/register': {
        template: '<register-page></register-page>',
        title: 'Register Page'
    },
    '/dashboard': {
        template: '<dashboard-page></dashboard-page>',
        title: 'Dashboard Page'
    }
};


function navigateToUrl(url) {
    window.location.hash = `#${url}`; 
}

function checkAuth(route) {
    const isAuthenticated = !!getAccessToken();
    const currentPath = window.location.hash.replace('#', '') || '/';

    // List of routes that should be blocked when authenticated
    const blockedRoutesWhenAuthenticated = ['/', '/login', '/register'];

    // If user is authenticated and tries to access blocked routes
    if (isAuthenticated && blockedRoutesWhenAuthenticated.includes(currentPath)) {
        navigateToUrl('/home');
        return false;
    }

    // If route requires auth but user isn't authenticated
    if (route.requiresAuth && !isAuthenticated) {
        navigateToUrl('/login');
        return false;
    }

    return true;
}

export { routes, navigateToUrl, checkAuth }
