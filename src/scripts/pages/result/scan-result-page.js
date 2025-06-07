class ScanResultPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this._setupEventListeners();
  }

  render() {
    this.innerHTML = `
            <style>
              .back-button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 0.5rem;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
                cursor: pointer;
                color: white;
                font-size: 0.875rem;
              }
              .back-button:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateX(-2px);
              }
              .result-image {
                width: 100%;
                height: 280px;
                background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                border: 2px dashed #d1d5db;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6b7280;
                text-align: center;
                font-size: 0.875rem;
                line-height: 1.4;
                position: relative;
                overflow: hidden;
              }
              .result-image::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                animation: shimmer 2s infinite;
              }
              @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
              }
              .info-section {
                background: #f9fafb;
                border-radius: 0.75rem;
                padding: 1.5rem;
                margin-bottom: 1.5rem;
                border: 1px solid rgba(0, 102, 122, 0.1);
                transition: all 0.3s ease;
              }
              .info-section:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 102, 122, 0.15);
                border-color: rgba(0, 102, 122, 0.2);
              }
              .info-label {
                font-weight: 600;
                color: #00667A;
                margin-bottom: 0.75rem;
                font-size: 1rem;
              }
              .info-content {
                color: #374151;
                font-size: 0.875rem;
                line-height: 1.6;
                min-height: 2.5rem;
              }
              .action-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
              }
              .action-button {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                transition: all 0.3s ease;
                cursor: pointer;
                text-decoration: none;
              }
              .primary-button {
                background: linear-gradient(135deg, #00667A 0%, #009CA6 100%);
                color: white;
                border: none;
              }
              .primary-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 102, 122, 0.2);
                background: linear-gradient(135deg, #005666 0%, #008A94 100%);
              }
              .secondary-button {
                background: white;
                color: #00667A;
                border: 1px solid #00667A;
              }
              .secondary-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 102, 122, 0.1);
                background: rgba(0, 102, 122, 0.05);
              }
            </style>
            
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
                  <button id="back-button" class="back-button">
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
                        <a href="#/history" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">History</a>
                        <a href="#/artikel" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Artikel</a>
                        <a href="#/" id="logoutBtn" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
      
              <!-- Content -->
              <main class="flex-grow px-4 py-8">
                <div class="max-w-4xl mx-auto">
                  <!-- Page Title -->
                  <div class="mb-6 text-center">
                    <h1 class="text-2xl md:text-3xl font-bold text-[#00667A]">Hasil Analisis Kulit</h1>
                    <p class="text-gray-600 mt-1">Laporan detail analisis kulit berdasarkan pemindaian gambar</p>
                  </div>
                  
                  <!-- Result Image -->
                  <div class="result-image mb-6">
                    <div class="text-center">
                      <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div class="font-medium">Foto Hasil Upload/Camera</div>
                    </div>
                  </div>
      
                  <!-- Acne Type Section -->
                  <div class="info-section">
                    <div class="info-label">Acne Type:</div>
                    <div class="info-content">
                      ${this.getAcneTypeResult()}
                    </div>
                  </div>
      
                  <!-- Treatment Medication Section -->
                  <div class="info-section">
                    <div class="info-label">Treatment Medication:</div>
                    <div class="info-content">
                      ${this.getTreatmentMedication()}
                    </div>
                  </div>
      
                  <!-- Handling Steps Section -->
                  <div class="info-section">
                    <div class="info-label">Handling Steps:</div>
                    <div class="info-content">
                      ${this.getHandlingSteps()}
                    </div>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div class="action-buttons">
                    <a href="#/dashboard" id="new-scan-button" class="action-button secondary-button">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      New Scan
                    </a>
                    <a href="#/history" id="history-button" class="action-button primary-button">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      View History
                    </a>
                  </div>
                  
                  <!-- Artikel Recommendation -->
                  <div class="mt-8 p-4 bg-gradient-to-r from-[#E5FFFB] to-[#F0FCFF] rounded-xl border border-[#C5E7E1] shadow-md">
                    <h3 class="font-semibold text-[#00667A] mb-2">Recommended Articles</h3>
                    <p class="text-gray-600 text-sm mb-3">Learn more about your skin condition with these helpful articles:</p>
                    <div class="flex flex-wrap gap-2">
                      <a href="#/artikel-detail/blackheads" class="text-sm bg-white px-3 py-1 rounded-full border border-[#C5E7E1] text-[#00667A] hover:bg-[#00667A] hover:text-white transition-colors">Blackheads</a>
                      <a href="#/artikel-detail/whiteheads" class="text-sm bg-white px-3 py-1 rounded-full border border-[#C5E7E1] text-[#00667A] hover:bg-[#00667A] hover:text-white transition-colors">Whiteheads</a>
                      <a href="#/artikel-detail/papula" class="text-sm bg-white px-3 py-1 rounded-full border border-[#C5E7E1] text-[#00667A] hover:bg-[#00667A] hover:text-white transition-colors">Papula</a>
                      <a href="#/artikel" class="text-sm bg-white px-3 py-1 rounded-full border border-[#C5E7E1] text-[#00667A] hover:bg-[#00667A] hover:text-white transition-colors">View All</a>
                    </div>
                  </div>
                </div>
              </main>
      
              <!-- Footer -->
              <footer class="text-center text-gray-500 text-sm py-4">
                © 2025 AcureScan. SkinCheck. All rights reserved.
              </footer>
            </div>
          `;
  }

  _setupEventListeners() {
    // Back button to dashboard
    const backButton = this.querySelector("#back-button");
    if (backButton) {
      backButton.addEventListener("click", () => {
        window.location.hash = "#/dashboard";
      });
    }

    // New Scan button
    const newScanButton = this.querySelector("#new-scan-button");
    if (newScanButton) {
      newScanButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "#/dashboard";
      });
    }

    // History button
    const historyButton = this.querySelector("#history-button");
    if (historyButton) {
      historyButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "#/history";
      });
    }

    // Logout button
    const logoutBtn = this.querySelector("#logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        // Clear authentication
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userEmail");
      });
    }

    // Article links
    this.querySelectorAll("a[href^='#/artikel']").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = link.getAttribute("href");
      });
    });
  }

  getAcneTypeResult() {
    // Simulasi hasil analisis - bisa diganti dengan data dari API
    const acneTypes = [
      "Blackheads (Komedo Hitam) - Ringan",
      "Inflammatory Acne (Jerawat Meradang) - Sedang",
      "Whiteheads (Komedo Putih) - Ringan",
      "Papular Acne (Jerawat Papula) - Sedang",
      "Cystic Acne (Jerawat Kistik) - Berat",
    ];
    return acneTypes[Math.floor(Math.random() * acneTypes.length)];
  }

  getTreatmentMedication() {
    return "• Benzoyl Peroxide 2.5% (pagi hari)<br>• Salicylic Acid Cleanser (malam hari)<br>• Moisturizer non-comedogenic<br>• Sunscreen SPF 30+ (wajib saat keluar rumah)";
  }

  getHandlingSteps() {
    return "1. Bersihkan wajah dengan gentle cleanser 2x sehari<br>2. Aplikasikan treatment sesuai petunjuk<br>3. Jangan memencet atau menyentuh area jerawat<br>4. Gunakan produk non-comedogenic<br>5. Konsultasi ke dokter jika tidak membaik dalam 4-6 minggu";
  }
}

customElements.define("scan-result-page", ScanResultPage);
