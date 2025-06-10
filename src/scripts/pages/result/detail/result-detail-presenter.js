import { navigateToUrl, getQueryParams } from '../../../routes/routes'
import ScanService from '../../../services/scan-service'
import { auth } from '../../../../server/config/firebase'

class ResultDetailPresenter {
    constructor(view) {
        this.view = view
        this.scanId = null
        this.scanData = null
        this.animationQueue = []
        this.isAnimating = false
    }

    async init() {
        try {
            this.setupEventListeners()
            this.setupAdvancedInteractions()
            await this.loadScanData()
        } catch (error) {
            console.error('Initialization error:', error)
            this.showErrorState(error.message)
        }
    }

    setupEventListeners() {
        const backButton = this.view.querySelector('#backButton')
        if (backButton) {
            backButton.addEventListener('click', e => {
                this.addClickAnimation(e.target)
                setTimeout(() => {
                    navigateToUrl('/history')
                }, 300)
            })
        }

        const retryButton = this.view.querySelector('#retryButton')
        if (retryButton) {
            retryButton.addEventListener('click', e => {
                this.addClickAnimation(e.target)
                setTimeout(() => {
                    this.loadScanData()
                }, 200)
            })
        }
    }

    setupAdvancedInteractions() {
        // Add parallax effect on scroll
        window.addEventListener('scroll', () => {
            this.handleParallaxScroll()
        })

        // Add mouse move effects
        this.view.addEventListener('mousemove', e => {
            this.handleMouseMove(e)
        })

        // Add keyboard navigation
        document.addEventListener('keydown', e => {
            this.handleKeyboardNavigation(e)
        })

        // Add visibility change effects
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange()
        })
    }

    handleParallaxScroll() {
        const scrolled = window.pageYOffset
        const parallaxElements = this.view.querySelectorAll('[data-parallax]')

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5
            const yPos = -(scrolled * speed)
            element.style.transform = `translateY(${yPos}px)`
        })
    }

    handleMouseMove(e) {
        const cards = this.view.querySelectorAll('.recommendation-card, .prediction-item')
        const { clientX, clientY } = e

        cards.forEach(card => {
            const rect = card.getBoundingClientRect()
            const x = clientX - rect.left
            const y = clientY - rect.top

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateX = (y - centerY) / 10
                const rotateY = (centerX - x) / 10

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
            }
        })
    }

    handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            navigateToUrl('/history')
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            this.pauseAnimations()
        } else {
            // Resume animations when tab becomes visible
            this.resumeAnimations()
        }
    }

    addClickAnimation(element) {
        element.classList.add('animate-pulse')
        setTimeout(() => {
            element.classList.remove('animate-pulse')
        }, 300)
    }

    pauseAnimations() {
        const animatedElements = this.view.querySelectorAll('[class*="animate-"]')
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused'
        })
    }

    resumeAnimations() {
        const animatedElements = this.view.querySelectorAll('[class*="animate-"]')
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running'
        })
    }

    async loadScanData() {
        try {
            this.showLoadingState()
            this.startLoadingAnimations()

            // Get scan ID from URL
            const queryParams = getQueryParams()
            this.scanId = queryParams.scanId

            if (!this.scanId) {
                throw new Error('No scan ID provided')
            }

            // Get current user with enhanced error handling
            const user = auth.currentUser
            if (!user) {
                const userData = JSON.parse(localStorage.getItem('userData'))
                if (!userData || !userData.uid) {
                    throw new Error('User not authenticated')
                }
                this.userId = userData.uid
            } else {
                this.userId = user.uid
            }

            // Add artificial delay for smooth UX
            await new Promise(resolve => setTimeout(resolve, 800))

            // Load scan data from Firestore
            this.scanData = await ScanService.getScanById(this.userId, this.scanId)

            if (!this.scanData) {
                throw new Error('Scan data not found')
            }

            this.stopLoadingAnimations()
            await this.renderScanDataWithAnimations()
        } catch (error) {
            console.error('Failed to load scan data:', error)
            this.stopLoadingAnimations()
            this.showErrorState(error.message)
        }
    }

    startLoadingAnimations() {
        // Add enhanced loading effects
        const loadingIndicator = this.view.querySelector('#loadingIndicator')
        if (loadingIndicator) {
            loadingIndicator.classList.add('animate-pulse-glow')

            // Add rotating elements around loading spinner
            this.addLoadingParticles(loadingIndicator)
        }
    }

    stopLoadingAnimations() {
        const loadingIndicator = this.view.querySelector('#loadingIndicator')
        if (loadingIndicator) {
            loadingIndicator.classList.remove('animate-pulse-glow')

            // Remove loading particles
            const particles = loadingIndicator.querySelectorAll('.loading-particle')
            particles.forEach(particle => particle.remove())
        }
    }

    addLoadingParticles(container) {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div')
            particle.className = 'loading-particle absolute w-2 h-2 bg-teal-400 rounded-full'
            particle.style.cssText = `
                top: 50%;
                left: 50%;
                transform-origin: 0 40px;
                transform: rotate(${i * 45}deg);
                animation: spin 2s linear infinite;
                animation-delay: ${i * 0.1}s;
            `
            container.appendChild(particle)
        }
    }

    async renderScanDataWithAnimations() {
        // Hide loading and error states
        this.view.querySelector('#loadingIndicator').classList.add('hidden')
        this.view.querySelector('#errorMessage').classList.add('hidden')

        // Show content with animation
        const resultContent = this.view.querySelector('#resultDetailContent')
        resultContent.classList.remove('hidden')
        resultContent.classList.add('animate-slideInUp')

        // Render content with staggered animations
        await this.renderTimestampWithAnimation()
        await this.renderImageWithAnimation()
        await this.renderPredictionsWithAnimation()
        await this.renderDominantResultWithAnimation()
        await this.renderRecommendationsWithAnimation()

        // Add final touches
        this.addInteractiveEffects()
        this.startCounterAnimations()
    }

    async renderTimestampWithAnimation() {
        const timestampElement = this.view.querySelector('#scanTimestamp')
        if (timestampElement && this.scanData.timestamp) {
            const date = new Date(this.scanData.timestamp)
            const formattedDate = `Scanned on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`

            // Typewriter effect
            await this.typewriterEffect(timestampElement, formattedDate)
        }
    }

    async renderImageWithAnimation() {
        const imageElement = this.view.querySelector('#resultImage')
        if (imageElement && this.scanData.image) {
            // Add loading placeholder
            imageElement.style.background = 'linear-gradient(45deg, #f3f4f6, #e5e7eb)'
            imageElement.style.backgroundSize = '400% 400%'
            imageElement.classList.add('animate-shimmer')

            // Load image
            const img = new Image()
            img.onload = () => {
                imageElement.src = this.scanData.image
                imageElement.alt = `Scan result showing ${this.scanData.dominantAcne}`
                imageElement.classList.remove('animate-shimmer')
                imageElement.classList.add('animate-zoomIn', 'animate-imageGlow')

                // Add scan line effect
                this.addScanLineEffect(imageElement)
            }
            img.src = this.scanData.image
        }
    }

    addScanLineEffect(imageContainer) {
        const scanLine = document.createElement('div')
        scanLine.className =
            'absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-60'
        scanLine.style.animation = 'scan 2s ease-in-out'

        const wrapper = imageContainer.parentElement
        wrapper.style.position = 'relative'
        wrapper.appendChild(scanLine)

        setTimeout(() => scanLine.remove(), 2000)
    }

    async renderPredictionsWithAnimation() {
        const resultsContainer = this.view.querySelector('#resultsContainer')
        if (!resultsContainer || !this.scanData.predictions) return

        // Clear container
        resultsContainer.innerHTML = ''

        // Render each prediction with staggered animation
        for (let i = 0; i < this.scanData.predictions.length; i++) {
            const prediction = this.scanData.predictions[i]
            await this.renderSinglePrediction(resultsContainer, prediction, i)
            await new Promise(resolve => setTimeout(resolve, 150))
        }
    }

    async renderSinglePrediction(container, prediction, index) {
        const percentage = Math.round(prediction.confidence * 100)
        const isHighest = this.scanData.dominantAcne === prediction.label

        const predictionElement = document.createElement('div')
        predictionElement.className = `prediction-item flex justify-between items-center p-4 ${
            isHighest
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg'
                : 'bg-white border-gray-200'
        } rounded-xl border transform transition-all duration-500 hover:scale-102 hover:shadow-xl hover:-translate-y-1 group opacity-0 translate-x-8`

        predictionElement.innerHTML = `
            <span class="${
                isHighest ? 'font-bold text-blue-800' : 'text-gray-700'
            } transition-all duration-300 group-hover:text-blue-600">
                ${prediction.label}
            </span>
            <div class="flex items-center space-x-3">
                <div class="w-28 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div class="progress-bar h-full rounded-full ${
                        isHighest
                            ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                            : 'bg-gradient-to-r from-gray-400 to-gray-500'
                    } transform transition-all duration-1000 ease-out w-0"></div>
                </div>
                <span class="percentage text-sm font-bold ${
                    isHighest ? 'text-blue-600' : 'text-gray-600'
                } min-w-[3rem] text-right">
                    0%
                </span>
            </div>
        `

        container.appendChild(predictionElement)

        // Animate entrance
        setTimeout(() => {
            predictionElement.classList.remove('opacity-0', 'translate-x-8')
            predictionElement.classList.add('animate-slideInLeft')
        }, 50)

        // Animate progress bar
        setTimeout(() => {
            const progressBar = predictionElement.querySelector('.progress-bar')
            progressBar.style.width = `${percentage}%`
            progressBar.classList.add('animate-shimmer')
        }, 300)

        // Animate percentage counter
        setTimeout(() => {
            this.animateCounter(predictionElement.querySelector('.percentage'), 0, percentage, 1000)
        }, 500)
    }

    async renderDominantResultWithAnimation() {
        const dominantResultContainer = this.view.querySelector('#dominantResult')
        if (!dominantResultContainer || !this.scanData.dominantAcne) return

        const confidence = Math.round(this.scanData.confidence * 100)

        dominantResultContainer.innerHTML = `
            <div class="flex items-center space-x-4">
                <div class="relative">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 scale-0"></div>
                    <div class="absolute inset-0 w-8 h-8 bg-blue-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <div class="space-y-2">
                    <h4 class="dominant-text text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 translate-y-4">
                        ${this.scanData.dominantAcne}
                    </h4>
                    <div class="confidence-container opacity-0 translate-y-2">
                        <p class="text-sm text-blue-700 flex items-center space-x-2">
                            <span class="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span>Confidence: <span class="confidence-value font-bold">0</span>%</span>
                        </p>
                    </div>
                </div>
            </div>
        `

        // Animate main indicator
        setTimeout(() => {
            const indicator = dominantResultContainer.querySelector('.w-8.h-8.bg-gradient-to-r')
            indicator.classList.remove('opacity-0', 'scale-0')
            indicator.classList.add('animate-bounceIn', 'animate-pulse-glow')
        }, 200)

        // Animate text
        setTimeout(() => {
            const text = dominantResultContainer.querySelector('.dominant-text')
            text.classList.remove('opacity-0', 'translate-y-4')
            text.classList.add('animate-gradient-text')
        }, 500)

        // Animate confidence
        setTimeout(() => {
            const confidenceContainer =
                dominantResultContainer.querySelector('.confidence-container')
            confidenceContainer.classList.remove('opacity-0', 'translate-y-2')
            confidenceContainer.classList.add('animate-fadeIn')

            // Animate confidence counter
            this.animateCounter(
                dominantResultContainer.querySelector('.confidence-value'),
                0,
                confidence,
                1500
            )
        }, 800)
    }

    async renderRecommendationsWithAnimation() {
        const recommendationContainer = this.view.querySelector('#recommendation')
        if (!recommendationContainer || !this.scanData.recommendations) return

        const rec = this.scanData.recommendations

        recommendationContainer.innerHTML = `
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Treatment Card -->
                <div class="treatment-card recommendation-card bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 opacity-0 -translate-x-8">
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-green-800 flex items-center">
                            <div class="treatment-icon relative mr-3 opacity-0 scale-0">
                                <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div class="absolute inset-0 w-7 h-7 bg-green-300 rounded-full animate-ping opacity-20"></div>
                            </div>
                            <span class="treatment-title opacity-0 translate-x-4">Treatment Steps</span>
                        </h3>
                        <div class="treatment-underline w-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mt-2"></div>
                    </div>
                    <ul class="treatment-list space-y-4">
                        ${rec.treatment
                            .map(
                                (step, index) => `
                            <li class="treatment-step flex items-start transform transition-all duration-300 hover:translate-x-2 opacity-0 translate-x-4" 
                                data-step="${index}">
                                <div class="step-indicator relative mr-4 mt-1 opacity-0 scale-0">
                                    <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
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

                <!-- Ingredients Card -->
                <div class="ingredients-card recommendation-card bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 opacity-0 translate-x-8">
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-blue-800 flex items-center">
                            <div class="ingredients-icon relative mr-3 opacity-0 scale-0">
                                <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                                </svg>
                                <div class="absolute inset-0 w-7 h-7 bg-blue-300 rounded-full animate-ping opacity-20"></div>
                            </div>
                            <span class="ingredients-title opacity-0 translate-x-4">Key Ingredients</span>
                        </h3>
                        <div class="ingredients-underline w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2"></div>
                    </div>
                    <div class="ingredient-tags flex flex-wrap gap-3 mb-6">
                        ${rec.ingredients
                            .map(
                                (ingredient, index) => `
                            <span class="ingredient-tag px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-semibold transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-blue-200 opacity-0 scale-0" 
                                  data-ingredient="${index}">
                                ${ingredient}
                            </span>
                        `
                            )
                            .join('')}
                    </div>
                    <div class="severity-card p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border border-blue-200 transform transition-all duration-300 hover:shadow-lg opacity-0 translate-y-4">
                        <p class="text-blue-800 font-bold flex items-center">
                            <span class="severity-indicator inline-block w-3 h-3 bg-blue-500 rounded-full mr-2 opacity-0 scale-0"></span>
                            Severity Level: 
                            <span class="severity-badge ml-2 px-3 py-1 bg-blue-200 rounded-full text-blue-900">
                                ${rec.severity}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        `

        // Animate treatment card
        await this.animateTreatmentCard()

        // Animate ingredients card
        await this.animateIngredientsCard()
    }

    async animateTreatmentCard() {
        const treatmentCard = this.view.querySelector('.treatment-card')

        // Animate card entrance
        setTimeout(() => {
            treatmentCard.classList.remove('opacity-0', '-translate-x-8')
            treatmentCard.classList.add('animate-slideInLeft')
        }, 200)

        // Animate icon
        setTimeout(() => {
            const icon = treatmentCard.querySelector('.treatment-icon')
            icon.classList.remove('opacity-0', 'scale-0')
            icon.classList.add('animate-bounceIn')
        }, 500)

        // Animate title
        setTimeout(() => {
            const title = treatmentCard.querySelector('.treatment-title')
            title.classList.remove('opacity-0', 'translate-x-4')
            title.classList.add('animate-slideInRight')
        }, 700)

        // Animate underline
        setTimeout(() => {
            const underline = treatmentCard.querySelector('.treatment-underline')
            underline.classList.add('animate-expand')
        }, 900)

        // Animate treatment steps
        const steps = treatmentCard.querySelectorAll('.treatment-step')
        for (let i = 0; i < steps.length; i++) {
            setTimeout(
                () => {
                    const step = steps[i]
                    const indicator = step.querySelector('.step-indicator')

                    // Animate step
                    step.classList.remove('opacity-0', 'translate-x-4')
                    step.classList.add('animate-slideInLeft')

                    // Animate indicator
                    setTimeout(() => {
                        indicator.classList.remove('opacity-0', 'scale-0')
                        indicator.classList.add('animate-bounceIn', 'animate-pulse-glow')
                    }, 100)
                },
                1100 + i * 150
            )
        }
    }

    async animateIngredientsCard() {
        const ingredientsCard = this.view.querySelector('.ingredients-card')

        // Animate card entrance
        setTimeout(() => {
            ingredientsCard.classList.remove('opacity-0', 'translate-x-8')
            ingredientsCard.classList.add('animate-slideInRight')
        }, 400)

        // Animate icon
        setTimeout(() => {
            const icon = ingredientsCard.querySelector('.ingredients-icon')
            icon.classList.remove('opacity-0', 'scale-0')
            icon.classList.add('animate-bounceIn', 'animate-spin-slow')
        }, 700)

        // Animate title
        setTimeout(() => {
            const title = ingredientsCard.querySelector('.ingredients-title')
            title.classList.remove('opacity-0', 'translate-x-4')
            title.classList.add('animate-slideInLeft')
        }, 900)

        // Animate underline
        setTimeout(() => {
            const underline = ingredientsCard.querySelector('.ingredients-underline')
            underline.classList.add('animate-expand')
        }, 1100)

        // Animate ingredient tags
        const tags = ingredientsCard.querySelectorAll('.ingredient-tag')
        for (let i = 0; i < tags.length; i++) {
            setTimeout(
                () => {
                    const tag = tags[i]
                    tag.classList.remove('opacity-0', 'scale-0')
                    tag.classList.add('animate-bounceIn')

                    // Add wiggle effect on hover
                    tag.addEventListener('mouseenter', () => {
                        tag.classList.add('animate-wiggle')
                    })
                    tag.addEventListener('mouseleave', () => {
                        tag.classList.remove('animate-wiggle')
                    })
                },
                1300 + i * 100
            )
        }

        // Animate severity card
        setTimeout(() => {
            const severityCard = ingredientsCard.querySelector('.severity-card')
            severityCard.classList.remove('opacity-0', 'translate-y-4')
            severityCard.classList.add('animate-slideInUp')

            // Animate severity indicator
            setTimeout(() => {
                const indicator = severityCard.querySelector('.severity-indicator')
                indicator.classList.remove('opacity-0', 'scale-0')
                indicator.classList.add('animate-bounceIn', 'animate-pulse')
            }, 200)
        }, 1800)
    }

    addInteractiveEffects() {
        // Add hover effects to prediction items
        const predictionItems = this.view.querySelectorAll('.prediction-item')
        predictionItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.02) translateY(-2px)'
                item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)'
            })

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1) translateY(0)'
                item.style.boxShadow = ''
            })
        })

        // Add click effects to recommendation cards
        const recommendationCards = this.view.querySelectorAll('.recommendation-card')
        recommendationCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.add('animate-pulse')
                setTimeout(() => {
                    card.classList.remove('animate-pulse')
                }, 600)
            })
        })
    }

    startCounterAnimations() {
        // Start all counter animations that weren't started yet
        const counters = this.view.querySelectorAll('[data-counter]')
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter)
            this.animateCounter(counter, 0, target, 1000)
        })
    }

    async typewriterEffect(element, text) {
        element.textContent = ''
        element.style.borderRight = '2px solid #0d9488'

        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i]
            await new Promise(resolve => setTimeout(resolve, 50))
        }

        // Remove cursor after completion
        setTimeout(() => {
            element.style.borderRight = 'none'
        }, 1000)
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now()

        const animate = currentTime => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function for smooth animation
            const easedProgress = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(start + (end - start) * easedProgress)

            element.textContent = current + (element.textContent.includes('%') ? '%' : '')

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }

    showLoadingState() {
        this.view.querySelector('#loadingIndicator').classList.remove('hidden')
        this.view.querySelector('#errorMessage').classList.add('hidden')
        this.view.querySelector('#resultDetailContent').classList.add('hidden')
    }

    showErrorState(message) {
        this.view.querySelector('#loadingIndicator').classList.add('hidden')
        this.view.querySelector('#errorMessage').classList.remove('hidden')
        this.view.querySelector('#resultDetailContent').classList.add('hidden')

        const errorMessage = this.view.querySelector('#errorMessage p')
        if (errorMessage) {
            errorMessage.textContent = message || 'Failed to load scan details'
        }

        // Add enhanced error animation
        const errorContainer = this.view.querySelector('#errorMessage')
        errorContainer.classList.add('animate-shake', 'animate-slideInDown')

        // Auto-hide error after 10 seconds with fade out
        setTimeout(() => {
            errorContainer.classList.add('animate-fadeOut')
            setTimeout(() => {
                errorContainer.classList.add('hidden')
                errorContainer.classList.remove('animate-fadeOut')
            }, 500)
        }, 10000)
    }
}

export default ResultDetailPresenter
