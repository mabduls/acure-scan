import { navigateToUrl, getQueryParams } from '../../../routes/routes';
import ScanService from '../../../services/scan-service';
import { auth } from '../../../../server/config/firebase';

class ResultDetailPresenter {
    constructor(view) {
        this.view = view;
        this.scanId = null;
        this.scanData = null;
    }

    async init() {
        try {
            this.setupEventListeners();
            await this.loadScanData();
        } catch (error) {
            console.error('Initialization error:', error);
            this.showErrorState(error.message);
        }
    }

    setupEventListeners() {
        const backButton = this.view.querySelector('#backButton');
        if (backButton) {
            backButton.addEventListener('click', () => {
                navigateToUrl('/history');
            });
        }

        const retryButton = this.view.querySelector('#retryButton');
        if (retryButton) {
            retryButton.addEventListener('click', () => {
                this.loadScanData();
            });
        }
    }

    async loadScanData() {
        try {
            this.showLoadingState();

            // Get scan ID from URL
            const queryParams = getQueryParams();
            this.scanId = queryParams.scanId;

            if (!this.scanId) {
                throw new Error('No scan ID provided');
            }

            // Get current user
            const user = auth.currentUser;
            if (!user) {
                // Try to get user from localStorage if auth.currentUser is null
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (!userData || !userData.uid) {
                    throw new Error('User not authenticated');
                }
                this.userId = userData.uid;
            } else {
                this.userId = user.uid;
            }

            // Load scan data from Firestore
            this.scanData = await ScanService.getScanById(this.userId, this.scanId);

            if (!this.scanData) {
                throw new Error('Scan data not found');
            }

            this.renderScanData();
        } catch (error) {
            console.error('Failed to load scan data:', error);
            this.showErrorState(error.message);
        }
    }

    renderScanData() {
        const loadingIndicator = this.view.querySelector('#loadingIndicator');
        const errorMessage = this.view.querySelector('#errorMessage');
        const resultContent = this.view.querySelector('#resultDetailContent');

        loadingIndicator.classList.add('hidden');
        errorMessage.classList.add('hidden');
        resultContent.classList.remove('hidden');

        // Set timestamp
        const timestampElement = this.view.querySelector('#scanTimestamp');
        if (timestampElement && this.scanData.timestamp) {
            const date = new Date(this.scanData.timestamp);
            timestampElement.textContent = `Scanned on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
        }

        // Set image
        const imageElement = this.view.querySelector('#resultImage');
        if (imageElement && this.scanData.image) {
            imageElement.src = this.scanData.image;
            imageElement.alt = `Scan result showing ${this.scanData.dominantAcne}`;
        }

        // Render predictions
        this.renderPredictions();

        // Render dominant result
        this.renderDominantResult();

        // Render recommendations
        this.renderRecommendations();
    }

    renderPredictions() {
        const resultsContainer = this.view.querySelector('#resultsContainer');
        if (!resultsContainer || !this.scanData.predictions) return;

        resultsContainer.innerHTML = this.scanData.predictions.map(prediction => {
            const percentage = Math.round(prediction.confidence * 100);
            const isHighest = this.scanData.dominantAcne === prediction.label;

            return `
                <div class="flex justify-between items-center p-2 ${isHighest ? 'bg-blue-50' : 'bg-white'} rounded">
                    <span class="${isHighest ? 'font-semibold text-blue-800' : 'text-gray-700'}">${prediction.label}</span>
                    <div class="flex items-center">
                        <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div class="h-2 rounded-full ${isHighest ? 'bg-blue-500' : 'bg-gray-400'}" 
                                style="width: ${percentage}%"></div>
                        </div>
                        <span class="text-sm font-medium ${isHighest ? 'text-blue-600' : 'text-gray-600'}">
                            ${percentage}%
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderDominantResult() {
        const dominantResultContainer = this.view.querySelector('#dominantResult');
        if (!dominantResultContainer || !this.scanData.dominantAcne) return;

        const confidence = Math.round(this.scanData.confidence * 100);

        dominantResultContainer.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div>
                    <h4 class="text-xl font-bold text-blue-900">${this.scanData.dominantAcne}</h4>
                    <p class="text-sm text-blue-700">Confidence: ${confidence}%</p>
                </div>
            </div>
        `;
    }

    renderRecommendations() {
        const recommendationContainer = this.view.querySelector('#recommendation');
        if (!recommendationContainer || !this.scanData.recommendations) return;

        const rec = this.scanData.recommendations;

        recommendationContainer.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Treatment Steps
                    </h3>
                    <ul class="space-y-2">
                        ${rec.treatment.map(step => `
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
                        ${rec.ingredients.map(ingredient => `
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                ${ingredient}
                            </span>
                        `).join('')}
                    </div>
                    <div class="mt-4 p-3 bg-blue-100 rounded-lg">
                        <p class="text-blue-800 font-medium">Severity Level: 
                            <span class="font-bold">${rec.severity}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    showLoadingState() {
        this.view.querySelector('#loadingIndicator').classList.remove('hidden');
        this.view.querySelector('#errorMessage').classList.add('hidden');
        this.view.querySelector('#resultDetailContent').classList.add('hidden');
    }

    showErrorState(message) {
        this.view.querySelector('#loadingIndicator').classList.add('hidden');
        this.view.querySelector('#errorMessage').classList.remove('hidden');
        this.view.querySelector('#resultDetailContent').classList.add('hidden');

        const errorMessage = this.view.querySelector('#errorMessage p');
        if (errorMessage) {
            errorMessage.textContent = message || 'Failed to load scan details';
        }
    }
}

export default ResultDetailPresenter;