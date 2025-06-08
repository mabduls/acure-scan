import template from './result-page-template.html';
import ResultPresenter from './result-presenter.js';
import { navigateToUrl, getQueryParams } from '../../routes/routes';

class ResultPage extends HTMLElement {
    constructor() {
        super();
        this.presenter = new ResultPresenter(this);
    }

    connectedCallback() {
        this.render();

        setTimeout(() => {
            this.presenter.init();
            this.loadScanResult().catch(error => {
                console.error('Failed to load scan result:', error);
                this.showError('Failed to load scan results');
            });
        }, 50);
    }

    render() {
        this.innerHTML = template;
    }

    async loadScanResult() {
        try {
            const queryParams = getQueryParams();
            const scanId = queryParams.scanId;

            console.log('Loading scan result with ID:', scanId);

            if (!scanId) {
                throw new Error('No scan ID provided');
            }

            const storageKey = `scan_${scanId}`;
            const savedData = localStorage.getItem(storageKey);

            if (!savedData) {
                throw new Error('Scan result not found');
            }

            this.scanResult = JSON.parse(savedData);

            console.log('Scan result loaded:', this.scanResult);

            const loadingIndicator = this.querySelector('#loadingIndicator');
            const resultContent = this.querySelector('#resultContent');
            const errorMessage = this.querySelector('#errorMessage');

            // Check if elements exist before manipulating them
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            if (resultContent) resultContent.style.display = 'block';
            if (errorMessage) errorMessage.style.display = 'none';

            // Render scan result
            this.renderScanResult();

        } catch (error) {
            console.error('Failed to load scan result:', error);

            // Safely handle error state
            const loadingIndicator = this.querySelector('#loadingIndicator');
            const resultContent = this.querySelector('#resultContent');
            const errorMessage = this.querySelector('#errorMessage');

            if (loadingIndicator) loadingIndicator.style.display = 'none';
            if (resultContent) resultContent.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'block';
        }
    }

    showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${isSuccess ? 'bg-green-500' : 'bg-red-500'
            } text-white`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    showError(message) {
        this.showNotification(message, false);
        const mainContent = this.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="flex-grow px-6 py-8">
                    <div class="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto text-center">
                        <div class="mb-6">
                            <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                            </svg>
                            <h1 class="text-2xl font-bold text-red-600 mb-2">Error</h1>
                            <p class="text-gray-600">${message}</p>
                        </div>
                        <button id="backToDashboard" class="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            `;

            const backButton = this.querySelector('#backToDashboard');
            if (backButton) {
                backButton.addEventListener('click', () => {
                    this.redirectTo('/dashboard');
                });
            }
        }
    }

    renderScanResult() {
        const resultContent = this.querySelector('#resultContent');

        if (!this.scanResult) {
            resultContent.innerHTML = '<p>No scan data available</p>';
            return;
        }

        resultContent.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Scan Results</h2>
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-700 mb-2">Dominant Acne Type</h3>
                <p class="text-lg text-teal-600">${this.scanResult.dominantAcne || 'Unknown'}</p>
                <p class="text-gray-500">Confidence: ${Math.round((this.scanResult.confidence || 0) * 100)}%</p>
            </div>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-700 mb-2">All Predictions</h3>
                <div class="space-y-2">
                    ${this.scanResult.predictions ?
                this.scanResult.predictions.map(pred => `
                            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span>${pred.label || 'Unknown'}</span>
                                <span class="font-medium">${Math.round((pred.confidence || 0) * 100)}%</span>
                            </div>
                        `).join('') :
                '<p>No prediction data available</p>'
            }
                </div>
            </div>
            
            <div class="flex space-x-4">
                <button id="scanAgainButton" class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
                    Scan Another Image
                </button>
                <button id="saveResultButton" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                    Save Result
                </button>
            </div>
        `;

        // Add event listeners to the new buttons
        const scanAgainButton = resultContent.querySelector('#scanAgainButton');
        if (scanAgainButton) {
            scanAgainButton.addEventListener('click', () => {
                this.redirectTo('/dashboard');
            });
        }

        const saveResultButton = resultContent.querySelector('#saveResultButton');
        if (saveResultButton) {
            saveResultButton.addEventListener('click', () => {
                this.presenter.saveResult();
            });
        }
    }

    redirectTo(path) {
        // Gunakan fungsi navigasi yang konsisten
        navigateToUrl(path);
    }
}

customElements.define('result-page', ResultPage);
export default ResultPage;