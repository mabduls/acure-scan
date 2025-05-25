import { routes } from "../routes/routes";
import { getActivePathname, parsePathname } from "../routes/url-parser";

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    try {
      const pathname = getActivePathname();
      const { resource, id } = parsePathname(pathname);

      let routePattern = pathname === "/" ? "/" : `/${resource || ""}`;
      if (id) routePattern += "/:id";

      const route = routes[routePattern] || routes["/"];
      this._content.innerHTML = route.template;

      if (pathname === "/") {
        await this._initLandingPage();
      }
    } catch (error) {
      console.error("Failed to render page:", error);
      this._content.innerHTML = `
        <div style="color: white; padding: 2rem; text-align: center;">
            <h2>Error</h2>
            <p>${error.message}</p>
            <button onclick="window.location.hash='#/'">Back to Home</button>
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
}

export default App;
