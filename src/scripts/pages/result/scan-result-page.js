class ScanResultPage extends HTMLElement {
  connectedCallback() {
    this.render();
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
          color: white;
          font-size: 0.875rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
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
          <button onclick="window.history.back()" class="back-button">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Kembali
          </button>
        </header>

        <!-- Content -->
        <main class="flex-grow px-4 py-8">
          <!-- Result Image -->
          <div class="result-image mb-6">
            <div class="text-center">
              <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <div class="font-medium">Output Foto Hasil upload gambar galery/Menggunakan Camera</div>
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
        </main>

        <!-- Footer -->
        <footer class="text-center text-gray-500 text-sm py-4">
          © 2025 AcureScan. SkinCheck. All rights reserved.
        </footer>
      </div>
    `;
  }

  getAcneTypeResult() {
    // Simulasi hasil analisis - bisa diganti dengan data dari API
    const acneTypes = [
      "Blackheads (Komedo Hitam) - Ringan",
      "Inflammatory Acne (Jerawat Meradang) - Sedang",
      "Whiteheads (Komedo Putih) - Ringan",
      "Papular Acne (Jerawat Papula) - Sedang",
      "Cystic Acne (Jerawat Kistik) - Berat"
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

customElements.define('scan-result-page', ScanResultPage);