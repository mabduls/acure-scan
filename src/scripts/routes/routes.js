const routes = {
    '/': {
        template: '<landing-page></landing-page>'
    }
};

function navigateToUrl(url) {
    window.location.hash = url;
}

export { routes, navigateToUrl };