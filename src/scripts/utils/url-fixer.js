export class URLFixer {
    static fixUrl(url) {
        // Jika URL sudah absolute, return as-is
        if (url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) {
            return url;
        }

        // Jika di GitHub Pages, tambahkan base path
        if (window.location.hostname.includes('github.io')) {
            const repoName = 'acure-scan';
            const basePath = '/' + repoName + '/';

            // Handle relative URLs
            if (url.startsWith('/') && !url.startsWith(basePath)) {
                return basePath + url.substring(1);
            }

            // Handle relative URLs without leading slash
            if (!url.startsWith('/') && !url.startsWith(basePath)) {
                return basePath + url;
            }
        }

        return url;
    }

    static interceptFetch() {
        const originalFetch = window.fetch;

        window.fetch = function (resource, options) {
            // Fix URL sebelum fetch
            if (typeof resource === 'string') {
                const fixedUrl = URLFixer.fixUrl(resource);
                return originalFetch.call(this, fixedUrl, options);
            }

            return originalFetch.call(this, resource, options);
        };
    }

    static interceptXHR() {
        const originalOpen = XMLHttpRequest.prototype.open;

        XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
            // Fix URL sebelum open
            if (typeof url === 'string') {
                const fixedUrl = URLFixer.fixUrl(url);
                return originalOpen.call(this, method, fixedUrl, async, user, password);
            }

            return originalOpen.call(this, method, url, async, user, password);
        };
    }

    static interceptImageLoading() {
        const originalImage = Image;

        // Override Image constructor
        window.Image = function () {
            const img = new originalImage();

            const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src').set;
            Object.defineProperty(img, 'src', {
                set: function (value) {
                    const fixedUrl = URLFixer.fixUrl(value);
                    return originalSrcSetter.call(this, fixedUrl);
                },
                get: Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src').get
            });

            return img;
        };
    }

    static interceptScriptLoading() {
        const originalCreateElement = document.createElement;

        document.createElement = function (tagName) {
            const element = originalCreateElement.call(document, tagName);

            if (tagName.toLowerCase() === 'script') {
                const originalSrcSetter = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').set;
                Object.defineProperty(element, 'src', {
                    set: function (value) {
                        const fixedUrl = URLFixer.fixUrl(value);
                        return originalSrcSetter.call(this, fixedUrl);
                    },
                    get: Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src').get
                });
            }

            return element;
        };
    }

    static interceptLinkElements() {
        const originalCreateElement = document.createElement;

        document.createElement = function (tagName) {
            const element = originalCreateElement.call(document, tagName);

            if (tagName.toLowerCase() === 'link') {
                const originalHrefSetter = Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').set;
                Object.defineProperty(element, 'href', {
                    set: function (value) {
                        const fixedUrl = URLFixer.fixUrl(value);
                        return originalHrefSetter.call(this, fixedUrl);
                    },
                    get: Object.getOwnPropertyDescriptor(HTMLLinkElement.prototype, 'href').get
                });
            }

            return element;
        };
    }

    static init() {
        console.log('URLFixer initialized');

        // Only intercept if we're on GitHub Pages
        if (window.location.hostname.includes('github.io')) {
            this.interceptFetch();
            this.interceptXHR();
            this.interceptImageLoading();
            this.interceptScriptLoading();
            this.interceptLinkElements();

            // Fix existing elements on page load
            this.fixExistingElements();
        }
    }

    static fixExistingElements() {
        // Fix all images
        document.querySelectorAll('img').forEach(img => {
            if (img.src) {
                const fixedUrl = this.fixUrl(img.src);
                if (fixedUrl !== img.src) {
                    img.src = fixedUrl;
                }
            }
        });

        // Fix all scripts
        document.querySelectorAll('script[src]').forEach(script => {
            const fixedUrl = this.fixUrl(script.src);
            if (fixedUrl !== script.src) {
                script.src = fixedUrl;
            }
        });

        // Fix all links
        document.querySelectorAll('link[href]').forEach(link => {
            const fixedUrl = this.fixUrl(link.href);
            if (fixedUrl !== link.href) {
                link.href = fixedUrl;
            }
        });

        // Fix all anchors
        document.querySelectorAll('a[href]').forEach(anchor => {
            const fixedUrl = this.fixUrl(anchor.href);
            if (fixedUrl !== anchor.href) {
                anchor.href = fixedUrl;
            }
        });
    }
}