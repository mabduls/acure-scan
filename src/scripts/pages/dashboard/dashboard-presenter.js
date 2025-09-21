import { logoutUser } from '../../../server/services/auth-service.js';
import MLService from '../../services/ml-service.js';
import { navigateToUrl } from '../../routes/routes.js';
import { logout } from '../../data/api.js';

class DashboardPresenter {
    constructor(view) {
        this.view = view;
        this.isDropdownOpen = false;
        this.imageData = null;
        this.cropState = {
            startX: 0,
            startY: 0,
            isCropping: false
        };
    }

    init() {
        this.setupDropdownHandler();
        this.setupLogoutHandler();
        this.setupClickOutsideHandler();
        this.setupImageUploadHandler();
        this.setupCropHandlers();
        this.setupHistoryNavigation();
        this.setupArticleNavigation();
    }

    setupHistoryNavigation() {
        const historyTrigger = this.view.querySelector('#historyTrigger');
        if (historyTrigger) {
            historyTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.view.redirectTo('/history');
            });
        }
    }

    setupArticleNavigation() {
        const articleTrigger = this.view.querySelector('#articleTrigger');
        if (articleTrigger) {
            articleTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.view.redirectTo('/article');
            });
        }
    }

    setupDropdownHandler() {
        const dropdownButton = this.view.querySelector('#profileDropdownButton');
        const dropdownMenu = this.view.querySelector('#profileDropdown');

        dropdownButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });
    }

    setupLogoutHandler() {
        const logoutButton = this.view.querySelector('#logoutButton');

        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const confirmLogout = confirm('Are you sure you want to logout?');
            if (!confirmLogout) return;

            try {
                this.view.showNotification('Logging out...');

                // Clear all storage first
                localStorage.removeItem('userToken');
                localStorage.removeItem('userData');
                sessionStorage.clear();

                // Clear any scan data
                Object.keys(localStorage)
                    .filter(key => key.startsWith('scan_'))
                    .forEach(key => localStorage.removeItem(key));

                this.view.showNotification('Logout successful');

                // PERBAIKAN KHUSUS: Redirect yang benar untuk GitHub Pages
                setTimeout(() => {
                    const isGitHub = window.location.hostname.includes('github.io');

                    if (isGitHub) {
                        // Untuk GitHub Pages, redirect langsung ke base URL tanpa hash
                        // Ini akan memuat ulang halaman ke root aplikasi
                        window.location.href = '/acure-scan/';
                    } else {
                        // Untuk local development, gunakan hash routing
                        window.location.hash = '#/login';
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                    }
                }, 500);

            } catch (error) {
                console.error('Logout error:', error);

                // Fallback: Clear storage dan redirect anyway
                localStorage.clear();
                sessionStorage.clear();

                // Fallback redirect khusus GitHub Pages
                const isGitHub = window.location.hostname.includes('github.io');
                if (isGitHub) {
                    window.location.href = '/acure-scan/';
                } else {
                    window.location.hash = '#/login';
                }
            }
        });
    }

    setupImageUploadHandler() {
        const uploadTrigger = this.view.querySelector('#uploadTrigger');
        const imageInput = this.view.querySelector('#imageInput');
        const modal = this.view.querySelector('#imageUploadModal');
        const imageElement = this.view.querySelector('#uploadedImage');

        uploadTrigger.addEventListener('click', () => {
            imageInput.value = '';
            imageInput.click();
        });

        imageInput.addEventListener('change', async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            if (!file.type.match('image.*')) {
                this.view.showNotification('Please select an image file (JPEG/PNG)', false);
                return;
            }

            this.view.showNotification('Loading image...');

            try {
                const imageData = await this.readFileAsDataURL(file);
                this.imageData = imageData;
                await this.showImageModal();

            } catch (error) {
                console.error('Image upload error:', error);
                this.view.showNotification('Failed to load image', false);
            }
        });
    }

    readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.onabort = () => reject(new Error('File reading aborted'));

            reader.readAsDataURL(file);
        });
    }

    setupCropHandlers() {
        const modal = this.view.querySelector('#imageUploadModal');
        const cancelButton = this.view.querySelector('#cancelCropButton');
        const scanButton = this.view.querySelector('#scanButton');
        const imageElement = this.view.querySelector('#uploadedImage');
        const cropOverlay = this.view.querySelector('#cropOverlay');

        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeImageModal();
        });

        scanButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.handleScan();
        });

        const imageContainer = modal.querySelector('div.relative');

        imageContainer.addEventListener('mousedown', (e) => {
            if (!this.imageData) return;

            this.cropState = {
                startX: e.clientX - imageContainer.getBoundingClientRect().left,
                startY: e.clientY - imageContainer.getBoundingClientRect().top,
                isCropping: true
            };

            cropOverlay.style.left = this.cropState.startX + 'px';
            cropOverlay.style.top = this.cropState.startY + 'px';
            cropOverlay.style.width = '0';
            cropOverlay.style.height = '0';
            cropOverlay.style.display = 'block';
        });

        imageContainer.addEventListener('mousemove', (e) => {
            if (!this.cropState.isCropping || !this.imageData) return;

            const currentX = e.clientX - imageContainer.getBoundingClientRect().left;
            const currentY = e.clientY - imageContainer.getBoundingClientRect().top;

            const width = currentX - this.cropState.startX;
            const height = currentY - this.cropState.startY;

            cropOverlay.style.width = Math.abs(width) + 'px';
            cropOverlay.style.height = Math.abs(height) + 'px';

            if (width < 0) {
                cropOverlay.style.left = currentX + 'px';
            }
            if (height < 0) {
                cropOverlay.style.top = currentY + 'px';
            }
        });

        imageContainer.addEventListener('mouseup', () => {
            this.cropState.isCropping = false;
        });
    }

    async showImageModal() {
        if (!this.imageData) {
            console.error('No image data to display');
            return;
        }

        const modal = this.view.querySelector('#imageUploadModal');
        const imageElement = this.view.querySelector('#uploadedImage');
        const cropOverlay = this.view.querySelector('#cropOverlay');

        if (!modal || !imageElement) {
            console.error('Modal or image element not found');
            return;
        }

        modal.classList.remove('hidden');
        modal.style.display = 'flex';

        imageElement.style.display = 'block';
        imageElement.src = '';

        try {
            await this.loadImageToElement(imageElement, this.imageData);

            if (cropOverlay) {
                cropOverlay.style.display = 'none';
                cropOverlay.style.width = '0';
                cropOverlay.style.height = '0';
            }

        } catch (error) {
            console.error('Failed to display image:', error);
            modal.classList.add('hidden');
            this.view.showNotification('Failed to display image', false);
        }
    }

    loadImageToElement(imgElement, src) {
        return new Promise((resolve, reject) => {
            imgElement.onload = () => resolve();
            imgElement.onerror = () => reject(new Error('Image element failed to load'));

            const timeout = setTimeout(() => {
                reject(new Error('Image loading timed out'));
            }, 5000);

            imgElement.onload = () => {
                clearTimeout(timeout);
                resolve();
            };

            imgElement.src = src;
        });
    }

    getCroppedImage() {
        const cropOverlay = this.view.querySelector('#cropOverlay');
        const imageElement = this.view.querySelector('#uploadedImage');

        if (!imageElement || !imageElement.src) {
            console.error('No image available for cropping');
            return null;
        }

        if (parseInt(cropOverlay.style.width) <= 0 || parseInt(cropOverlay.style.height) <= 0) {
            console.log('No crop applied, using original image');
            return imageElement.src;
        }

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const container = this.view.querySelector('#imageUploadModal div.relative');

            const containerRect = container.getBoundingClientRect();
            const overlayRect = cropOverlay.getBoundingClientRect();

            const x = overlayRect.left - containerRect.left;
            const y = overlayRect.top - containerRect.top;
            const width = parseInt(cropOverlay.style.width);
            const height = parseInt(cropOverlay.style.height);

            if (width <= 0 || height <= 0 || x < 0 || y < 0) {
                console.error('Invalid crop dimensions:', { x, y, width, height });
                return imageElement.src;
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(
                imageElement,
                x, y, width, height,
                0, 0, width, height
            );

            return canvas.toDataURL('image/jpeg', 0.9);
        } catch (error) {
            console.error('Cropping failed:', error);
            return imageElement.src;
        }
    }

    resetCropState() {
        this.cropState = {
            startX: 0,
            startY: 0,
            isCropping: false
        };
    }

    setupClickOutsideHandler() {
        document.addEventListener('click', () => {
            if (this.isDropdownOpen) {
                this.closeDropdown();
            }
        });
    }

    toggleDropdown() {
        const dropdownMenu = this.view.querySelector('#profileDropdown');
        if (this.isDropdownOpen) {
            dropdownMenu.classList.add('hidden');
        } else {
            dropdownMenu.classList.remove('hidden');
        }
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown() {
        const dropdownMenu = this.view.querySelector('#profileDropdown');
        dropdownMenu.classList.add('hidden');
        this.isDropdownOpen = false;
    }

    async handleScan() {
        const croppedImage = this.getCroppedImage();
        if (!croppedImage) {
            this.view.showNotification('No image to process', false);
            return;
        }

        try {
            const modal = this.view.querySelector('#imageUploadModal');
            modal.classList.add('hidden');

            this.view.showNotification('Preparing image for analysis...');

            const img = new Image();
            img.crossOrigin = 'Anonymous';

            const imageLoadPromise = new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Image loading timed out'));
                }, 15000);

                img.onload = () => {
                    clearTimeout(timeout);

                    if (img.width === 0 || img.height === 0) {
                        reject(new Error('Invalid image dimensions'));
                        return;
                    }

                    if (img.width < 50 || img.height < 50) {
                        reject(new Error('Image too small for analysis (minimum 50x50 pixels)'));
                        return;
                    }

                    console.log('Image loaded for processing:', img.width, 'x', img.height);
                    resolve(img);
                };

                img.onerror = (error) => {
                    clearTimeout(timeout);
                    console.error('Image load error:', error);
                    reject(new Error('Failed to load image for processing'));
                };
            });

            img.src = croppedImage;
            await imageLoadPromise;

            this.view.showNotification('Initializing AI model...');

            try {
                const modelAccessible = await MLService.testModelPath();
                if (!modelAccessible) {
                    console.warn('Model files not accessible, switching to demo mode');
                    this.view.showNotification('AI model not available, using demo mode...');

                    const result = await MLService.detectAcneFallback(img);
                    console.log('Fallback detection successful:', result);

                    const scanId = await this.saveScanResultSync(result);
                    console.log('Scan result saved with ID:', scanId);

                    this.view.showNotification('Demo analysis complete! Redirecting to results...');

                    await this.redirectToResultPage(scanId);
                    return;
                }
            } catch (testError) {
                console.error('Model accessibility test failed:', testError);
            }

            this.view.showNotification('Analyzing image with AI model...');

            const detectionPromise = MLService.detectAcne(img);
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('AI analysis timed out. Please try with a smaller image.'));
                }, 60000);
            });

            const result = await Promise.race([detectionPromise, timeoutPromise]);

            if (!result || typeof result !== 'object') {
                throw new Error('Invalid detection result received');
            }

            if (!result.predictions || !Array.isArray(result.predictions) || result.predictions.length === 0) {
                throw new Error('No predictions received from AI model');
            }

            console.log('Detection successful:', result);

            const scanId = await this.saveScanResultSync(result);
            console.log('Scan result saved with ID:', scanId);

            this.view.showNotification('Analysis complete! Redirecting to results...');

            await this.redirectToResultPage(scanId);

        } catch (error) {
            console.error('Scan error:', error);
            this.handleScanError(error);
        }
    }

    async redirectToResultPage(scanId) {
        try {
            console.log('Starting redirect to result page with scanId:', scanId);

            const storedData = localStorage.getItem(`scan_${scanId}`);
            if (!storedData) {
                throw new Error('Scan data not found before redirect');
            }

            console.log('Scan data verified, proceeding with redirect');

            const resultUrl = `/result?scanId=${scanId}`;
            console.log('Redirecting to:', resultUrl);

            const { navigateToUrl } = await import('../../routes/routes.js');

            setTimeout(() => {
                navigateToUrl(resultUrl);

                setTimeout(() => {
                    const currentHash = window.location.hash;
                    const expectedHash = `#${resultUrl}`;

                    if (currentHash !== expectedHash) {
                        console.warn('Primary redirect failed, forcing navigation');
                        window.location.hash = expectedHash;

                        setTimeout(() => {
                            if (window.location.hash !== expectedHash) {
                                console.error('Redirect completely failed, reloading page');
                                window.location.reload();
                            }
                        }, 500);
                    }
                }, 200);
            }, 1000);

        } catch (error) {
            console.error('Redirect error:', error);

            const fallbackUrl = `#/result?scanId=${scanId}`;
            console.log('Using fallback redirect to:', fallbackUrl);

            window.location.hash = fallbackUrl;

            setTimeout(() => {
                if (!window.location.hash.includes(`scanId=${scanId}`)) {
                    console.error('All redirect methods failed, reloading page');
                    window.location.href = fallbackUrl;
                    window.location.reload();
                }
            }, 1000);
        }
    }

    saveScanResultSync(result) {
        return new Promise((resolve, reject) => {
            try {
                const scanId = Date.now();
                const storageKey = `scan_${scanId}`;

                result.timestamp = result.timestamp || new Date().toISOString();
                result.image = result.image || this.imageData;

                const resultStr = JSON.stringify(result);
                if (resultStr.length > 5000000) {
                    console.warn('Scan result too large, reducing image data');
                    const compressedResult = { ...result };
                    compressedResult.image = '';
                    result = compressedResult;
                }

                console.log('Attempting to save scan result with ID:', scanId);

                try {
                    localStorage.setItem(storageKey, JSON.stringify(result));
                    console.log('Scan result saved successfully');
                } catch (e) {
                    if (e.name === 'QuotaExceededError') {
                        console.warn('LocalStorage full, clearing old scans');
                        Object.keys(localStorage)
                            .filter(key => key.startsWith('scan_'))
                            .sort()
                            .slice(0, 5)
                            .forEach(key => {
                                console.log('Removing old scan:', key);
                                localStorage.removeItem(key);
                            });

                        localStorage.setItem(storageKey, JSON.stringify(result));
                        console.log('Scan result saved after cleanup');
                    } else {
                        throw e;
                    }
                }

                setTimeout(() => {
                    const savedData = localStorage.getItem(storageKey);
                    if (!savedData) {
                        reject(new Error('Failed to verify saved data'));
                        return;
                    }

                    try {
                        const parsedData = JSON.parse(savedData);
                        if (!parsedData.timestamp) {
                            reject(new Error('Saved data is corrupted'));
                            return;
                        }

                        console.log('Scan result verified successfully');
                        resolve(scanId);
                    } catch (parseError) {
                        reject(new Error('Saved data is not valid JSON'));
                    }
                }, 100);

            } catch (error) {
                console.error('Failed to save scan result:', error);
                reject(error);
            }
        });
    }

    handleScanError(error) {
        let errorMessage = 'Analysis failed. Please try again.';
        let shouldRetry = true;

        if (error.message.includes('Model file not found') ||
            error.message.includes('Model file not accessible')) {
            errorMessage = 'AI model is not available. Please check your internet connection and try again.';
        } else if (error.message.includes('Model configuration error') ||
            error.message.includes('InputLayer')) {
            errorMessage = 'AI model configuration issue. Please contact support.';
            shouldRetry = false;
        } else if (error.message.includes('timeout') ||
            error.message.includes('timed out')) {
            errorMessage = 'Analysis is taking too long. Please try with a smaller image or check your connection.';
        } else if (error.message.includes('Invalid image') ||
            error.message.includes('too small')) {
            errorMessage = error.message.includes('too small') ?
                'Image is too small for analysis. Please use a larger image.' :
                'Invalid image format. Please try another image.';
        } else if (error.message.includes('Failed to load') ||
            error.message.includes('Failed to preprocess')) {
            errorMessage = 'Failed to process image. Please try another image.';
        } else if (error.message.includes('Memory') ||
            error.message.includes('out of memory')) {
            errorMessage = 'Insufficient memory for analysis. Please try with a smaller image.';
        }

        this.view.showNotification(errorMessage, false);

        console.error('Detailed scan error info:', {
            message: error.message,
            stack: error.stack,
            imageSize: this.imageData ? this.imageData.length : 0,
            timestamp: new Date().toISOString()
        });

        if (shouldRetry) {
            setTimeout(() => {
                const retryMessage = 'Would you like to try scanning again?';
                if (confirm(retryMessage)) {
                    this.resetCropState();
                    if (this.imageData) {
                        this.showImageModal();
                    }
                }
            }, 2000);
        }
    }

    saveScanResult(result) {
        try {
            const scanId = Date.now();
            const storageKey = `scan_${scanId}`;

            const resultStr = JSON.stringify(result);
            if (resultStr.length > 5000000) {
                console.warn('Scan result too large, reducing image data');
                result.image = '';
            }

            try {
                localStorage.setItem(storageKey, JSON.stringify(result));
            } catch (e) {
                console.warn('LocalStorage full, clearing old scans');
                Object.keys(localStorage)
                    .filter(key => key.startsWith('scan_'))
                    .sort()
                    .slice(0, 5)
                    .forEach(key => localStorage.removeItem(key));

                localStorage.setItem(storageKey, JSON.stringify(result));
            }

            return scanId;
        } catch (error) {
            console.error('Failed to save scan result:', error);
            return Date.now();
        }
    }

    closeImageModal() {
        const modal = this.view.querySelector('#imageUploadModal');
        modal.classList.add('hidden');
        modal.style.display = 'none';
        this.resetCropState();
        this.imageData = null;
    }
}

export default DashboardPresenter;