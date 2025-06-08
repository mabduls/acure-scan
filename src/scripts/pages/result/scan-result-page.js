class ScanResultPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this._setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <style>
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
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
          <div class="flex items-center space-x-4">
            <button id="back-button" class="back-button flex items-center gap-2 px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-[#00667A] transition">
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
            <div class="mb-6 text-center">
              <h1 class="text-2xl md:text-3xl font-bold text-[#00667A]">Hasil Analisis Kulit</h1>
              <p class="text-gray-600 mt-1">Laporan detail analisis kulit berdasarkan pemindaian gambar</p>
            </div>

            <div class="result-image mb-6 w-full h-72 bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] border-2 border-dashed border-[#d1d5db] rounded-lg flex items-center justify-center relative overflow-hidden">
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <div class="font-medium">Foto Hasil Upload/Camera</div>
              </div>
              <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white opacity-50 animate-shimmer"></div>
            </div>

            <!-- Acne Type Section -->
            <div class="info-section bg-white rounded-lg p-4 mb-4 border border-[#C5E7E1] shadow-md">
              <div class="info-label font-semibold text-[#00667A]">Acne Type:</div>
              <div class="info-content text-gray-700">
                ${this.getAcneTypeResult()}
              </div>
            </div>

            <!-- Treatment Medication Section -->
            <div class="info-section bg-white rounded-lg p-4 mb-4 border border-[#C5E7E1] shadow-md">
              <div class="info-label font-semibold text-[#00667A]">Treatment Medication:</div>
              <div class="info-content text-gray-700">
                ${this.getTreatmentMedication()}
              </div>
            </div>

            <!-- Handling Steps Section -->
            <div class="info-section bg-white rounded-lg p-4 mb-4 border border-[#C5E7E1] shadow-md">
              <div class="info-label font-semibold text-[#00667A]">Handling Steps:</div>
              <div class="info-content text-gray-700">
                ${this.getHandlingSteps()}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons flex gap-4 mt-6">
              <a href="#/dashboard" id="new-scan-button" class="action-button flex-1 bg-white text-[#00667A] border border-[#C5E7E1] rounded-lg py-2 flex items-center justify-center hover:bg-[#00667A] hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                New Scan
              </a>
              <a href="#/history" id="history-button" class="action-button flex-1 bg-gradient-to-r from-[#00667A] to-[#009CA6] text-white rounded-lg py-2 flex items-center justify-center hover:bg-[#005666] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    // Simulated acne type results
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
