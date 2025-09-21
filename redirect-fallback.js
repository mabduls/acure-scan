(function() {
    const path = window.location.pathname;
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages && !path.includes('/acure-scan/')) {
        console.log('Fallback redirect triggered');
        window.location.href = '/acure-scan/' + (window.location.hash || '#/');
    }
})();