// src/index.js
import '../styles/styles.css';
import App from './pages/app';
import { ErrorHandler } from './utils/error-handler.js';
import { URLFixer } from './utils/url-fixer.js';

// Error handler ekstensi browser
window.addEventListener('error', (event) => {
    if (event.error && event.error.message && event.error.message.includes(':has-text')) {
        event.preventDefault();
        console.warn('Browser extension causing CSS parsing error, ignoring...');
        return true;
    }
    return false;
});

if (module.hot) {
    module.hot.accept('./pages/app', () => {
        console.log('Accepting the updated App module!');
    });

    module.hot.accept('./pages/landing/landing-page', () => {
        console.log('Accepting the updated LandingPage module!');
        const LandingPage = require('./pages/landing/landing-page').default;
        if (customElements.get('landing-page')) {
            customElements.undefine('landing-page');
        }
        customElements.define('landing-page', LandingPage);
    });
}

// Helper dynamic import dengan base path untuk GitHub Pages
function dynamicImport(path) {
    const repoName = 'acure-scan';
    if (window.location.hostname.includes('github.io')) {
        const basePath = '/' + repoName + '/';
        if (path.startsWith('./')) {
            return import(basePath + path.slice(2));
        }
        if (path.startsWith('/') && !path.startsWith(basePath)) {
            return import(basePath + path.slice(1));
        }
    }
    return import(path);
}

async function safeDefine(name, importPromise) {
    if (!customElements.get(name)) {
        try {
            const { default: Component } = await importPromise;
            if (!customElements.get(name)) {
                customElements.define(name, Component);
            }
        } catch (error) {
            console.error(`Failed to register ${name}:`, error);
            throw error;
        }
    }
}

async function initializeApp() {
    try {
        console.log('=== GITHUB PAGES CONFIG ===');
        console.log('Hostname:', window.location.hostname);
        console.log('Pathname:', window.location.pathname);
        console.log('Hash:', window.location.hash);
        console.log('Is GitHub Pages:', window.location.hostname.includes('github.io'));
        console.log('Full URL:', window.location.href);
        console.log('==========================');

        ErrorHandler.init();
        URLFixer.init();

        await Promise.all([
            safeDefine('landing-page', dynamicImport('./pages/landing/landing-page')),
            safeDefine('login-page', dynamicImport('./pages/auth/login/login-page')),
            safeDefine('register-page', dynamicImport('./pages/auth/register/register-page')),
            safeDefine('dashboard-page', dynamicImport('./pages/dashboard/dashboard-page')),
            safeDefine('result-page', dynamicImport('./pages/result/result-page')),
            safeDefine('result-detail-page', dynamicImport('./pages/result/detail/result-detail-page')),
            safeDefine('history-page', dynamicImport('./pages/history/history-page')),
            safeDefine('article-page', dynamicImport('./pages/article/article-page')),
            safeDefine('article-detail-page', dynamicImport('./pages/article/detail/article-detail-page')),
        ]);

        const app = new App({
            content: document.getElementById('mainContent'),
        });

        app.renderPage();

        if ('serviceWorker' in navigator) {
            try {
                const swPath = '/acure-scan/sw.js';
                await navigator.serviceWorker.register(swPath);
                console.log('Service Worker registered at:', swPath);
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }

        window.addEventListener('hashchange', () => app.renderPage());
        window.addEventListener('load', () => app.renderPage());
    } catch (error) {
        console.error('Application initialization failed:', error);
        document.getElementById('mainContent').innerHTML = `
            <div style="color: white; text-align: center; padding: 20px;">
                <h2>Application Error</h2>
                <p>Sorry, something went wrong. Please try again later.</p>
            </div>
        `;
    }
}

initializeApp();
