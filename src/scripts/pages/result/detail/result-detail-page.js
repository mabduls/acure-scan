import template from './result-detail-page-template.html';
import ResultDetailPresenter from './result-detail-presenter.js';

class ResultDetailPage extends HTMLElement {
    constructor() {
        super();
        this.presenter = new ResultDetailPresenter(this);
    }

    connectedCallback() {
        this.render();
        this.presenter.init().catch(error => {
            console.error('Failed to initialize result detail page:', error);
            this.showError(error.message);
        });
    }

    render() {
        this.innerHTML = template;
    }

    showLoading() {
        this.querySelector('#loadingIndicator').classList.remove('hidden');
        this.querySelector('#errorMessage').classList.add('hidden');
        this.querySelector('#resultDetailContent').classList.add('hidden');
    }

    hideLoading() {
        this.querySelector('#loadingIndicator').classList.add('hidden');
    }

    showError(message) {
        this.querySelector('#loadingIndicator').classList.add('hidden');
        this.querySelector('#errorMessage').classList.remove('hidden');
        this.querySelector('#resultDetailContent').classList.add('hidden');

        const errorElement = this.querySelector('#errorMessage p');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    showContent() {
        this.querySelector('#loadingIndicator').classList.add('hidden');
        this.querySelector('#errorMessage').classList.add('hidden');
        this.querySelector('#resultDetailContent').classList.remove('hidden');
    }

    setImage(src) {
        const img = this.querySelector('#resultImage');
        if (img) img.src = src;
    }

    setTimestamp(date) {
        const element = this.querySelector('#scanTimestamp');
        if (element) {
            element.textContent = `Scanned on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
        }
    }

    renderPredictions(predictions, dominantAcne) {
        const container = this.querySelector('#resultsContainer');
        if (!container) return;

        container.innerHTML = predictions.map(pred => `
            <div class="flex justify-between items-center p-2 ${dominantAcne === pred.label ? 'bg-blue-50' : 'bg-white'} rounded">
                <span class="${dominantAcne === pred.label ? 'font-semibold text-blue-800' : 'text-gray-700'}">
                    ${pred.label}
                </span>
                <div class="flex items-center">
                    <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div class="h-2 rounded-full ${dominantAcne === pred.label ? 'bg-blue-500' : 'bg-gray-400'}" 
                            style="width: ${Math.round(pred.confidence * 100)}%"></div>
                    </div>
                    <span class="text-sm font-medium ${dominantAcne === pred.label ? 'text-blue-600' : 'text-gray-600'}">
                        ${Math.round(pred.confidence * 100)}%
                    </span>
                </div>
            </div>
        `).join('');
    }

    renderDominantResult(dominantAcne, confidence) {
        const container = this.querySelector('#dominantResult');
        if (!container) return;

        container.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div>
                    <h4 class="text-xl font-bold text-blue-900">${dominantAcne}</h4>
                    <p class="text-sm text-blue-700">Confidence: ${Math.round(confidence * 100)}%</p>
                </div>
            </div>
        `;
    }

    renderRecommendations(recommendations) {
        const container = this.querySelector('#recommendation');
        if (!container || !recommendations) return;

        container.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Treatment Steps
                    </h3>
                    <ul class="space-y-2">
                        ${recommendations.treatment.map(step => `
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span class="text-green-700">${step}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                        </svg>
                        Key Ingredients
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        ${recommendations.ingredients.map(ingredient => `
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                ${ingredient}
                            </span>
                        `).join('')}
                    </div>
                    <div class="mt-4 p-3 bg-blue-100 rounded-lg">
                        <p class="text-blue-800 font-medium">Severity Level: 
                            <span class="font-bold">${recommendations.severity}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('result-detail-page', ResultDetailPage);
export default ResultDetailPage;