const routes = {
  "/": {
    template: "<landing-page></landing-page>",
  },
  "/login": {
    template: "<login-page></login-page>",
  },
  "/register": {
    template: "<register-page></register-page>",
  },
  "/dashboard": {
    template: "<home-page></home-page>",
  },
  "/artikel": {
    template: "<artikel-page></artikel-page>",
  },
  "/artikel-detail/:id": {
    template: "<artikel-detail-page></artikel-detail-page>",
  },
  "/history": {
    template: "<history-page></history-page>",
  },
  "/scan-result": {
    template: "<scan-result-page></scan-result-page>",
  },
};

function navigateToUrl(url) {
  console.log("Navigating to:", url);
  window.location.hash = url;
}

export { routes, navigateToUrl };
