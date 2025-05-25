class LoginPresenter {
  constructor(view) {
    this._view = view;
    this._loginAttempts = 0;
    this._maxLoginAttempts = 3;
    this._isLocked = false;
    this._lockDuration = 30000; 
    console.log("LoginPresenter initialized.");
  }

  /**
   * Validasi format email
   * @param {string} email - Email untuk divalidasi
   * @returns {boolean} - Hasil validasi
   */
  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validasi kekuatan password
   * @param {string} password - Password untuk divalidasi
   * @returns {boolean} - Hasil validasi
   */
  _isStrongPassword(password) {

    return (
      password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password)
    );
  }


  async handleLoginAttempt() {
    console.log("Presenter: handleLoginAttempt");

 
    if (this._isLocked) {
      this._view.showLoginError(
        "Akun terkunci sementara karena terlalu banyak percobaan. Silakan coba lagi nanti."
      );
      return;
    }

    this._view.showLoading();

    const email = this._view.getEmailValue();
    const password = this._view.getPasswordValue();


    if (!email || !password) {
      this._view.showLoginError("Email dan password tidak boleh kosong.");
      this._view.hideLoading();
      this._view.focusEmailInput();
      return;
    }


    if (!this._isValidEmail(email)) {
      this._view.showLoginError("Format email tidak valid.");
      this._view.hideLoading();
      this._view.focusEmailInput();
      return;
    }

    try {
      console.log(
        `Presenter: Attempting login with Email: ${email}, Password: ${
          password ? "******" : "(empty)"
        }`
      );


      await new Promise((resolve) => setTimeout(resolve, 1500));


      if (email === "user@example.com" && password === "password123") {

        this._loginAttempts = 0;
        this._view.showLoginSuccess("Login berhasil! Mengarahkan...");

  
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", email);


        setTimeout(() => {
          this._view.navigateTo("/dashboard");
        }, 1000);
      } else {
 
        this._loginAttempts++;


        if (this._loginAttempts >= this._maxLoginAttempts) {
          this._isLocked = true;
          this._view.showLoginError(
            `Terlalu banyak percobaan gagal. Akun terkunci selama 30 detik.`
          );


          setTimeout(() => {
            this._isLocked = false;
            this._loginAttempts = 0;
            console.log("Presenter: Account unlocked after timeout");
          }, this._lockDuration);
        } else {
          const remainingAttempts =
            this._maxLoginAttempts - this._loginAttempts;
          this._view.showLoginError(
            `Email atau password salah. Sisa percobaan: ${remainingAttempts}`
          );
        }

        this._view.focusEmailInput();
      }
    } catch (error) {
      console.error("Presenter: Login error", error);
      this._view.showLoginError(
        error.message || "Terjadi kesalahan saat login. Silakan coba lagi."
      );
    } finally {
      this._view.hideLoading();
    }
  }


  async handleGoogleLoginAttempt() {
    console.log("Presenter: handleGoogleLoginAttempt");
    this._view.showLoading();

    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));

      this._view.showLoginError(
        "Fitur Login dengan Google belum diimplementasikan. Gunakan login email."
      );
    } catch (error) {
      console.error("Presenter: Google login error", error);
      this._view.showLoginError(
        "Terjadi kesalahan saat mencoba login dengan Google."
      );
    } finally {
      this._view.hideLoading();
    }
  }

  handleAlternativeEmailLogin() {
    console.log("Presenter: handleAlternativeEmailLogin");
    this._view.showForgotPasswordInfo(
      "Silakan gunakan form di bawah untuk login dengan email Anda."
    );
    this._view.focusEmailInput();
  }

  handleSignUpNavigation() {
    console.log("Presenter: handleSignUpNavigation");

    this._view.navigateTo("/register");
  }


  async handleForgotPassword() {
    console.log("Presenter: handleForgotPassword");

    const email = this._view.getEmailValue();


    if (!email) {
      this._view.showLoginError(
        "Masukkan email Anda terlebih dahulu untuk reset password."
      );
      this._view.focusEmailInput();
      return;
    }


    if (!this._isValidEmail(email)) {
      this._view.showLoginError("Format email tidak valid.");
      this._view.focusEmailInput();
      return;
    }

    this._view.showLoading();

    try {

      await new Promise((resolve) => setTimeout(resolve, 1500));


      this._view.showForgotPasswordInfo(
        `Instruksi reset password telah dikirim ke ${email}. Silakan periksa inbox Anda.`
      );
    } catch (error) {
      console.error("Presenter: Forgot password error", error);
      this._view.showLoginError(
        "Terjadi kesalahan saat memproses permintaan reset password."
      );
    } finally {
      this._view.hideLoading();
    }
  }
}

export default LoginPresenter;
