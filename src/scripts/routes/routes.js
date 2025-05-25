const routes = {
  "/": {
    template: "<landing-page></landing-page>",
  },
  "/login": {
    template: "<login-page></login-page>",
  },
};

function navigateToUrl(url) {
  window.location.hash = url;
}

export { routes, navigateToUrl };
