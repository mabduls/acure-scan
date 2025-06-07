import { routes } from "../routes/routes";
import { getActivePathname, parsePathname } from "../routes/url-parser";

class App {
  constructor({ content }) {
    this._content = content;
    this._isAuthenticated = this._checkAuthentication();
    console.log("Auth status on init:", this._isAuthenticated);
  }

  _checkAuthentication() {
    return true;
  }

  async renderPage() {
    try {
      const pathname = getActivePathname();
      console.log("Rendering page for pathname:", pathname);

      const { resource, id } = parsePathname(pathname);

      let routePattern = pathname === "/" ? "/" : `/${resource || ""}`;
      if (id) routePattern += "/:id";

      console.log("Route pattern:", routePattern);

      const route = routes[routePattern] || routes["/"];
      console.log("Using route template:", route.template);

      this._content.innerHTML = route.template;

      if (routePattern === "/artikel-detail/:id" && id) {
        this._handleArticleDetail(id);
      }

      if (pathname === "/") {
        await this._initLandingPage();
      } else if (pathname === "/login") {
        await this._initLoginPage();
      } else if (pathname === "/artikel") {
        await this._initArtikelPage();
      } else if (pathname === "/dashboard") {
        await this._initDashboardPage();
      }
    } catch (error) {
      console.error("Failed to render page:", error);
      this._content.innerHTML = `
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md m-4">
          <h2 class="font-bold mb-2">Error Loading Page</h2>
          <p>${error.message}</p>
          <button 
            onclick="window.location.hash='#/'" 
            class="mt-4 bg-[#00667A] text-white px-4 py-2 rounded hover:bg-[#004b5d] transition-colors">
            Back to Home
          </button>
        </div>
      `;
    }
  }

  async _initLandingPage() {
    await customElements.whenDefined("landing-page");
    const landingPage = this._content.querySelector("landing-page");
    if (landingPage) {
      console.log("Landing page initialized");
    }
  }

  async _initLoginPage() {
    await customElements.whenDefined("login-page");
    const loginPage = this._content.querySelector("login-page");
    if (loginPage) {
      console.log("Login page initialized");
    }
  }

  async _initArtikelPage() {
    await customElements.whenDefined("artikel-page");
    const artikelPage = this._content.querySelector("artikel-page");
    if (artikelPage) {
      console.log("Artikel page initialized");
    }
  }

  async _initDashboardPage() {
    await customElements.whenDefined("home-page");
    const homePage = this._content.querySelector("home-page");
    if (homePage) {
      console.log("Dashboard page initialized");
    }
  }

  _handleArticleDetail(id) {
    const artikelDetailPage = this._content.querySelector(
      "artikel-detail-page"
    );
    if (artikelDetailPage) {
      console.log(`Initializing article detail for: ${id}`);
    }
  }
}

export default App;