// routes.js - DIPERBAIKI
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
    },
    '/result': {
        template: '<result-page></result-page>',
        title: 'Result Page',
        requiresAuth: true
    },
    '/result-detail': {
        template: '<result-detail-page></result-detail-page>',
        title: 'Result Detail Page',
        requiresAuth: true
    },
    '/history': {
        template: '<history-page></history-page>',
        title: 'History Page',
        requiresAuth: true
    },
    '/article': {
        template: '<article-page></article-page>',
        title: 'Article Page',
        requiresAuth: true
    },
    '/article-detail': {
        template: '<article-detail-page></article-detail-page>',
        title: 'Article Detail Page',
        requiresAuth: true
    }
};

function getAccessToken() {
    return localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
}

function parseUrlWithQuery(hash) {
    const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
    
    if (!cleanHash || cleanHash === '/') {
        return { path: '/', query: {} };
    }
    
    const [path, queryString] = cleanHash.split('?');
    const query = {};
    
    if (queryString) {
        const params = new URLSearchParams(queryString);
        for (const [key, value] of params.entries()) {
            query[key] = value;
        }
    }
    
    return { path: path || '/', query };
}

function navigateToUrl(url) {
    console.log('Navigating to:', url);
    
    // Handle absolute URLs for GitHub Pages
    if (url.startsWith('http')) {
        window.location.href = url;
        return;
    }
    
    // Handle hash-based routing for GitHub Pages
    const cleanUrl = url.startsWith('#') ? url : `#${url}`;
    
    // Untuk GitHub Pages, kita perlu memastikan path base benar
    const basePath = window.location.pathname;
    if (basePath.includes('/acure-scan/') && !cleanUrl.startsWith('#/acure-scan/')) {
        window.location.hash = cleanUrl;
    } else {
        window.location.hash = cleanUrl;
    }
    
    setTimeout(() => {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
    }, 10);
}

function getCurrentPath() {
    const { path } = parseUrlWithQuery(window.location.hash);
    return path;
}

function getQueryParams() {
    const { query } = parseUrlWithQuery(window.location.hash);
    return query;
}

function checkAuth(route) {
    const isAuthenticated = !!getAccessToken();
    
    if (route.requiresAuth && !isAuthenticated) {
        navigateToUrl('/login');
        return false;
    }

    if (!route.requiresAuth && isAuthenticated) {
        const currentPath = getCurrentPath();
        if (currentPath === '/' || currentPath === '/login' || currentPath === '/register') {
            navigateToUrl('/dashboard');
            return false;
        }
    }

    return true;
}

export { routes, navigateToUrl, checkAuth, getAccessToken, parseUrlWithQuery, getCurrentPath, getQueryParams };