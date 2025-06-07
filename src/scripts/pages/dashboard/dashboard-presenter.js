import { logoutUser } from '../../../server/services/auth-service.js';


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
            try {
                await this.handleLogout();
            } catch (error) {
                console.error('Logout error:', error);
                this.view.showNotification('Logout failed', false);
            }
        });
    }

    setupImageUploadHandler() {
        const uploadTrigger = this.view.querySelector('#uploadTrigger');
        const imageInput = this.view.querySelector('#imageInput');
        const modal = this.view.querySelector('#imageUploadModal');

        uploadTrigger.addEventListener('click', () => {
            imageInput.click();
        });

        imageInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this.imageData = event.target.result;
                    this.showImageModal();
                };

                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    setupCropHandlers() {
        const modal = this.view.querySelector('#imageUploadModal');
        const cancelButton = this.view.querySelector('#cancelCropButton');
        const scanButton = this.view.querySelector('#scanButton');
        const imageElement = this.view.querySelector('#uploadedImage');
        const cropOverlay = this.view.querySelector('#cropOverlay');

        // Handle modal close
        cancelButton.addEventListener('click', () => {
            modal.classList.add('hidden');
            this.resetCropState();
        });

        // Handle scan
        scanButton.addEventListener('click', () => {
            const croppedImage = this.getCroppedImage();
            if (croppedImage) {
                // Di sini Anda bisa melakukan sesuatu dengan gambar yang sudah di-crop
                console.log('Image ready for scanning:', croppedImage);
                this.view.showNotification('Image ready for scanning');
                modal.classList.add('hidden');
                this.resetCropState();
            }
        });

        // Setup crop functionality
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

    showImageModal() {
        const modal = this.view.querySelector('#imageUploadModal');
        const imageElement = this.view.querySelector('#uploadedImage');
        const cropOverlay = this.view.querySelector('#cropOverlay');

        modal.classList.remove('hidden');
        imageElement.src = this.imageData;
        imageElement.style.display = 'block';

        // Reset crop overlay
        cropOverlay.style.display = 'none';
    }

    getCroppedImage() {
        const cropOverlay = this.view.querySelector('#cropOverlay');
        const imageElement = this.view.querySelector('#uploadedImage');
        const modal = this.view.querySelector('#imageUploadModal');
        const container = modal.querySelector('div.relative');

        if (parseInt(cropOverlay.style.width) <= 0 || parseInt(cropOverlay.style.height) <= 0) {
            return this.imageData; // Return original if no crop
        }

        // Buat canvas untuk crop
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Hitung posisi dan ukuran crop
        const containerRect = container.getBoundingClientRect();
        const overlayRect = cropOverlay.getBoundingClientRect();

        const x = overlayRect.left - containerRect.left;
        const y = overlayRect.top - containerRect.top;
        const width = parseInt(cropOverlay.style.width);
        const height = parseInt(cropOverlay.style.height);

        // Set ukuran canvas sesuai crop area
        canvas.width = width;
        canvas.height = height;

        // Gambar bagian yang di-crop ke canvas
        ctx.drawImage(
            imageElement,
            x, y, width, height, // Source rectangle
            0, 0, width, height  // Destination rectangle
        );

        // Konversi ke data URL
        return canvas.toDataURL('image/jpeg');
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

    async handleLogout() {
        const success = await logoutUser();

        if (success) {
            this.view.showNotification('Logout successful');
            setTimeout(() => {
                this.view.redirectTo('/');
            }, 1500);
        } else {
            throw new Error('Failed to logout');
        }
    }

}

export default DashboardPresenter;