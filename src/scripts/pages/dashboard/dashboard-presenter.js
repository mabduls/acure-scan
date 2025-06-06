import { loginUser, logoutUser } from '../../../server/services/auth-service.js';


class DashboardPresenter {
    constructor(view) {
        this.view = view;
        this.isDropdownOpen = false;
    }

    init() {
        this.setupDropdownHandler();
        this.setupLogoutHandler();
        this.setupClickOutsideHandler();
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