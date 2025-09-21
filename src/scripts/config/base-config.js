export const getBasePath = () => {
    const path = window.location.pathname;
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