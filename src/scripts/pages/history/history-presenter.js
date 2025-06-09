import { navigateToUrl } from '../../routes/routes';
import ScanService from '../../../scripts/services/scan-service';
import { auth } from '../../../server/config/firebase';
import { initializeAuth, getCurrentUser, getToken } from '../../utils/auth';

class HistoryPresenter {
    constructor(view) {
        this.view = view;
        initializeAuth();
        this.scans = [];
        this.currentPage = 1;
        this.scansPerPage = 6;
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.userId = null;
        this.unsubscribeAuth = null;
        this.init = this.init.bind(this);
    }

    async init() {
        try {
            this.setupEventListeners();
            await this.initializeUser();
            await this.loadScanHistory();
        } catch (error) {
            console.error('Initialization error:', error);
            this.showErrorState(error.message);
        }
    }

    setupEventListeners() {
        const backButton = this.view.querySelector('#backButton');
        backButton?.addEventListener('click', () => navigateToUrl('/dashboard'));

        const startScanButton = this.view.querySelector('#startScanButton');
        startScanButton?.addEventListener('click', () => navigateToUrl('/dashboard'));

        const filterType = this.view.querySelector('#filterType');
        filterType?.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.filterAndSortScans();
        });

        const sortBy = this.view.querySelector('#sortBy');
        sortBy?.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.filterAndSortScans();
        });

        this.view.querySelector('#prevPageButton')?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderScans();
            }
        });

        this.view.querySelector('#nextPageButton')?.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredScans.length / this.scansPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderScans();
            }
        });
    }

    async initializeUser() {
        // First check localStorage
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (storedUser) {
            this.userId = storedUser.uid;
            return;
        }

        // Then check auth state
        const user = await initializeAuth();
        if (user) {
            this.userId = user.uid;
            return;
        }

        // If still no user, redirect to login
        throw new Error('User not authenticated');
    }

    async loadScanHistory() {
        try {
            this.showLoadingState();
            if (!this.userId) throw new Error('User ID not available');

            const token = await getToken();

            // PERBAIKAN: Tambahkan logging untuk debugging
            console.log('Loading scans for user:', this.userId);

            this.scans = await ScanService.getUserScans(this.userId, token);

            console.log('Loaded scans:', this.scans); // Debug log

            if (this.scans.length === 0) {
                this.showEmptyState('No scan history yet. Start your first scan!');
                return;
            }

            this.filterAndSortScans();
        } catch (error) {
            console.error('Failed to load scan history:', error);

            // PERBAIKAN: Handle error yang lebih spesifik
            let errorMessage = error.message;
            if (error.message.includes('permission-denied')) {
                errorMessage = 'Access denied. Please login again.';
            } else if (error.message.includes('failed-precondition')) {
                errorMessage = 'Database configuration issue. Please contact support.';
            }

            this.showErrorState(errorMessage);

            // Redirect ke login jika masalah autentikasi
            if (/auth|authenticated|permission|denied/i.test(error.message)) {
                localStorage.clear();
                sessionStorage.clear();
                setTimeout(() => navigateToUrl('/login'), 2000);
            }
        }
    }

    filterAndSortScans() {
        // PERBAIKAN: Pastikan this.scans adalah array
        if (!Array.isArray(this.scans)) {
            console.error('Scans is not an array:', this.scans);
            this.scans = [];
        }

        this.filteredScans = this.scans.filter(scan => {
            if (this.currentFilter === 'all') return true;
            return (scan.dominantAcne || '').toLowerCase().includes(this.currentFilter.toLowerCase());
        });

        this.filteredScans.sort((a, b) => {
            const aTime = new Date(a.timestamp || a.createdAt || 0);
            const bTime = new Date(b.timestamp || b.createdAt || 0);

            switch (this.currentSort) {
                case 'newest': return bTime - aTime;
                case 'oldest': return aTime - bTime;
                case 'confidence': return (b.confidence || 0) - (a.confidence || 0);
                default: return 0;
            }
        });

        this.currentPage = 1;
        this.renderScans();
    }

    renderScans() {
        const scanResultsGrid = this.view.querySelector('#scanResultsGrid');
        const paginationControls = this.view.querySelector('#paginationControls');
        const pageInfo = this.view.querySelector('#pageInfo');
        const emptyState = this.view.querySelector('#emptyState');
        const loadingIndicator = this.view.querySelector('#loadingIndicator');

        loadingIndicator?.classList.add('hidden');

        if (!this.filteredScans || this.filteredScans.length === 0) {
            scanResultsGrid?.classList.add('hidden');
            paginationControls?.classList.add('hidden');
            this.showEmptyState('No scan results found for the selected filter.');
            return;
        }

        emptyState?.classList.add('hidden');
        scanResultsGrid?.classList.remove('hidden');

        const startIndex = (this.currentPage - 1) * this.scansPerPage;
        const endIndex = startIndex + this.scansPerPage;
        const scansToShow = this.filteredScans.slice(startIndex, endIndex);
        const totalPages = Math.ceil(this.filteredScans.length / this.scansPerPage);

        scanResultsGrid.innerHTML = scansToShow.map(scan => this.createScanCard(scan)).join('');

        if (this.filteredScans.length > this.scansPerPage) {
            paginationControls?.classList.remove('hidden');
            if (pageInfo) {
                pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
            }

            const prevButton = this.view.querySelector('#prevPageButton');
            const nextButton = this.view.querySelector('#nextPageButton');

            if (prevButton) prevButton.disabled = this.currentPage === 1;
            if (nextButton) nextButton.disabled = this.currentPage === totalPages;
        } else {
            paginationControls?.classList.add('hidden');
        }

        // PERBAIKAN: Event listener untuk scan card
        this.view.querySelectorAll('.scan-card').forEach(card => {
            card.addEventListener('click', () => {
                const scanId = card.dataset.scanId;
                if (scanId) {
                    navigateToUrl(`/result?scanId=${scanId}`);
                }
            });
        });
    }

    createScanCard(scan) {
        // PERBAIKAN: Handle data yang mungkin kosong
        const date = new Date(scan.timestamp || scan.createdAt || Date.now());
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const confidencePercentage = Math.round((scan.confidence || 0) * 100);
        const severityClass = confidencePercentage >= 80 ? 'bg-red-100 text-red-800' :
            confidencePercentage >= 60 ? 'bg-orange-100 text-orange-800' :
                'bg-green-100 text-green-800';

        // PERBAIKAN: Handle recommendations yang mungkin berbeda format
        let recommendations = [];
        if (scan.recommendations) {
            if (Array.isArray(scan.recommendations)) {
                recommendations = scan.recommendations;
            } else if (scan.recommendations.ingredients) {
                recommendations = scan.recommendations.ingredients;
            } else if (scan.recommendations.treatment) {
                recommendations = scan.recommendations.treatment;
            }
        }

        return `
        <div class="scan-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-lg" data-scan-id="${scan.id || scan.scanId}">
            <div class="relative h-40 bg-gray-100 overflow-hidden">
                ${scan.image ?
                `<img src="${scan.image}" alt="Scan result" class="w-full h-full object-cover">` :
                `<div class="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                    </div>`
            }
                <div class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    ${formattedDate}
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-teal-700">${scan.dominantAcne || 'Acne Detection'}</h3>
                    <span class="text-xs px-2 py-1 rounded-full ${severityClass}">${confidencePercentage}%</span>
                </div>
                <div class="flex flex-wrap gap-1 mt-2">
                    ${recommendations.slice(0, 3).map(item => `
                        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            ${typeof item === 'string' ? item : (item.name || 'Item')}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>`;
    }

    showLoadingState() {
        this.view.querySelector('#scanResultsGrid')?.classList.add('hidden');
        this.view.querySelector('#paginationControls')?.classList.add('hidden');
        this.view.querySelector('#emptyState')?.classList.add('hidden');
        this.view.querySelector('#loadingIndicator')?.classList.remove('hidden');
    }

    showEmptyState(message) {
        const loadingIndicator = this.view.querySelector('#loadingIndicator');
        const scanResultsGrid = this.view.querySelector('#scanResultsGrid');
        const paginationControls = this.view.querySelector('#paginationControls');
        const emptyState = this.view.querySelector('#emptyState');

        loadingIndicator?.classList.add('hidden');
        scanResultsGrid?.classList.add('hidden');
        paginationControls?.classList.add('hidden');

        if (emptyState) {
            emptyState.classList.remove('hidden');
            emptyState.innerHTML = `
                <div class="p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div class="flex flex-col items-center text-center">
                        <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <h3 class="text-xl font-semibold text-gray-700 mb-2">No Scan History</h3>
                        <p class="text-gray-600 mb-4">${message}</p>
                        <button id="startFirstScanButton" class="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                            Start Your First Scan
                        </button>
                    </div>
                </div>
            `;

            this.view.querySelector('#startFirstScanButton')?.addEventListener('click', () => navigateToUrl('/dashboard'));
        }
    }

    showErrorState(message) {
        const loadingIndicator = this.view.querySelector('#loadingIndicator');
        const scanResultsGrid = this.view.querySelector('#scanResultsGrid');
        const paginationControls = this.view.querySelector('#paginationControls');
        const emptyState = this.view.querySelector('#emptyState');

        loadingIndicator?.classList.add('hidden');
        scanResultsGrid?.classList.add('hidden');
        paginationControls?.classList.add('hidden');

        if (emptyState) {
            emptyState.classList.remove('hidden');
            emptyState.innerHTML = `
                <div class="p-6 bg-red-50 rounded-xl border border-red-200">
                    <div class="flex flex-col items-center text-center">
                        <svg class="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                        </svg>
                        <h3 class="text-xl font-semibold text-red-700 mb-2">Failed to Load History</h3>
                        <p class="text-gray-600 mb-4">${message}</p>
                        <button id="retryButton" class="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                            Try Again
                        </button>
                    </div>
                </div>
            `;

            this.view.querySelector('#retryButton')?.addEventListener('click', () => this.loadScanHistory());
        }
    }
}

export default HistoryPresenter;