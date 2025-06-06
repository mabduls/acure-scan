import template from './landing-page-template.html';
import LandingPresenter from "./landing-presenter.js";
import { navigateToUrl } from '../../routes/routes.js';

class LandingPage extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = template;

        // Add smooth scrolling to navigation links
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupEventListeners() {
        // Add click event to login button
        const loginButton = this.querySelector('a.text-teal-700');
        if (loginButton) {
            loginButton.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToUrl('/login'); // Navigate to login page
            });
        }

        // Optionally add click event to sign up button if needed
        const signUpButton = this.querySelector('a.bg-teal-500');
        if (signUpButton) {
            signUpButton.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToUrl('/register');
            });
        }
    }
}

customElements.define('landing-page', LandingPage);

export default LandingPage;