import { register } from '../../../data/api.js';

class RegisterPresenter {
    constructor(view) {
        this._view = view;
        this._initFormListener();
    }

    _initFormListener() {
        const form = this._view.querySelector('#registerForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = form.querySelector('#email').value;
                const password = form.querySelector('#password').value;
                const confirmPassword = form.querySelector('#confirmPassword').value;
                const name = email.split('@')[0]; // Simple name from email

                // Basic validation
                if (password !== confirmPassword) {
                    this._showNotification('Passwords do not match', 'error');
                    return;
                }

                try {
                    // Show loading overlay
                    document.getElementById('loadingOverlay').classList.remove('hidden');

                    const user = await register(name, email, password);

                    // Hide loading overlay
                    document.getElementById('loadingOverlay').classList.add('hidden');

                    // Show success notification
                    this._showNotification('Registration successful!', 'success');

                    // Redirect to login or do something with the user data
                    console.log('Registered user:', user);

                } catch (error) {
                    // Hide loading overlay
                    document.getElementById('loadingOverlay').classList.add('hidden');

                    // Show error notification
                    this._showNotification(error.message || 'Registration failed', 'error');
                    console.error('Registration error:', error);
                }
            });
        }
    }

    _showNotification(message, type = 'info') {
        const notification = document.getElementById('registerNotification');
        notification.innerHTML = '';

        const alert = document.createElement('div');
        alert.className = `p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`;
        alert.textContent = message;

        notification.appendChild(alert);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

export default RegisterPresenter;