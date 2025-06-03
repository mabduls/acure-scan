import '../styles/styles.css';
import App from './pages/app';

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

// Fungsi router sederhana
function router() {
    const main = document.getElementById('mainContent');
    const hash = window.location.hash || '#/';

    if (hash.startsWith('#/artikel-detail/')) {
        const slug = hash.split('/')[2];
        main.innerHTML = `<artikel-detail-page slug="${slug}"></artikel-detail-page>`;
    } else if (hash === '#/' || hash === '') {
        main.innerHTML = '<landing-page></landing-page>';
    } else if (hash === '#/artikel') {
        main.innerHTML = '<artikel-page></artikel-page>';
    } else if (hash === '#/home') {
        main.innerHTML = '<home-page></home-page>';
    } else if (hash === '#/history') {
        main.innerHTML = '<history-page></history-page>';
    } else if (hash === '#/scan-result') {
        main.innerHTML = '<scan-result-page></scan-result-page>'; // ✅ Tambahan baru
    } else {
        main.innerHTML = '<p>Halaman tidak ditemukan</p>';
    }
}

async function initializeApp() {
    try {
        await Promise.all([
            safeDefine('landing-page', import('./pages/landing/landing-page')),
            safeDefine('home-page', import('./pages/home/home-page')),
            safeDefine('artikel-page', import('./pages/artikel/artikel-page')),
            safeDefine('history-page', import('./pages/history/history-page')),
            safeDefine('artikel-detail-page', import('./pages/artikel/artikel-detail-page')),
            safeDefine('scan-result-page', import('./pages/result/scan-result-page')) // ✅ Tambahan baru
        ]);

        const app = new App({
            content: document.getElementById('mainContent'),
        });

        router();

        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered');
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }

        window.addEventListener('hashchange', router);
        window.addEventListener('load', router);

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
