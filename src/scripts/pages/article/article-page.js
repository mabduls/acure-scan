import template from './article-page-template.html'
import ArticlePresenter from './article-presenter.js'

class ArticlePage extends HTMLElement {
    constructor() {
        super()
        this._presenter = null
    }

    connectedCallback() {
        // Tambahkan animasi loading pada awal halaman
        this.innerHTML =
            '<div class="loading-screen flex items-center justify-center h-screen w-screen bg-gradient-to-b from-[#FFECDF] to-[#C5E7E1]"><div class="loader"></div></div>'

        // Animasi loading sebelum render konten utama
        setTimeout(() => {
            this.render()
            this._presenter = new ArticlePresenter(this)
            this._presenter.init()

            // Tambahkan kelas untuk animasi fade-in setelah loading
            const mainContent = this.querySelector('main')
            if (mainContent) {
                mainContent.style.opacity = '0'
                setTimeout(() => {
                    mainContent.style.opacity = '1'
                    mainContent.style.transition = 'opacity 0.8s ease-in-out'
                }, 100)
            }

            // Tambahkan animasi pada setiap elemen secara berurutan
            this._animateElementsSequentially()
        }, 800) // Delay untuk efek loading
    }

    render() {
        this.innerHTML = template

        // Tambahkan style untuk loading screen
        const style = document.createElement('style')
        style.textContent = `
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                background-size: 200% 200%;
                animation: gradientAnimation 3s ease infinite;
            }
            
            @keyframes gradientAnimation {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .loader {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(0, 102, 122, 0.3);
                border-radius: 50%;
                border-top-color: #00667A;
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            /* Animasi masuk dari atas */
            @keyframes slideFromTop {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            /* Animasi masuk dari bawah */
            @keyframes slideFromBottom {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            /* Animasi fade in */
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `
        document.head.appendChild(style)
    }

    _animateElementsSequentially() {
        // Animasi header
        const header = this.querySelector('header')
        if (header) {
            header.style.opacity = '0'
            header.style.animation = 'slideFromTop 0.6s forwards'
            header.style.animationDelay = '0.2s'
        }

        // Animasi judul artikel
        const title = this.querySelector('h1')
        if (title) {
            title.style.opacity = '0'
            title.style.animation = 'fadeIn 0.8s forwards'
            title.style.animationDelay = '0.4s'
        }

        // Animasi subtitle
        const subtitle = this.querySelector('h2')
        if (subtitle) {
            subtitle.style.opacity = '0'
            subtitle.style.animation = 'fadeIn 0.8s forwards'
            subtitle.style.animationDelay = '0.6s'
        }

        // Animasi garis dibawah judul
        const divider = this.querySelector('.w-24.h-1')
        if (divider) {
            divider.style.width = '0'
            divider.style.transition = 'width 1.2s ease-in-out'
            setTimeout(() => {
                divider.style.width = '24px'
            }, 800)
        }

        // Animasi paragraf intro
        const introParagraph = this.querySelector('.bg-white\\/70')
        if (introParagraph) {
            introParagraph.style.opacity = '0'
            introParagraph.style.animation = 'slideFromBottom 0.8s forwards'
            introParagraph.style.animationDelay = '0.8s'
        }

        // Animasi footer
        const footer = this.querySelector('footer')
        if (footer) {
            footer.style.opacity = '0'
            footer.style.animation = 'slideFromBottom 0.6s forwards'
            footer.style.animationDelay = '1s'
        }
    }
}

customElements.define('article-page', ArticlePage)
export default ArticlePage
