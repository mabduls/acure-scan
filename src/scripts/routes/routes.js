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

    if (route.requiresAuth && !isAuthenticated) {
        navigateToUrl('/');
        return false;
    }

    if (!route.requiresAuth && isAuthenticated && window.location.hash === '#/') {
        navigateToUrl('/home');
        return false;
    }

    return true;
}

export { routes, navigateToUrl, checkAuth }
