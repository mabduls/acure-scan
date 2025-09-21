export class LogoutHandler {
    static async logout() {
        try {
            // Clear semua storage
            localStorage.clear();
            sessionStorage.clear();

            // Clear cookies
            document.cookie.split(';').forEach(cookie => {
                const [name] = cookie.split('=');
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            });

            // Redirect dengan logic yang konsisten
            const isGitHub = window.location.hostname.includes('github.io');
            const basePath = isGitHub ? '/acure-scan/' : '/';
            const redirectUrl = `${window.location.origin}${basePath}index.html#/login`;

            console.log('Logout redirect to:', redirectUrl);

            // Hard redirect tanpa history
            window.location.replace(redirectUrl);

            // Force reload setelah redirect
            setTimeout(() => {
                window.location.reload(true);
            }, 50);

        } catch (error) {
            console.error('Logout handler error:', error);
            // Ultimate fallback
            window.location.href = '/acure-scan/index.html#/login';
        }
    }
}