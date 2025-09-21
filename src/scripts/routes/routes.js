import { getBasePath, isGitHubPages, isNetlify } from '../config/base-config';

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
    console.log('Current base path:', getBasePath());

    // Handle absolute URLs
    if (url.startsWith('http') || url.includes('://')) {
        window.location.href = url;
        return;
    }

    const basePath = getBasePath();
    const isGitHub = isGitHubPages();

    let targetUrl = url;

    // Untuk GitHub Pages, gunakan hash routing
    if (isGitHub) {
        if (url.startsWith('/') && !url.startsWith(basePath)) {
            targetUrl = '#' + url;
        }

        if (targetUrl.startsWith('#')) {
            window.location.hash = targetUrl;
            setTimeout(() => {
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }, 10);
            return;
        }
    }

    // Untuk Netlify dan lainnya, gunakan normal routing
    if (targetUrl.startsWith('/')) {
        window.location.href = targetUrl;
    } else {
        window.location.hash = '#' + targetUrl;
        setTimeout(() => {
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        }, 10);
    }
}

function getCurrentPath() {
    const hash = window.location.hash;
    const pathname = window.location.pathname;
    
    console.log('Pathname:', pathname);
    console.log('Hash:', hash);
    
    // Jika di GitHub Pages
    if (isGitHubPages() && pathname.includes('/acure-scan/')) {
        if (hash) {
            const { path } = parseUrlWithQuery(hash);
            return path;
        }
        return '/';
    }
    
    // Jika di Netlify, gunakan hash routing
    if (isNetlify() && hash) {
        const { path } = parseUrlWithQuery(hash);
        return path;
    }
    
    // Default: gunakan pathname untuk non-SPA, hash untuk SPA
    return pathname === '/' && hash ? parseUrlWithQuery(hash).path : pathname;
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