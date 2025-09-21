// src/index.js
import '../styles/styles.css';
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

// Configuration
const CONFIG = {
    isGitHubPages: window.location.hostname.includes('github.io'),
    isNetlify: window.location.hostname.includes('netlify.app'),
    basePath: window.location.hostname.includes('github.io') ? '/acure-scan/' : '/'
};

console.log('=== DEPLOYMENT CONFIG ===');
console.log('Hostname:', window.location.hostname);
console.log('Pathname:', window.location.pathname);
console.log('Hash:', window.location.hash);
console.log('Is GitHub Pages:', CONFIG.isGitHubPages);
console.log('Is Netlify:', CONFIG.isNetlify);
console.log('Base Path:', CONFIG.basePath);
console.log('Full URL:', window.location.href);
console.log('==========================');

// Helper untuk resolve path yang benar
function resolveModulePath(relativePath) {
    if (CONFIG.isGitHubPages) {
        // Untuk GitHub Pages, tambahkan base path
        if (relativePath.startsWith('./')) {
            return relativePath.replace('./', CONFIG.basePath);
        }
        if (relativePath.startsWith('/') && !relativePath.startsWith(CONFIG.basePath)) {
            return CONFIG.basePath + relativePath.slice(1);
        }
    }
    return relativePath;
}

// Preload semua komponen penting
const COMPONENT_PATHS = {
    'landing-page': './pages/landing/landing-page.js',
    'login-page': './pages/auth/login/login-page.js',
    'register-page': './pages/auth/register/register-page.js',
    'dashboard-page': './pages/dashboard/dashboard-page.js',
    'result-page': './pages/result/result-page.js',
    'result-detail-page': './pages/result/detail/result-detail-page.js',
    'history-page': './pages/history/history-page.js',
    'article-page': './pages/article/article-page.js',
    'article-detail-page': './pages/article/detail/article-detail-page.js'
};

// Safe component registration
async function registerComponent(name, importPath) {
    if (customElements.get(name)) {
        console.log(`Component ${name} already registered`);
        return true;
    }

    try {
        console.log(`Registering component: ${name}`);

        // Gunakan import absolute untuk menghindari path issues
        const fullPath = resolveModulePath(importPath);
        console.log(`Importing from: ${fullPath}`);

        const module = await import(/* webpackMode: "eager" */ fullPath);

        if (module && module.default) {
            customElements.define(name, module.default);
            console.log(`Successfully registered: ${name}`);
            return true;
        } else {
            throw new Error(`No default export found in ${importPath}`);
        }
    } catch (error) {
        console.error(`Failed to register ${name}:`, error);

        // Fallback: Create a placeholder component
        customElements.define(name, class extends HTMLElement {
            connectedCallback() {
                this.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: white;">
                        <h3>Component Load Error</h3>
                        <p>Failed to load ${name}. Please refresh the page.</p>
                        <button onclick="window.location.reload()" 
                                style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            Refresh Page
                        </button>
                    </div>
                `;
            }
        });

        return false;
    }
}

// Main App Class
class App {
    constructor() {
        this.currentPage = null;
    }

    async renderPage() {
        const path = this.getCurrentPath();
        console.log('Rendering page for path:', path);

        const route = this.getRoute(path);
        console.log('Matched route:', route);

        if (route && route.template) {
            await this.loadPageComponent(route);
        } else {
            this.showError('Page not found');
        }
    }

    getCurrentPath() {
        const hash = window.location.hash;
        if (hash) {
            const cleanHash = hash.startsWith('#') ? hash.substring(1) : hash;
            const [path] = cleanHash.split('?');
            return path || '/';
        }
        return window.location.pathname;
    }

    getRoute(path) {
        const routes = {
            '/': { template: '<landing-page></landing-page>', title: 'Landing Page' },
            '/login': { template: '<login-page></login-page>', title: 'Login Page' },
            '/register': { template: '<register-page></register-page>', title: 'Register Page' },
            '/dashboard': { template: '<dashboard-page></dashboard-page>', title: 'Dashboard Page' },
            '/result': { template: '<result-page></result-page>', title: 'Result Page' },
            '/history': { template: '<history-page></history-page>', title: 'History Page' },
            '/article': { template: '<article-page></article-page>', title: 'Article Page' }
        };

        return routes[path] || routes['/'];
    }

    async loadPageComponent(route) {
        try {
            const mainContent = document.getElementById('mainContent');
            if (!mainContent) {
                throw new Error('Main content element not found');
            }

            mainContent.innerHTML = route.template;

            // Update title
            document.title = route.title + ' - Care Acne Application';

        } catch (error) {
            console.error('Error loading page:', error);
            this.showError('Failed to load page');
        }
    }

    showError(message) {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="color: white; text-align: center; padding: 20px;">
                    <h2>Application Error</h2>
                    <p>${message}</p>
                    <button onclick="window.location.reload()" 
                            style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }
}

// Initialize Application
async function initializeApp() {
    try {
        ErrorHandler.init();
        URLFixer.init();

        console.log('Starting application initialization...');

        // Pre-register all components
        const registrationPromises = Object.entries(COMPONENT_PATHS).map(
            ([name, path]) => registerComponent(name, path)
        );

        // Wait for critical components first
        await Promise.all([
            registerComponent('landing-page', './pages/landing/landing-page.js'),
            registerComponent('login-page', './pages/auth/login/login-page.js'),
            registerComponent('dashboard-page', './pages/dashboard/dashboard-page.js')
        ]);

        console.log('Critical components registered');

        // Continue with other components in background
        Promise.all(registrationPromises).then(() => {
            console.log('All components registered');
        });

        const app = new App();
        await app.renderPage();

        // Setup navigation listeners
        window.addEventListener('hashchange', () => app.renderPage());
        window.addEventListener('load', () => app.renderPage());

        console.log('Application initialized successfully');

    } catch (error) {
        console.error('Application initialization failed:', error);

        // Show user-friendly error
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = `
                <div style="color: white; text-align: center; padding: 20px;">
                    <h2>Application Failed to Load</h2>
                    <p>Sorry, something went wrong during initialization. Please refresh the page.</p>
                    <button onclick="window.location.reload()" 
                            style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }
}

// Start the application
initializeApp();