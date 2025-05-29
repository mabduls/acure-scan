// register-presenter.js
class RegisterPresenter {
  constructor(view) {
    this._view = view;
    this._registrationAttempts = 0;
    this._maxRegistrationAttempts = 5;
    this._isLocked = false;
    this._lockDuration = 60000; // 60 seconds
    console.log("RegisterPresenter initialized.");
  }

  /**
   * Checks if an email is already registered
   * @param {string} email - Email to check
   * @returns {boolean} - Whether email is already registered
   */
  _isEmailAlreadyRegistered(email) {
    try {
      const registeredUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      return registeredUsers.some((user) => user.email === email);
    } catch (error) {
      console.error("Error checking registered emails:", error);
      return false;
    }
  }

  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Validation result
   */
  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates password strength
   * @param {string} password - Password to validate
   * @returns {Object} - Validation result with strength percentage and feedback
   */
  _validatePasswordStrength(password) {
    // Base result
    const result = {
      strength: 0,
      feedback: "Password too weak",
    };

    if (!password) {
      return result;
    }

    // Start with a base score of 0
    let score = 0;

    // Add points for length
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;

    // Add points for character variety
    if (/[a-z]/.test(password)) score += 10; // lowercase
    if (/[A-Z]/.test(password)) score += 10; // uppercase
    if (/\d/.test(password)) score += 10; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 15; // special chars

    // Penalize repeated characters and patterns
    if (/(.)\1{2,}/.test(password)) score -= 10; // 3+ repeated chars
    if (/(123|abc|qwe|asd|zxc)/i.test(password)) score -= 10; // common sequences

    // Common words penalty
    const commonWords = ["password", "admin", "123456", "qwerty", "welcome"];
    if (commonWords.some((word) => password.toLowerCase().includes(word))) {
      score -= 15;
    }

    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));
    result.strength = score;

    // Set feedback based on score
    if (score < 40) {
      result.feedback = "Weak password - add length and variety";
    } else if (score < 70) {
      result.feedback = "Moderate password - add special characters";
    } else {
      result.feedback = "Strong password!";
    }

    return result;
  }

  /**
   * Handles password strength check for visual feedback
   * @param {string} password - Current password value
   */
  handlePasswordStrengthCheck(password) {
    const strengthResult = this._validatePasswordStrength(password);
    this._view.updatePasswordStrength(
      strengthResult.strength,
      strengthResult.feedback
    );

    // If there's a confirmation password, validate the match
    this.validatePasswordMatch();
  }

  /**
   * Validates if password and confirmation match
   */
  validatePasswordMatch() {
    const formValues = this._view.getFormValues();
    const passwordsMatch = formValues.password === formValues.confirmPassword;

    // Only show error if confirmation field has content
    if (formValues.confirmPassword) {
      this._view.setPasswordError(!passwordsMatch);
    }

    return passwordsMatch;
  }

  /**
   * Handles registration attempt
   */
  async handleRegistrationAttempt() {
    console.log("Presenter: handleRegistrationAttempt");

    // Check if account is locked
    if (this._isLocked) {
      this._view.showRegistrationError(
        "Too many registration attempts. Please try again later."
      );
      return;
    }

    this._view.showLoading();

    try {
      const formValues = this._view.getFormValues();

      // Validate input
      if (
        !formValues.firstName ||
        !formValues.lastName ||
        !formValues.email ||
        !formValues.password
      ) {
        this._view.showRegistrationError("All fields are required.");
        this._view.hideLoading();
        return;
      }

      // Validate email format
      if (!this._isValidEmail(formValues.email)) {
        this._view.showRegistrationError("Invalid email format.");
        this._view.hideLoading();
        return;
      }

      // Validate password strength
      const passwordStrength = this._validatePasswordStrength(
        formValues.password
      );
      if (passwordStrength.strength < 40) {
        this._view.showRegistrationError(
          "Password is too weak. Please choose a stronger password."
        );
        this._view.hideLoading();
        return;
      }

      // Validate password match
      if (!this.validatePasswordMatch()) {
        this._view.showRegistrationError("Passwords do not match.");
        this._view.hideLoading();
        return;
      }

      // Validate terms acceptance
      if (!formValues.termsAccepted) {
        this._view.showRegistrationError(
          "You must accept the Terms of Service and Privacy Policy."
        );
        this._view.hideLoading();
        return;
      }

      console.log(
        `Presenter: Attempting registration with Email: ${formValues.email}, Name: ${formValues.firstName} ${formValues.lastName}`
      );

      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Email already exists check
      const isEmailTaken =
        formValues.email === "user@example.com" ||
        this._isEmailAlreadyRegistered(formValues.email);

      if (isEmailTaken) {
        this._registrationAttempts++;

        if (this._registrationAttempts >= this._maxRegistrationAttempts) {
          this._isLocked = true;
          this._view.showRegistrationError(
            "Too many registration attempts. Registration is locked for 60 seconds."
          );

          // Set timer to unlock registration
          setTimeout(() => {
            this._isLocked = false;
            this._registrationAttempts = 0;
            console.log("Presenter: Registration unlocked after timeout");
          }, this._lockDuration);
        } else {
          this._view.showRegistrationError(
            "Email is already in use. Please use a different email address."
          );
        }
      } else {
        // Registration success
        this._registrationAttempts = 0;
        this._view.showRegistrationSuccess(
          "Registration successful! Redirecting to login..."
        );

        // Store user data in localStorage (in a real app, this would be in a database)
        const registeredUsers = JSON.parse(
          localStorage.getItem("registeredUsers") || "[]"
        );
        registeredUsers.push({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password, // In a real app, this would be hashed
          dateRegistered: new Date().toISOString(),
        });
        localStorage.setItem(
          "registeredUsers",
          JSON.stringify(registeredUsers)
        );

        // Also store the email in a separate variable to prefill the login form
        localStorage.setItem("lastRegisteredEmail", formValues.email);

        // Redirect to login page after success
        setTimeout(() => {
          this._view.navigateTo("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Presenter: Registration error", error);
      this._view.showRegistrationError(
        error.message ||
          "An error occurred during registration. Please try again."
      );
    } finally {
      this._view.hideLoading();
    }
  }

  /**
   * Handles Google registration
   */
  async handleGoogleRegistration() {
    console.log("Presenter: handleGoogleRegistration");
    this._view.showLoading();

    try {
      // Simulate OAuth process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo - show "not implemented" message
      // In a real implementation, this would call the OAuth provider
      this._view.showRegistrationError(
        "Google registration is not implemented yet. Please use email registration."
      );
    } catch (error) {
      console.error("Presenter: Google registration error", error);
      this._view.showRegistrationError(
        "An error occurred while trying to register with Google."
      );
    } finally {
      this._view.hideLoading();
    }
  }

  /**
   * Handles alternative email registration
   */
  handleAlternativeEmailRegistration() {
    console.log("Presenter: handleAlternativeEmailRegistration");
    this._view.showInfo(
      "Please use the form below to register with your email."
    );
    const emailInput = this._view.querySelector("#email");
    if (emailInput) {
      emailInput.focus();
    }
  }

  /**
   * Handles navigation to login page
   */
  handleLoginNavigation() {
    console.log("Presenter: handleLoginNavigation");
    // In an SPA implementation, this would typically call the router
    // For demo, we're just navigating to a URL with hash
    this._view.navigateTo("/login");
  }
}

export default RegisterPresenter;
