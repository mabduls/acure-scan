import template from './landing-page-template.html';
import LoginPresenter from "./login-presenter.js";

class LoginPage extends HTMLElement {
    constructor() {
        super();
        this._presenter = new LoginPresenter(this);
    }

    connectedCallback() {
        this.render();
        this._addFormEventListeners();
    }

    render() {
        this.innerHTML = template;
    }

    _addFormEventListeners() {
        const loginForm = this.querySelector("#loginForm");
        if (loginForm) {
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault();
                this._presenter.handleLoginAttempt();
            });
        } else {
            console.error("View: #loginForm not found. Check render() method.");
        }

        const googleSignInBtn = this.querySelector("#googleSignInBtn");
        if (googleSignInBtn) {
            googleSignInBtn.addEventListener("click", () => {
                this._presenter.handleGoogleLoginAttempt();
            });
        } else {
            console.error("View: #googleSignInBtn not found.");
        }

        const emailSignInBtnAlt = this.querySelector("#emailSignInBtnAlt");
        if (emailSignInBtnAlt) {
            emailSignInBtnAlt.addEventListener("click", () => {
                this._presenter.handleAlternativeEmailLogin();
            });
        } else {
            console.error("View: #emailSignInBtnAlt not found.");
        }

        const signupLinkTop = this.querySelector("#signupLinkTop");
        if (signupLinkTop) {
            signupLinkTop.addEventListener("click", (e) => {
                if (signupLinkTop.getAttribute("href") === "#/register") {
                    console.log(
                        "View: Sign up link clicked, SPA router should handle this."
                    );
                } else {
                    e.preventDefault();
                    this._presenter.handleSignUpNavigation();
                }
            });
        } else {
            console.error("View: #signupLinkTop not found.");
        }

        const forgotPasswordLink = this.querySelector("#forgotPasswordLink");
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener("click", (e) => {
                e.preventDefault();
                this._presenter.handleForgotPassword();
            });
        } else {
            console.error("View: #forgotPasswordLink not found.");
        }
    }

    getEmailValue() {
        const emailInput = this.querySelector("#email");
        return emailInput ? emailInput.value.trim() : "";
    }

    getPasswordValue() {
        const passwordInput = this.querySelector("#password");
        return passwordInput ? passwordInput.value : "";
    }

    _showNotification(message, type = "info") {
        const notificationArea = this.querySelector("#loginNotification");
        if (!notificationArea) {
            console.error("View: #loginNotification element not found!");
            return;
        }

        const bgColor =
            type === "error"
                ? "bg-red-500"
                : type === "success"
                    ? "bg-green-500"
                    : "bg-blue-500";
        const notificationId = `notif-${Date.now()}`;

        const alertDiv = document.createElement("div");
        alertDiv.id = notificationId;
        alertDiv.className = `${bgColor} text-white p-4 rounded-lg shadow-xl mb-3 flex items-center transform transition-all duration-300 translate-x-0 opacity-100 scale-100`;
        alertDiv.setAttribute("role", "alert");

        const iconSvg = document.createElement("div");
        iconSvg.className = "mr-3 flex-shrink-0";

        if (type === "error") {
            iconSvg.innerHTML = `<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>`;
        } else if (type === "success") {
            iconSvg.innerHTML = `<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>`;
        } else {
            iconSvg.innerHTML = `<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>`;
        }

        alertDiv.appendChild(iconSvg);

        const messageSpan = document.createElement("span");
        messageSpan.textContent = message;
        alertDiv.appendChild(messageSpan);

        while (notificationArea.firstChild) {
            notificationArea.removeChild(notificationArea.firstChild);
        }
        notificationArea.appendChild(alertDiv);

        setTimeout(() => {
            const activeNotif = this.querySelector(`#${notificationId}`);
            if (activeNotif) {
                activeNotif.classList.add("translate-x-0");
            }
        }, 10);

        setTimeout(() => {
            const activeNotif = this.querySelector(`#${notificationId}`);
            if (activeNotif) {
                activeNotif.classList.add("translate-x-full", "opacity-0");
                activeNotif.addEventListener("transitionend", () =>
                    activeNotif.remove()
                );
            }
        }, 5000);
    }

    showLoginError(message) {
        console.error("View: Login Error -", message);
        this._showNotification(message, "error");
    }

    showLoginSuccess(message) {
        console.log("View: Login Success -", message);
        this._showNotification(message, "success");
    }

    showForgotPasswordInfo(message) {
        console.log("View: Forgot Password Info -", message);
        this._showNotification(message, "info");
    }

    showLoading() {
        console.log("View: Showing loading...");
        const overlay = this.querySelector("#loadingOverlay");
        if (overlay) {
            overlay.classList.remove("hidden");

            overlay.offsetHeight;
            overlay.classList.add("opacity-100");
        } else {
            console.error("View: #loadingOverlay element not found!");
        }

        this.querySelectorAll(
            "#loginForm input, #loginForm button, #googleSignInBtn, #emailSignInBtnAlt"
        ).forEach((el) => (el.disabled = true));
    }

    hideLoading() {
        console.log("View: Hiding loading...");
        const overlay = this.querySelector("#loadingOverlay");
        if (overlay) {
            overlay.classList.add("opacity-0");
            setTimeout(() => {
                overlay.classList.add("hidden");
            }, 300);
        } else {
            console.error("View: #loadingOverlay element not found!");
        }

        this.querySelectorAll(
            "#loginForm input, #loginForm button, #googleSignInBtn, #emailSignInBtnAlt"
        ).forEach((el) => (el.disabled = false));
    }

    navigateTo(path) {
        console.log(`View: Navigating to ${path}`);
        if (path.startsWith("/")) {
            window.location.hash = path.substring(1);
        } else if (path.startsWith("#/")) {
            window.location.hash = path;
        } else {
            window.location.hash = path;
        }
    }

    focusEmailInput() {
        const emailInput = this.querySelector("#email");
        if (emailInput) {
            emailInput.focus();
        }
    }
}

customElements.define("login-page", LoginPage);
export default LoginPage;