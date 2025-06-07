import "../styles/styles.css";
import App from "./pages/app";

if (module.hot) {
  module.hot.accept("./pages/app", () => {
    console.log("Accepting the updated App module!");
  });

  module.hot.accept("./pages/landing/landing-page", () => {
    console.log("Accepting the updated LandingPage module!");
    const LandingPage = require("./pages/landing/landing-page").default;
    if (customElements.get("landing-page")) {
      customElements.undefine("landing-page");
    }
    customElements.define("landing-page", LandingPage);
  });
}


import "./pages/landing/landing-page.js";
import "./pages/auth/login/login-page.js";
import "./pages/artikel/artikel-page.js";
import "./pages/artikel/artikel-detail-page.js";
import "./pages/home/home-page.js";
import "./pages/history/history-page.js";
import "./pages/result/scan-result-page.js";


async function safeDefine(name, importPromise) {
  if (!customElements.get(name)) {
    try {
      const { default: Component } = await importPromise;
      if (!customElements.get(name)) {
        customElements.define(name, Component);
      }
    } catch (error) {
      console.error(`Failed to register ${name}:`, error);
      throw error;
    }
  }
}

async function initializeApp() {
  try {
    // Dynamically import any components not directly imported above
    await Promise.all([
      safeDefine(
        "register-page",
        import("./pages/auth/register/register-page.js")
      ),
    ]);

    const app = new App({
      content: document.getElementById("mainContent"),
    });

    app.renderPage();

    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered");
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }

    window.addEventListener("hashchange", () => app.renderPage());
    window.addEventListener("load", () => app.renderPage());
  } catch (error) {
    console.error("Application initialization failed:", error);
    document.getElementById("mainContent").innerHTML = `
      <div style="color: white; text-align: center; padding: 20px;">
        <h2>Application Error</h2>
        <p>Sorry, something went wrong. Please try again later.</p>
      </div>
    `;
  }
}

initializeApp();
