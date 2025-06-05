import template from './landing-page-template.html';
import LandingPresenter from "./landing-presenter.js";

class LandingPage extends HTMLElement {
    connectedCallback() {
        this.render();
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
}

customElements.define('landing-page', LandingPage);

export default LandingPage;