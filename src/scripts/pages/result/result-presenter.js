class ResultPresenter {
    constructor(view) {
        this.view = view;
        this.scanResult = null;
    }

    init() {
        this.setupEventHandlers();
        this.loadScanResult();
    }

    setupEventHandlers() {
        const backButton = this.view.querySelector('#backButton');
        const scanAgainButton = this.view.querySelector('#scanAgainButton');
        const saveResultButton = this.view.querySelector('#saveResultButton');

        if (backButton) {
            backButton.addEventListener('click', () => {
                this.view.redirectTo('/dashboard');
            });
        }

        if (scanAgainButton) {
            scanAgainButton.addEventListener('click', () => {
                this.view.redirectTo('/dashboard');
            });
        }

        if (saveResultButton) {
            saveResultButton.addEventListener('click', () => {
                this.saveResult();
            });
        }
    }

    loadScanResult() {
        try {
            // Get scan ID from URL parameters
            const hash = window.location.hash; // Contoh: #/result?scanId=12345
            const queryString = hash.split('?')[1] || '';
            const urlParams = new URLSearchParams(queryString);
            const scanId = urlParams.get('scanId');

            if (!scanId) {
                throw new Error('No scan ID provided');
            }

            // Load result from localStorage
            const storedResult = localStorage.getItem(`scan_${scanId}`);
            if (!storedResult) {
                throw new Error('Scan result not found');
            }

            this.scanResult = JSON.parse(storedResult);
            this.displayResult();

        } catch (error) {
            console.error('Failed to load scan result:', error);
            this.view.showError('Failed to load scan results. Please try scanning again.');
        }
    }

    displayResult() {
        if (!this.scanResult) {
            this.view.showError('No scan result available');
            return;
        }

        try {
            // Display image
            const resultImage = this.view.querySelector('#resultImage');
            if (resultImage && this.scanResult.image) {
                resultImage.src = this.scanResult.image;
                resultImage.alt = `Scan result showing ${this.scanResult.dominantAcne}`;
            }

            // Display timestamp
            const timestampElement = this.view.querySelector('#scanTimestamp');
            if (timestampElement && this.scanResult.timestamp) {
                const date = new Date(this.scanResult.timestamp);
                timestampElement.textContent = `Scanned on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
            }

            // Display all predictions
            this.displayPredictions();

            // Display dominant result
            this.displayDominantResult();

            // Display recommendations
            this.displayRecommendations();

            // Add mock result indicator if applicable
            if (this.scanResult.isMockResult) {
                this.addMockResultIndicator();
            }

        } catch (error) {
            console.error('Error displaying results:', error);
            this.view.showError('Error displaying results');
        }
    }

    displayPredictions() {
        const resultsContainer = this.view.querySelector('#resultsContainer');
        if (!resultsContainer || !this.scanResult.predictions) return;

        resultsContainer.innerHTML = '';

        this.scanResult.predictions.forEach((prediction, index) => {
            const percentage = Math.round(prediction.confidence * 100);
            const isHighest = index === 0;

            const resultItem = document.createElement('div');
            resultItem.className = `flex items-center justify-between p-3 rounded-lg ${isHighest ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100'
                }`;

            resultItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full ${isHighest ? 'bg-blue-500' : 'bg-gray-400'
                }"></div>
                    <span class="font-medium ${isHighest ? 'text-blue-800' : 'text-gray-700'
                }">${prediction.label}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                        <div class="h-2 rounded-full ${isHighest ? 'bg-blue-500' : 'bg-gray-400'
                }" style="width: ${percentage}%"></div>
                    </div>
                    <span class="text-sm font-semibold ${isHighest ? 'text-blue-600' : 'text-gray-600'
                }">${percentage}%</span>
                </div>
            `;

            resultsContainer.appendChild(resultItem);
        });
    }

    displayDominantResult() {
        const dominantResultContainer = this.view.querySelector('#dominantResult');
        if (!dominantResultContainer || !this.scanResult.dominantAcne) return;

        const confidence = Math.round(this.scanResult.confidence * 100);

        dominantResultContainer.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div>
                    <h4 class="text-xl font-bold text-blue-900">${this.scanResult.dominantAcne}</h4>
                    <p class="text-sm text-blue-700">Confidence: ${confidence}%</p>
                </div>
            </div>
        `;
    }

    displayRecommendations() {
        const recommendationContainer = this.view.querySelector('#recommendation');
        if (!recommendationContainer || !this.scanResult.recommendations) return;

        const rec = this.scanResult.recommendations;

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

    addMockResultIndicator() {
        const mainContent = this.view.querySelector('main .bg-white');
        if (mainContent) {
            const indicator = document.createElement('div');
            indicator.className = 'mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg';
            indicator.innerHTML = `
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-orange-800 font-medium">Demo Mode: These are sample results for testing purposes.</span>
                </div>
            `;
            mainContent.insertBefore(indicator, mainContent.firstChild);
        }
    }

    saveResult() {
        try {
            // Create a downloadable result summary
            const resultSummary = {
                timestamp: this.scanResult.timestamp,
                dominantAcne: this.scanResult.dominantAcne,
                confidence: this.scanResult.confidence,
                predictions: this.scanResult.predictions,
                recommendations: this.scanResult.recommendations
            };

            const dataStr = JSON.stringify(resultSummary, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `acne-scan-result-${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            this.view.showNotification('Scan result saved successfully!');

        } catch (error) {
            console.error('Failed to save result:', error);
            this.view.showNotification('Failed to save result', false);
        }
    }
}

export default ResultPresenter;