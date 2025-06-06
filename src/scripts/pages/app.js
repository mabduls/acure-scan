import { routes } from '../routes/routes'
import { getActivePathname, parsePathname } from '../routes/url-parser'

class App {
    constructor({ content }) {
        this._content = content
    }

    async renderPage() {
        try {
            const pathname = getActivePathname()
            const { resource, id } = parsePathname(pathname)

            let routePattern = pathname === '/' ? '/' : `/${resource || ''}`
            if (id) routePattern += '/:id'

            const route = routes[pathname] || routes['/']
            this._content.innerHTML = route.template

            if (pathname === '/') {
                await this._initLandingPage()
            } else if (pathname === '/login') {
                await this._initLoginPage()
            }else if (pathname === '/register') {
                await this._initRegisterPage()
            }else if (pathname === '/dashboard') {
                await this._initDashboardPage()
            }
        } catch (error) {
            console.error('Failed to render page:', error)
            this._content.innerHTML = `
        <div style="color: white; padding: 2rem; text-align: center;">
            <h2>Error</h2>
            <p>${error.message}</p>
            <button onclick="window.location.hash='#/'">Back to Home</button>
        </div>
        `
        }
    }

    async _initLandingPage() {
        await customElements.whenDefined('landing-page')
        const landingPage = this._content.querySelector('landing-page')
        if (landingPage) {
            console.log('Landing page initialized')
        }
    }

    async _initLoginPage() {
        await customElements.whenDefined('login-page')
        const loginPage = this._content.querySelector('login-page')
        if (loginPage) {
            console.log('Login page initialized')
        }
    }

    async _initRegisterPage() {
        await customElements.whenDefined('register-page')
        const registerPage = this._content.querySelector('register-page')
        if (registerPage) {
            console.log('Register page initialized')
        }
    }

    async _initDashboardPage() {
        await customElements.whenDefined('dashboard-page')
        const dashboardPage = this._content.querySelector('dashboard-page')
        if (dashboardPage) {
            console.log('Dashboard page initialized')
        }
    }
}

export default App
