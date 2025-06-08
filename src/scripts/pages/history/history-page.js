class HistoryPage extends HTMLElement {
    connectedCallback() {
        this.render()
        this._setupEventListeners()
    }

    render() {
        this.innerHTML = `
        <div class="min-h-screen bg-gradient-to-b from-[#E5FFFB] to-white flex flex-col">
          <!-- Header -->
          <header class="bg-[#00667A] text-white py-4 px-6 flex justify-between items-center">
            <div class="flex items-center space-x-2">
              <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 6 4 4 6.5 4C8.24 4 9.91 5.04 10.63 6.56h1.74C14.09 5.04 15.76 4 17.5 4C20 4 22 6 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35z"/>
              </svg>
              <span class="text-xl font-bold">AcureScan</span>
            </div>
            
            <!-- Navigation Menu -->
            <div class="flex items-center space-x-4">
              <button id="back-button" class="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 rounded-md text-white border border-white border-opacity-20 hover:bg-opacity-20 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Kembali
              </button>
              
              <div class="relative group">
                <button class="flex items-center space-x-2 hover:bg-[#004b5d] px-3 py-2 rounded-lg transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                  <span class="text-sm">Menu</span>
                </button>
                
                <!-- Dropdown Menu -->
                <div class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl invisible opacity-0 transform -translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50">
                  <div class="py-2">
                    <a href="#/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>
                    <a href="#/artikel" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Artikel</a>
                    <a href="#/" id="logoutBtn" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
                  </div>
                </div>
              </div>
            </div>
          </header>
  
          <!-- Content -->
          <section class="flex-grow px-4 py-8">
            <div class="max-w-4xl mx-auto">
              <!-- Section Header -->
              <div class="mb-8">
                <h1 class="text-3xl font-bold text-[#00667A] mb-2">Riwayat Pemindaian</h1>
                <p class="text-gray-600">Berikut adalah riwayat pemindaian kulit Anda</p>
              </div>
              
              ${this.generateHistoryCards(3)}
              
              <!-- Navigation Button -->
              <div class="mt-8 text-center">
                <a href="#/dashboard" id="dashboard-button" class="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00667A] to-[#009CA6] text-white font-semibold rounded-md transition-transform transform hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Kembali ke Dashboard
                </a>
              </div>
            </div>
          </section>
  
          <!-- Footer -->
          <footer class="text-center text-gray-500 text-sm py-4">
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
                window.location.hash = '#/dashboard'
            })
        }

        // Dashboard button at bottom
        const dashboardButton = this.querySelector('#dashboard-button')
        if (dashboardButton) {
            dashboardButton.addEventListener('click', e => {
                e.preventDefault()
                window.location.hash = '#/dashboard'
            })
        }

        // Logout button
        const logoutBtn = this.querySelector('#logoutBtn')
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                // Clear authentication
                localStorage.removeItem('userLoggedIn')
                localStorage.removeItem('userEmail')
            })
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
            <div class="history-card flex bg-gray-100 rounded-xl shadow-md p-6 gap-6 mb-6">
              <div class="w-32 h-32 image-placeholder flex items-center justify-center text-xs text-center rounded-lg">
                <div class="text-gray-600 font-medium">
                  <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Foto Hasil Scan
                </div>
              </div>
              <div class="flex-1 space-y-3">
                <div class="flex justify-between items-start">
                  <h3 class="font-semibold text-lg text-gray-800">Hasil Analisis</h3>
                  <span class="bg-[#00667A] text-white rounded-full px-3 py-1 text-xs">${data.date}</span>
                </div>
                <div class="space-y-2 text-sm">
                  <p><span class="font-semibold text-[#00667A]">Acne Type:</span> <span class="text-gray-700">${data.acneType}</span></p>
                  <p><span class="font-semibold text-[#00667A]">Handling Steps:</span> <span class="text-gray-700">${data.handling}</span></p>
                  <p><span class="font-semibold text-[#00667A]">Treatment Medication:</span> <span class="text-gray-700">${data.medication}</span></p>
                </div>
                <div class="mt-4 flex justify-end">
                  <a href="#/scan-result" class="text-sm text-[#00667A] hover:text-[#009CA6] transition-colors flex items-center gap-1">
                    <span>Lihat Detail</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
