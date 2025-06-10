import template from './article-detail-page-template.html'
import ArticleDetailPresenter from './article-detail-presenter.js'

class ArticleDetailPage extends HTMLElement {
    constructor() {
        super()
        this._presenter = null
        this._articleSlug = null
    }

    connectedCallback() {
        // Add page transition classes to body
        document.body.classList.add('transition-all', 'duration-500')

        // Render with fade-in effect
        this.innerHTML = ''
        setTimeout(() => {
            this.render()
            this._presenter = new ArticleDetailPresenter(this)
            this._presenter.init()

            // Add smooth scrolling behavior
            this._addSmoothScrolling()

            // Add scroll-to-top button
            this._addScrollToTopButton()
        }, 100)
    }

    disconnectedCallback() {
        // Cleanup any event listeners or animations
        const scrollTopBtn = document.querySelector('#scroll-to-top')
        if (scrollTopBtn) {
            scrollTopBtn.remove()
        }
    }

    render() {
        this.innerHTML = template

        // Add custom CSS for additional animations
        this._addCustomStyles()
    }

    _addCustomStyles() {
        if (!document.querySelector('#article-animations-css')) {
            const styleElement = document.createElement('style')
            styleElement.id = 'article-animations-css'
            styleElement.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                
                .animate-reveal {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .hover-scale {
                    transition: transform 0.3s ease;
                }
                
                .hover-scale:hover {
                    transform: scale(1.02);
                }
                
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                }
                
                #scroll-to-top {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 99;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                #scroll-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                }
                
                .text-gradient {
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                    background-image: linear-gradient(to right, #00667A, #009CA6);
                }
                
                .bg-glass {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
            `
            document.head.appendChild(styleElement)
        }
    }

    _addSmoothScrolling() {
        // Add smooth scrolling to all anchor links
        this.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href')
                if (targetId !== '#' && targetId.startsWith('#')) {
                    e.preventDefault()

                    const targetElement = document.querySelector(targetId)
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }
                }
            })
        })
    }

    _addScrollToTopButton() {
        // Create the button if it doesn't exist
        if (!document.querySelector('#scroll-to-top')) {
            const scrollButton = document.createElement('button')
            scrollButton.id = 'scroll-to-top'
            scrollButton.className =
                'bg-[#00667A] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#00667A] focus:ring-offset-2'
            scrollButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            `

            // Add click event to scroll to top with animation
            scrollButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            })

            document.body.appendChild(scrollButton)

            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollButton.classList.add('visible')
                } else {
                    scrollButton.classList.remove('visible')
                }
            })
        }
    }

    setSlug(slug) {
        this._articleSlug = slug
        if (this._presenter) {
            this._presenter._articleSlug = slug
        }
    }

    async loadDetail() {
        if (this._presenter) {
            await this._presenter.init()
        }
    }
}

customElements.define('article-detail-page', ArticleDetailPage)
export default ArticleDetailPage
