import template from './result-detail-page-template.html'
import ResultDetailPresenter from './result-detail-presenter.js'

class ResultDetailPage extends HTMLElement {
    constructor() {
        super()
        this.presenter = new ResultDetailPresenter(this)
        this.animationQueue = []
    }

    connectedCallback() {
        this.render()
        this.presenter.init().catch(error => {
            console.error('Failed to initialize result detail page:', error)
            this.showError(error.message)
        })
    }

    render() {
        this.innerHTML = template
        this.initializeAnimations()
        this.setupScrollAnimations()
    }

    initializeAnimations() {
        // Stagger animation for elements
        const animateElements = this.querySelectorAll('[data-animate]')
        animateElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.15}s`
            el.classList.add('opacity-0', 'translate-y-8')
        })

        // Enhanced hover effects
        this.addAdvancedHoverEffects()

        // Add floating animations
        this.addFloatingAnimations()

        // Add particle effects
        this.addParticleEffects()
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-slideInUp')
                        entry.target.classList.remove('opacity-0', 'translate-y-8')
                    }
                })
            },
            { threshold: 0.1 }
        )

        this.querySelectorAll('[data-animate]').forEach(el => {
            observer.observe(el)
        })
    }

    addAdvancedHoverEffects() {
        // Enhanced back button with ripple effect
        const backButton = this.querySelector('#backButton')
        if (backButton) {
            this.addRippleEffect(backButton)
            backButton.addEventListener('mouseenter', () => {
                backButton.classList.add('scale-105', 'shadow-xl', 'shadow-cyan-500/25')
            })
            backButton.addEventListener('mouseleave', () => {
                backButton.classList.remove('scale-105', 'shadow-xl', 'shadow-cyan-500/25')
            })
        }

        // Enhanced retry button
        const retryButton = this.querySelector('#retryButton')
        if (retryButton) {
            this.addRippleEffect(retryButton)
            retryButton.addEventListener('mouseenter', () => {
                retryButton.classList.add('scale-105', 'shadow-lg')
            })
            retryButton.addEventListener('mouseleave', () => {
                retryButton.classList.remove('scale-105', 'shadow-lg')
            })
        }
    }

    addRippleEffect(element) {
        element.addEventListener('click', e => {
            const ripple = document.createElement('span')
            const rect = element.getBoundingClientRect()
            const size = Math.max(rect.width, rect.height)
            const x = e.clientX - rect.left - size / 2
            const y = e.clientY - rect.top - size / 2

            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `

            element.style.position = 'relative'
            element.style.overflow = 'hidden'
            element.appendChild(ripple)

            setTimeout(() => ripple.remove(), 600)
        })
    }

    addFloatingAnimations() {
        // Add floating animation to icons
        const icons = this.querySelectorAll('svg')
        icons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.2}s`
            icon.classList.add('animate-float')
        })
    }

    addParticleEffects() {
        const particleContainer = document.createElement('div')
        particleContainer.className = 'fixed inset-0 pointer-events-none z-0'
        this.appendChild(particleContainer)

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div')
            particle.className =
                'absolute w-2 h-2 bg-teal-200 rounded-full opacity-20 animate-float-particle'
            particle.style.left = `${Math.random() * 100}%`
            particle.style.top = `${Math.random() * 100}%`
            particle.style.animationDelay = `${Math.random() * 5}s`
            particle.style.animationDuration = `${3 + Math.random() * 4}s`
            particleContainer.appendChild(particle)
        }
    }

    showLoading() {
        const loadingIndicator = this.querySelector('#loadingIndicator')
        const errorMessage = this.querySelector('#errorMessage')
        const resultContent = this.querySelector('#resultDetailContent')

        loadingIndicator.classList.remove('hidden')
        loadingIndicator.classList.add('animate-fadeIn')
        errorMessage.classList.add('hidden')
        resultContent.classList.add('hidden')

        // Add pulsing effect to loading
        const loadingSpinner = loadingIndicator.querySelector('.animate-spin')
        if (loadingSpinner) {
            loadingSpinner.classList.add('animate-pulse-glow')
        }
    }

    hideLoading() {
        const loadingIndicator = this.querySelector('#loadingIndicator')
        loadingIndicator.classList.add('animate-fadeOut')
        setTimeout(() => {
            loadingIndicator.classList.add('hidden')
            loadingIndicator.classList.remove('animate-fadeOut')
        }, 300)
    }

    showError(message) {
        const loadingIndicator = this.querySelector('#loadingIndicator')
        const errorMessage = this.querySelector('#errorMessage')
        const resultContent = this.querySelector('#resultDetailContent')

        loadingIndicator.classList.add('hidden')
        errorMessage.classList.remove('hidden')
        errorMessage.classList.add('animate-shake', 'animate-slideInDown')
        resultContent.classList.add('hidden')

        const errorElement = this.querySelector('#errorMessage p')
        if (errorElement) {
            errorElement.textContent = message
        }

        // Auto-hide error after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('animate-fadeOut')
        }, 5000)
    }

    showContent() {
        const loadingIndicator = this.querySelector('#loadingIndicator')
        const errorMessage = this.querySelector('#errorMessage')
        const resultContent = this.querySelector('#resultDetailContent')

        loadingIndicator.classList.add('hidden')
        errorMessage.classList.add('hidden')
        resultContent.classList.remove('hidden')
        resultContent.classList.add('animate-slideInUp')

        // Staggered animation for content children
        this.animateContentChildren()

        // Add entrance animations for specific elements
        this.addEntranceAnimations()
    }

    animateContentChildren() {
        const animatedElements = this.querySelectorAll('[data-animate]')
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-slideInUp')
                el.classList.remove('opacity-0', 'translate-y-8')
            }, index * 150)
        })
    }

    addEntranceAnimations() {
        // Image zoom in effect
        const image = this.querySelector('#resultImage')
        if (image) {
            setTimeout(() => {
                image.classList.add('animate-zoomIn')
            }, 500)
        }

        // Progress bars animation
        const progressBars = this.querySelectorAll('.progress-bar')
        progressBars.forEach((bar, index) => {
            setTimeout(
                () => {
                    bar.classList.add('animate-progress-fill')
                },
                800 + index * 100
            )
        })
    }

    setImage(src) {
        const img = this.querySelector('#resultImage')
        if (img) {
            img.src = src
            img.classList.add(
                'animate-zoomIn',
                'hover:rotate-1',
                'transition-transform',
                'duration-500'
            )

            // Add image load animation
            img.addEventListener('load', () => {
                img.classList.add('animate-imageGlow')
            })
        }
    }

    setTimestamp(date) {
        const element = this.querySelector('#scanTimestamp')
        if (element) {
            element.textContent = `Scanned on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`
            element.classList.add('animate-typewriter')
        }
    }

    renderPredictions(predictions, dominantAcne) {
        const container = this.querySelector('#resultsContainer')
        if (!container) return

        container.innerHTML = predictions
            .map(
                (pred, index) => `
                <div class="prediction-item flex justify-between items-center p-4 ${
                    dominantAcne === pred.label
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                        : 'bg-white'
                } rounded-xl border shadow-sm transform transition-all duration-500 hover:scale-102 hover:shadow-lg hover:-translate-y-1 group" 
                     style="animation-delay: ${index * 0.1}s" data-animate>
                    <span class="${
                        dominantAcne === pred.label ? 'font-bold text-blue-800' : 'text-gray-700'
                    } transition-all duration-300 group-hover:text-blue-600">
                        ${pred.label}
                    </span>
                    <div class="flex items-center space-x-3">
                        <div class="w-28 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                            <div class="progress-bar h-full rounded-full ${
                                dominantAcne === pred.label
                                    ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
                            } transform transition-all duration-1000 ease-out animate-shimmer" 
                                style="width: ${Math.round(pred.confidence * 100)}%"></div>
                        </div>
                        <span class="text-sm font-bold ${
                            dominantAcne === pred.label ? 'text-blue-600' : 'text-gray-600'
                        } animate-countUp min-w-[3rem] text-right">
                            ${Math.round(pred.confidence * 100)}%
                        </span>
                    </div>
                </div>
            `
            )
            .join('')

        container.classList.add('animate-slideInLeft')

        // Add staggered animation to prediction items
        setTimeout(() => {
            const items = container.querySelectorAll('.prediction-item')
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-slideInLeft')
                }, index * 100)
            })
        }, 200)
    }

    renderDominantResult(dominantAcne, confidence) {
        const container = this.querySelector('#dominantResult')
        if (!container) return

        container.innerHTML = `
            <div class="flex items-center space-x-4 animate-bounceIn">
                <div class="relative">
                    <div class="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse-glow"></div>
                    <div class="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <div class="space-y-1">
                    <h4 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-text">
                        ${dominantAcne}
                    </h4>
                    <p class="text-sm text-blue-700 animate-fadeIn flex items-center space-x-2" style="animation-delay: 0.3s">
                        <span class="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>Confidence: ${Math.round(confidence * 100)}%</span>
                    </p>
                </div>
            </div>
        `
    }

    renderRecommendations(recommendations) {
        const container = this.querySelector('#recommendation')
        if (!container || !recommendations) return

        container.innerHTML = `
            <div class="grid md:grid-cols-2 gap-8">
                <div class="recommendation-card bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-slideInLeft" data-animate>
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-green-800 flex items-center animate-fadeIn">
                            <div class="relative mr-3">
                                <svg class="w-7 h-7 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div class="absolute inset-0 w-7 h-7 bg-green-300 rounded-full animate-ping opacity-20"></div>
                            </div>
                            Treatment Steps
                        </h3>
                        <div class="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-2 animate-expand"></div>
                    </div>
                    <ul class="space-y-4">
                        ${recommendations.treatment
                            .map(
                                (step, index) => `
                                <li class="treatment-step flex items-start transform transition-all duration-300 hover:translate-x-2 animate-slideInLeft" 
                                    style="animation-delay: ${0.2 + index * 0.1}s">
                                    <div class="relative mr-4 mt-1">
                                        <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse-glow"></div>
                                        <div class="absolute inset-0 w-3 h-3 bg-green-300 rounded-full animate-ping opacity-40"></div>
                                    </div>
                                    <span class="text-green-700 leading-relaxed transition-colors duration-200 hover:text-green-900 font-medium">
                                        ${step}
                                    </span>
                                </li>
                            `
                            )
                            .join('')}
                    </ul>
                </div>

                <div class="recommendation-card bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-slideInRight" data-animate>
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-blue-800 flex items-center animate-fadeIn">
                            <div class="relative mr-3">
                                <svg class="w-7 h-7 text-blue-600 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                                </svg>
                                <div class="absolute inset-0 w-7 h-7 bg-blue-300 rounded-full animate-ping opacity-20"></div>
                            </div>
                            Key Ingredients
                        </h3>
                        <div class="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2 animate-expand" style="animation-delay: 0.2s"></div>
                    </div>
                    <div class="ingredient-tags flex flex-wrap gap-3 mb-6">
                        ${recommendations.ingredients
                            .map(
                                (ingredient, index) => `
                                <span class="ingredient-tag px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-semibold transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 animate-fadeIn cursor-pointer border border-blue-200" 
                                      style="animation-delay: ${0.3 + index * 0.05}s">
                                    ${ingredient}
                                </span>
                            `
                            )
                            .join('')}
                    </div>
                    <div class="severity-card p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border border-blue-200 animate-slideInUp transform transition-all duration-300 hover:shadow-lg" 
                         style="animation-delay: 0.6s">
                        <p class="text-blue-800 font-bold flex items-center">
                            <span class="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            Severity Level: 
                            <span class="ml-2 px-3 py-1 bg-blue-200 rounded-full text-blue-900 animate-pulse-glow">
                                ${recommendations.severity}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        `

        // Add enhanced hover effects to ingredient tags
        setTimeout(() => {
            const ingredientTags = container.querySelectorAll('.ingredient-tag')
            ingredientTags.forEach(tag => {
                tag.addEventListener('mouseenter', () => {
                    tag.classList.add('animate-wiggle')
                })
                tag.addEventListener('mouseleave', () => {
                    tag.classList.remove('animate-wiggle')
                })
            })
        }, 1000)
    }
}

customElements.define('result-detail-page', ResultDetailPage)
export default ResultDetailPage
