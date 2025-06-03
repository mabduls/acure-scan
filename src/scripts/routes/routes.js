const routes = {
  '/': {
    template: '<landing-page></landing-page>'
  },
  '/home': {
    template: '<home-page></home-page>'
  },
  '/artikel': {
    template: '<artikel-page></artikel-page>'
  },
  '/history': {
    template: '<history-page></history-page>'
  },
  '/artikel-detail/:slug': {
    template: '<artikel-detail-page></artikel-detail-page>'
  },
  '/scan-result': {
  template: '<scan-result-page></scan-result-page>'
}

};


function navigateToUrl(url) {
    window.location.hash = url;
}

export { routes, navigateToUrl };