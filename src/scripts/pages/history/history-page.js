class HistoryPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this._setupEventListeners()
        this._initializeAnimations()
    }

    render() {
        this.innerHTML = `
        <style>
            /* Enhanced Animations and Transitions */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideInScale {
                from {
                    opacity: 0;
                    transform: scale(0.8) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }

            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }

            @keyframes shimmer {
                0% {
                    background-position: -1000px 0;
                }
                100% {
                    background-position: 1000px 0;
                }
            }

            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-10px);
                }
            }

            @keyframes glow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(0, 156, 166, 0.3);
                }
                50% {
                    box-shadow: 0 0 30px rgba(0, 156, 166, 0.6);
                }
            }

            .animate-fadeInUp {
                animation: fadeInUp 0.6s ease-out forwards;
            }

            .animate-fadeInLeft {
                animation: fadeInLeft 0.6s ease-out forwards;
            }

            .animate-fadeInRight {
                animation: fadeInRight 0.6s ease-out forwards;
            }

            .animate-slideInScale {
                animation: slideInScale 0.5s ease-out forwards;
            }

            .animate-pulse {
                animation: pulse 2s infinite;
            }

            .animate-float {
                animation: float 3s ease-in-out infinite;
            }

            .animate-glow {
                animation: glow 2s ease-in-out infinite;
            }

            .shimmer-loading {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 1000px 100%;
                animation: shimmer 2s infinite;
            }

            /* Enhanced Hover Effects */
            .history-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                will-change: transform, opacity, box-shadow;
            }

            .history-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .history-card:hover {
                transform: translateY(-12px) scale(1.02);
                box-shadow: 0 20px 40px rgba(0, 103, 122, 0.15);
                border: 2px solid rgba(0, 156, 166, 0.3);
            }

            .history-card:hover .image-placeholder {
                transform: scale(1.1);
                transition: transform 0.3s ease;
            }

            .history-card:hover .acne-type {
                color: #009CA6;
                transform: scale(1.05);
                transition: all 0.3s ease;
            }

            /* Button Animations */
            .btn-animated {
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .btn-animated::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s ease;
            }

            .btn-animated:hover::before {
                left: 100%;
            }

            .btn-animated:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 103, 122, 0.3);
            }

            .btn-animated:active {
                transform: translateY(0);
                transition: transform 0.1s ease;
            }

            /* Header animations */
            .header-animated {
                opacity: 0;
                transform: translateY(-20px);
                animation: fadeInUp 0.8s ease-out 0.2s forwards;
            }

            /* Loading animations */
            .loading-dots::after {
                content: '';
                animation: dots 1.5s infinite;
            }

            @keyframes dots {
                0%, 20% { content: ''; }
                40% { content: '.'; }
                60% { content: '..'; }
                80%, 100% { content: '...'; }
            }

            /* Stagger animation for cards */
            .stagger-1 { animation-delay: 0.1s; }
            .stagger-2 { animation-delay: 0.2s; }
            .stagger-3 { animation-delay: 0.3s; }
            .stagger-4 { animation-delay: 0.4s; }
            .stagger-5 { animation-delay: 0.5s; }
            .stagger-6 { animation-delay: 0.6s; }

            /* Enhanced gradient background */
            .gradient-bg {
                background: linear-gradient(-45deg, #E5FFFB, #F0F9FF, #E5FFFB, #FFFFFF);
                background-size: 400% 400%;
                animation: gradientShift 15s ease infinite;
            }

            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            /* Interactive elements */
            .interactive-icon {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .interactive-icon:hover {
                transform: rotate(360deg) scale(1.2);
                color: #009CA6;
            }

            /* Detail link animation */
            .detail-link {
                position: relative;
                overflow: hidden;
            }

            .detail-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                background: linear-gradient(90deg, #00667A, #009CA6);
                transition: width 0.3s ease;
            }

            .detail-link:hover::after {
                width: 100%;
            }

            /* Advanced Micro-animations */
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes typewriter {
                from { width: 0; }
                to { width: 100%; }
            }

            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: #00667A; }
            }

            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            @keyframes slideInFromBottom {
                from {
                    opacity: 0;
                    transform: translateY(100px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes wiggle {
                0%, 7% { transform: rotateZ(0); }
                15% { transform: rotateZ(-15deg); }
                20% { transform: rotateZ(10deg); }
                25% { transform: rotateZ(-10deg); }
                30% { transform: rotateZ(6deg); }
                35% { transform: rotateZ(-4deg); }
                40%, 100% { transform: rotateZ(0); }
            }

            /* Ripple effect */
            .ripple-effect {
                position: relative;
                overflow: hidden;
            }

            .ripple-effect::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }

            .ripple-effect:active::after {
                width: 300px;
                height: 300px;
            }

            /* Typewriter effect */
            .typewriter {
                overflow: hidden;
                border-right: 2px solid #00667A;
                white-space: nowrap;
                margin: 0 auto;
                letter-spacing: 0.1em;
                animation: typewriter 2s steps(40, end), blink 0.75s step-end infinite;
            }

            /* Bounce in animation */
            .animate-bounceIn {
                animation: bounceIn 0.8s ease-out forwards;
            }

            /* Wiggle animation */
            .animate-wiggle {
                animation: wiggle 2s ease-in-out infinite;
            }

            /* Slide in from bottom */
            .animate-slideInFromBottom {
                animation: slideInFromBottom 0.6s ease-out forwards;
            }

            /* Parallax effect */
            .parallax-bg {
                background-attachment: fixed;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }

            /* Enhanced card animations */
            .history-card {
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
            }

            .history-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, transparent, rgba(0, 156, 166, 0.1), transparent);
                opacity: 0;
                transition: opacity 0.3s ease;
                border-radius: inherit;
            }

            .history-card:hover::before {
                opacity: 1;
            }

            /* Loading skeleton */
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }

            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }

            /* Responsive animations */
            @media (max-width: 768px) {
                .history-card:hover {
                    transform: translateY(-8px) scale(1.01);
                }
                
                .animate-fadeInUp,
                .animate-fadeInLeft,
                .animate-fadeInRight {
                    animation-duration: 0.4s;
                }
            }

            /* Smooth scrolling */
            html {
                scroll-behavior: smooth;
            }

            /* Performance optimizations */
            .history-card,
            .btn-animated,
            .interactive-icon {
                will-change: transform;
                backface-visibility: hidden;
                perspective: 1000px;
            }
        </style>

        <div class="min-h-screen gradient-bg flex flex-col">
          <!-- Header with Animation -->
          <header class="bg-[#00667A] text-white py-4 px-6 flex justify-between items-center header-animated shadow-lg">
            <div class="flex items-center space-x-2">
              <svg class="w-7 h-7 text-white interactive-icon animate-float" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 6 4 4 6.5 4C8.24 4 9.91 5.04 10.63 6.56h1.74C14.09 5.04 15.76 4 17.5 4C20 4 22 6 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35z"/>
              </svg>
              <span class="text-xl font-bold">AcureScan</span>
            </div>
            
            <!-- Navigation Menu -->
            <div class="flex items-center space-x-4">
              <button id="back-button" class="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 rounded-md text-white border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 btn-animated">
                <svg class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Kembali
              </button>
              
              <div class="relative group">
                <button class="flex items-center space-x-2 hover:bg-[#004b5d] px-3 py-2 rounded-lg transition-all duration-300 btn-animated">
                  <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                  <span class="text-sm">Menu</span>
                </button>
                
                <!-- Dropdown Menu with Animation -->
                <div class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl invisible opacity-0 transform -translate-y-2 scale-95 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 z-50">
                  <div class="py-2">
                    <a href="#/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">Dashboard</a>
                    <a href="#/artikel" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">Artikel</a>
                    <a href="#/" id="logoutBtn" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200">Logout</a>
                  </div>
                </div>
              </div>
            </div>
          </header>
  
          <!-- Content with Stagger Animation -->
          <section class="flex-grow px-4 py-8">
            <div class="max-w-4xl mx-auto">
              <!-- Section Header with Animation -->
              <div class="mb-8 animate-fadeInUp">
                <h1 class="text-3xl font-bold text-[#00667A] mb-2 typewriter">Riwayat Pemindaian</h1>
                <p class="text-gray-600 animate-fadeInLeft" style="animation-delay: 2s; opacity: 0;">Berikut adalah riwayat pemindaian kulit Anda</p>
              </div>
              
              <!-- History Cards Container -->
              <div id="history-cards-container">
                ${this.generateHistoryCards(3)}
              </div>
              
              <!-- Navigation Button with Animation -->
              <div class="mt-8 text-center animate-fadeInUp">
                <a href="#/dashboard" id="dashboard-button" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00667A] to-[#009CA6] text-white font-semibold rounded-md transition-all duration-300 btn-animated animate-glow hover:from-[#009CA6] hover:to-[#00667A]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Kembali ke Dashboard
                </a>
              </div>
            </div>
          </section>
  
          <!-- Footer with Animation -->
          <footer class="text-center text-gray-500 text-sm py-4 animate-fadeInUp">
            © 2025 AcureScan. SkinCheck. All rights reserved.
          </footer>
        </div>
      `
    }

    _setupEventListeners() {
        // Back button to dashboard
        const backButton = this.querySelector('#back-button')
        if (backButton) {
            backButton.addEventListener('click', () => {
                this._addExitAnimation()
                setTimeout(() => {
                    window.location.hash = '#/dashboard'
                }, 300)
            })
        }

        // Dashboard button at bottom
        const dashboardButton = this.querySelector('#dashboard-button')
        if (dashboardButton) {
            dashboardButton.addEventListener('click', e => {
                e.preventDefault()
                this._addExitAnimation()
                setTimeout(() => {
                    window.location.hash = '#/dashboard'
                }, 300)
            })
        }

        // Logout button
        const logoutBtn = this.querySelector('#logoutBtn')
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                // Clear authentication
                localStorage.removeItem('userLoggedIn')
                localStorage.removeItem('userEmail')
                
                // Add logout animation
                this._addExitAnimation()
                setTimeout(() => {
                    window.location.hash = '#/'
                }, 300)
            })
        }

        // Add click animations to history cards
        this.querySelectorAll('.history-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault()
                card.style.transform = 'scale(0.95)'
                card.style.transition = 'transform 0.1s ease'
                
                setTimeout(() => {
                    card.style.transform = 'scale(1.02)'
                    setTimeout(() => {
                        card.style.transform = ''
                        window.location.hash = '#/scan-result'
                    }, 100)
                }, 100)
            })
        })
    }

    _initializeAnimations() {
        // Animate cards in sequence
        const cards = this.querySelectorAll('.history-card')
        cards.forEach((card, index) => {
            card.classList.add(`stagger-${index + 1}`)
            
            // Add intersection observer for scroll animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in')
                        observer.unobserve(entry.target)
                    }
                })
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            })
            
            observer.observe(card)
        })

        // Add scroll-based animations
        this._setupScrollAnimations()
        
        // Add hover sound effect simulation
        this._setupHoverEffects()
    }

    _setupScrollAnimations() {
        const animatedElements = this.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight')
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'
                    entry.target.style.transform = 'translateY(0) translateX(0)'
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        })

        animatedElements.forEach(el => {
            el.style.opacity = '0'
            observer.observe(el)
        })
    }

    _setupHoverEffects() {
        // Add interactive hover effects
        const interactiveElements = this.querySelectorAll('.btn-animated, .history-card, .interactive-icon')
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.style.transform = el.style.transform + ' scale(1.05)'
            })
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = el.style.transform.replace(' scale(1.05)', '')
            })
        })
    }

    _addExitAnimation() {
        const main = this.querySelector('section')
        if (main) {
            main.style.animation = 'fadeInUp 0.3s ease-out reverse forwards'
        }
    }

    generateHistoryCards(count) {
        const sampleData = [
            {
                acneType: 'Blackheads (Komedo Hitam)',
                handling: 'Bersihkan wajah 2x sehari, gunakan salicylic acid',
                medication: 'Cleanser BHA, Retinoid topical',
                date: '2 Juni 2025'
            },
            {
                acneType: 'Inflammatory Acne (Jerawat Meradang)',
                handling: 'Kompres dingin, hindari memencet jerawat',
                medication: 'Benzoyl peroxide 2.5%, Antibiotik topikal',
                date: '1 Juni 2025'
            },
            {
                acneType: 'Whiteheads (Komedo Putih)',
                handling: 'Eksfoliasi lembut 2-3x seminggu',
                medication: 'Glycolic acid, Moisturizer non-comedogenic',
                date: '31 Mei 2025'
            }
        ]

        return Array(count)
            .fill('')
            .map((_, index) => {
                const data = sampleData[index] || sampleData[0]
                return `
            <div class="history-card flex bg-white rounded-xl shadow-lg p-6 gap-6 mb-6 cursor-pointer group">
              <div class="w-32 h-32 image-placeholder flex items-center justify-center text-xs text-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div class="text-gray-600 font-medium transition-all duration-300 group-hover:scale-110">
                  <svg class="w-8 h-8 mx-auto mb-2 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Foto Hasil Scan
                </div>
              </div>
              <div class="flex-1 space-y-3">
                <div class="flex justify-between items-start">
                  <h3 class="font-semibold text-lg text-gray-800 acne-type transition-all duration-300">Hasil Analisis</h3>
                  <span class="bg-gradient-to-r from-[#00667A] to-[#009CA6] text-white rounded-full px-3 py-1 text-xs animate-pulse">${data.date}</span>
                </div>
                <div class="space-y-2 text-sm">
                  <p class="transition-all duration-300 hover:text-[#00667A]">
                    <span class="font-semibold text-[#00667A]">Acne Type:</span> 
                    <span class="text-gray-700">${data.acneType}</span>
                  </p>
                  <p class="transition-all duration-300 hover:text-[#00667A]">
                    <span class="font-semibold text-[#00667A]">Handling Steps:</span> 
                    <span class="text-gray-700">${data.handling}</span>
                  </p>
                  <p class="transition-all duration-300 hover:text-[#00667A]">
                    <span class="font-semibold text-[#00667A]">Treatment Medication:</span> 
                    <span class="text-gray-700">${data.medication}</span>
                  </p>
                </div>
                <div class="mt-4 flex justify-end">
                  <a href="#/scan-result" class="text-sm text-[#00667A] hover:text-[#009CA6] transition-all duration-300 flex items-center gap-1 detail-link">
                    <span>Lihat Detail</span>
                    <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          `
            })
            .join('')
    }
}

customElements.define('history-page', HistoryPage)