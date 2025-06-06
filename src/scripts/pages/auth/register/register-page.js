import RegisterPresenter from "./register-presenter.js";

class RegisterPage extends HTMLElement {
    constructor() {
        super();
        this._presenter = new RegisterPresenter(this);
    }

    connectedCallback() {
        this.render();
        this._addFormEventListeners();
    }

    render() {
        this.innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-cyan-50 p-4">
        <div class="rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl lg:max-w-5xl overflow-hidden my-8 transform transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,145,178,0.2)]">

          <!-- Left Panel - Registration Form -->
          <div class="w-full md:w-7/12 bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div class="self-end mb-4 md:mb-6">
              <span class="text-sm text-gray-600">Already have an account? </span>
              <a href="#/login" id="loginLink" class="text-sm font-medium text-cyan-600 hover:text-cyan-500 transition-colors duration-200 hover:underline">Sign in</a>
            </div>
            
            <h2 class="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p class="text-gray-500 mb-6">Join AcureScan today</p>
            
            <!-- Social Registration Buttons -->
            <button id="googleSignUpBtn" class="group w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 mb-3 overflow-hidden relative">
              <span class="absolute left-0 w-0 h-full bg-gradient-to-r from-cyan-100 to-transparent transition-all duration-500 group-hover:w-full"></span>
              <svg class="w-5 h-5 mr-3 relative z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l0.002-0.002l6.19,5.238C39.902,35.846,44,30.469,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
              <span class="relative z-10">Continue with Google</span>
            </button>
            
            <button id="emailSignUpBtnAlt" class="group w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 mb-5 overflow-hidden relative">
              <span class="absolute left-0 w-0 h-full bg-gradient-to-r from-cyan-100 to-transparent transition-all duration-500 group-hover:w-full"></span>
              <svg class="w-5 h-5 mr-3 text-gray-600 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span class="relative z-10">Continue with Email</span>
            </button>
            
            <!-- Divider -->
            <div class="my-5 flex items-center">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="mx-4 text-sm font-medium text-gray-500">OR</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>
            
            <!-- Registration Form -->
            <form id="registerForm" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="relative">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div class="group relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input type="text" id="firstName" name="firstName" required
                      class="appearance-none block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                      placeholder="John">
                  </div>
                </div>
                
                <div class="relative">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div class="group relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input type="text" id="lastName" name="lastName" required
                      class="appearance-none block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                      placeholder="Doe">
                  </div>
                </div>
              </div>

              <div class="relative">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div class="group relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input type="email" id="email" name="email" required
                    class="appearance-none block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                    placeholder="you@example.com">
                </div>
              </div>
              
              <div class="relative">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div class="group relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input type="password" id="password" name="password" required
                    class="appearance-none block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                    placeholder="••••••••">
                </div>
                <div id="passwordStrength" class="mt-1 hidden">
                  <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div id="passwordStrengthBar" class="h-full bg-red-500 transition-all duration-300"></div>
                  </div>
                  <p id="passwordStrengthText" class="text-xs mt-1 text-gray-500"></p>
                </div>
              </div>
              
              <div class="relative">
                <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div class="group relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input type="password" id="confirmPassword" name="confirmPassword" required
                    class="appearance-none block w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-all"
                    placeholder="••••••••">
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="termsAccepted" name="termsAccepted" type="checkbox" required
                    class="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="termsAccepted" class="font-medium text-gray-700">
                    I agree to the <a href="#" class="text-cyan-600 hover:text-cyan-500">Terms of Service</a> and <a href="#" class="text-cyan-600 hover:text-cyan-500">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <div>
                <button type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 transform hover:-translate-y-1">
                  Create Account
                </button>
              </div>
            </form>
          </div>

          <!-- Right Panel - Branding & Welcome -->
          <div class="w-full md:w-5/12 bg-gradient-to-br from-cyan-500 to-sky-600 p-8 md:p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400 rounded-full opacity-20 blur-xl"></div>
            <div class="absolute top-0 right-0 w-32 h-32 bg-sky-300 rounded-full opacity-20 blur-lg"></div>
            
            <!-- Logo -->
            <div class="absolute top-6 left-6 flex items-center z-10">
              <svg class="w-10 h-10 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.7071 9.29289C17.0976 8.90237 17.0976 8.2692 16.7071 7.87868C16.3166 7.48816 15.6834 7.48816 15.2929 7.87868L10.5 12.6716L8.70711 10.8787C8.31658 10.4882 7.68342 10.4882 7.29289 10.8787C6.90237 11.2692 6.90237 11.9024 7.29289 12.2929L9.79289 14.7929C10.1834 15.1834 10.8166 15.1834 11.2071 14.7929L16.7071 9.29289Z" />
              </svg>
              <span class="text-3xl font-bold tracking-tight" style="text-shadow: 0px 2px 4px rgba(0,0,0,0.3);">AcureScan</span>
            </div>
            
            <!-- Main Content -->
            <div class="mt-16 md:mt-0 w-full max-w-xs sm:max-w-sm z-10">
              <div class="w-full h-64 mb-6 relative overflow-hidden rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 bg-gradient-to-br from-cyan-200 to-sky-300 flex items-center justify-center">
                <!-- SVG illustration -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-semibold mb-2">Join Our Community</h3>
                <p class="text-sky-100 text-lg font-light leading-relaxed">Create your account to access our advanced skin analysis tools and personalized recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div id="registerNotification" aria-live="assertive" class="fixed top-5 right-5 z-[100] transition-all"></div>
      
      <!-- Loading Overlay -->
      <div id="loadingOverlay" class="hidden fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[101] transition-opacity duration-300">
        <div class="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center">
          <svg class="animate-spin h-10 w-10 text-cyan-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-lg font-medium text-gray-700">Processing...</p>
        </div>
      </div>
    `;
    }

    _addFormEventListeners() {
        const registerForm = this.querySelector("#registerForm");
        if (registerForm) {
            registerForm.addEventListener("submit", (event) => {
                event.preventDefault();
                this._presenter.handleRegistrationAttempt();
            });
        } else {
            console.error("View: #registerForm not found. Check render() method.");
        }

        const googleSignUpBtn = this.querySelector("#googleSignUpBtn");
        if (googleSignUpBtn) {
            googleSignUpBtn.addEventListener("click", () => {
                this._presenter.handleGoogleRegistration();
            });
        } else {
            console.error("View: #googleSignUpBtn not found.");
        }

        const emailSignUpBtnAlt = this.querySelector("#emailSignUpBtnAlt");
        if (emailSignUpBtnAlt) {
            emailSignUpBtnAlt.addEventListener("click", () => {
                this._presenter.handleAlternativeEmailRegistration();
            });
        } else {
            console.error("View: #emailSignUpBtnAlt not found.");
        }

        const loginLink = this.querySelector("#loginLink");
        if (loginLink) {
            loginLink.addEventListener("click", (e) => {
                if (loginLink.getAttribute("href") === "#/login") {
                    console.log(
                        "View: Login link clicked, SPA router should handle this."
                    );
                } else {
                    e.preventDefault();
                    this._presenter.handleLoginNavigation();
                }
            });
        } else {
            console.error("View: #loginLink not found.");
        }

        const passwordInput = this.querySelector("#password");
        if (passwordInput) {
            passwordInput.addEventListener("input", (e) => {
                this._presenter.handlePasswordStrengthCheck(e.target.value);
            });
        }

        const confirmPasswordInput = this.querySelector("#confirmPassword");
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener("input", () => {
                this._presenter.validatePasswordMatch();
            });
        }
    }

    getFormValues() {
        return {
            firstName: this.querySelector("#firstName")?.value.trim() || "",
            lastName: this.querySelector("#lastName")?.value.trim() || "",
            email: this.querySelector("#email")?.value.trim() || "",
            password: this.querySelector("#password")?.value || "",
            confirmPassword: this.querySelector("#confirmPassword")?.value || "",
            termsAccepted: this.querySelector("#termsAccepted")?.checked || false,
        };
    }

    updatePasswordStrength(strength, message) {
        const passwordStrength = this.querySelector("#passwordStrength");
        const passwordStrengthBar = this.querySelector("#passwordStrengthBar");
        const passwordStrengthText = this.querySelector("#passwordStrengthText");

        if (passwordStrength && passwordStrengthBar && passwordStrengthText) {
            passwordStrength.classList.remove("hidden");

            passwordStrengthBar.style.width = `${strength}%`;

            if (strength < 40) {
                passwordStrengthBar.className =
                    "h-full bg-red-500 transition-all duration-300";
            } else if (strength < 70) {
                passwordStrengthBar.className =
                    "h-full bg-yellow-500 transition-all duration-300";
            } else {
                passwordStrengthBar.className =
                    "h-full bg-green-500 transition-all duration-300";
            }

            passwordStrengthText.textContent = message;
        }
    }

    setPasswordError(error) {
        const confirmPasswordInput = this.querySelector("#confirmPassword");
        if (confirmPasswordInput) {
            if (error) {
                confirmPasswordInput.classList.add("border-red-500");
                confirmPasswordInput.classList.add("focus:border-red-500");
                confirmPasswordInput.classList.add("focus:ring-red-500");

                let errorMsg = confirmPasswordInput.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains("password-error")) {
                    errorMsg = document.createElement("p");
                    errorMsg.className = "text-red-500 text-xs mt-1 password-error";
                    errorMsg.textContent = "Passwords do not match";
                    confirmPasswordInput.parentNode.appendChild(errorMsg);
                }
            } else {
                confirmPasswordInput.classList.remove("border-red-500");
                confirmPasswordInput.classList.remove("focus:border-red-500");
                confirmPasswordInput.classList.remove("focus:ring-red-500");

                const errorMsg = confirmPasswordInput.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains("password-error")) {
                    errorMsg.remove();
                }
            }
        }
    }

    _showNotification(message, type = "info") {
        const notificationArea = this.querySelector("#registerNotification");
        if (!notificationArea) {
            console.error("View: #registerNotification element not found!");
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

        // Add appropriate icon based on notification type
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

    showRegistrationError(message) {
        console.error("View: Registration Error -", message);
        this._showNotification(message, "error");
    }

    showRegistrationSuccess(message) {
        console.log("View: Registration Success -", message);
        this._showNotification(message, "success");
    }

    showInfo(message) {
        console.log("View: Info -", message);
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
            "#registerForm input, #registerForm button, #googleSignUpBtn, #emailSignUpBtnAlt"
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
            "#registerForm input, #registerForm button, #googleSignUpBtn, #emailSignUpBtnAlt"
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
}

customElements.define("register-page", RegisterPage);
export default RegisterPage;
