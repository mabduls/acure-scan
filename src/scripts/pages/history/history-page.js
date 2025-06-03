class HistoryPage extends HTMLElement {
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
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(-2px);
        }
        .history-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 102, 122, 0.1);
        }
        .history-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 102, 122, 0.15);
          border-color: rgba(0, 102, 122, 0.2);
        }
        .image-placeholder {
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border: 2px dashed #d1d5db;
          position: relative;
          overflow: hidden;
        }
        .image-placeholder::before {
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
        .info-label {
          color: #00667A;
          font-weight: 600;
        }
        .info-value {
          color: #374151;
          margin-left: 0.5rem;
        }
        .date-badge {
          background: rgba(0, 102, 122, 0.1);
          color: #00667A;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
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
        <section class="flex-grow px-4 py-8 space-y-6">
          ${this.generateHistoryCards(3)}
        </section>

        <!-- Footer -->
        <footer class="text-center text-gray-500 text-sm py-4">
          © 2025 AcureScan. SkinCheck. All rights reserved.
        </footer>
      </div>
    `;
  }

  generateHistoryCards(count) {
    const sampleData = [
      {
        acneType: "Blackheads (Komedo Hitam)",
        handling: "Bersihkan wajah 2x sehari, gunakan salicylic acid",
        medication: "Cleanser BHA, Retinoid topical",
        date: "2 Juni 2025"
      },
      {
        acneType: "Inflammatory Acne (Jerawat Meradang)",
        handling: "Kompres dingin, hindari memencet jerawat",
        medication: "Benzoyl peroxide 2.5%, Antibiotik topikal",
        date: "1 Juni 2025"
      },
      {
        acneType: "Whiteheads (Komedo Putih)",
        handling: "Eksfoliasi lembut 2-3x seminggu",
        medication: "Glycolic acid, Moisturizer non-comedogenic",
        date: "31 Mei 2025"
      }
    ];

    return Array(count).fill('').map((_, index) => {
      const data = sampleData[index] || sampleData[0];
      return `
        <div class="history-card flex bg-gray-100 rounded-xl shadow-md p-6 gap-6">
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
              <span class="date-badge">${data.date}</span>
            </div>
            <div class="space-y-2 text-sm">
              <p><span class="info-label">Acne Type:</span><span class="info-value">${data.acneType}</span></p>
              <p><span class="info-label">Handling Steps:</span><span class="info-value">${data.handling}</span></p>
              <p><span class="info-label">Treatment Medication:</span><span class="info-value">${data.medication}</span></p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

customElements.define('history-page', HistoryPage);