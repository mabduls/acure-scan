export const getBasePath = () => {
    const path = window.location.pathname;
    
    // Untuk Netlify, tidak ada subpath seperti di GitHub Pages
    if (window.location.hostname.includes('netlify.app')) {
        return '/';
    }
    
    if (path.includes('/acure-scan/')) {
        return '/acure-scan/';
    }
    return '/';
};

export const getAbsolutePath = (relativePath) => {
    const base = getBasePath();
    const cleanRelative = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    return `${base}${cleanRelative}`;
};

export const isGitHubPages = () => {
    return window.location.hostname.includes('github.io');
};

export const isNetlify = () => {
    return window.location.hostname.includes('netlify.app');
};