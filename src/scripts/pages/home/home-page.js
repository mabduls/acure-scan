class HomePage extends HTMLElement {
  connectedCallback() {
    this.render();

    // Upload Gambar (input file)
    const uploadTrigger = this.querySelector('#uploadTrigger');
    const imageInput = this.querySelector('#imageInput');
    uploadTrigger.addEventListener('click', () => imageInput.click());

    // Using Camera: tombol untuk buka kamera real-time
    const cameraTrigger = this.querySelector('#cameraTrigger');
    cameraTrigger.addEventListener('click', () => this.openCamera());

    // History navigation (optional)
    const historyTrigger = this.querySelector('#historyTrigger');
    historyTrigger.addEventListener('click', () => {
      window.location.hash = '#/history';
    });
  }

  async openCamera() {
    // Cek apakah sudah ada popup kamera, jika ada hapus dulu
    let existingPopup = this.querySelector('#cameraPopup');
    if (existingPopup) {
      existingPopup.remove();
      return; // kalau mau toggle, bisa juga langsung return saja
    }

    // Buat popup untuk kamera dengan desain modern
    const popup = document.createElement('div');
    popup.id = 'cameraPopup';
    popup.style = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,184,166,0.1) 100%);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    `;

    // Add CSS animation keyframes
    if (!document.querySelector('#cameraAnimations')) {
      const style = document.createElement('style');
      style.id = 'cameraAnimations';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .camera-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(20,184,166,0.3);
        }
        .camera-button:active {
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
    }

    // Container untuk kamera dengan border modern
    const cameraContainer = document.createElement('div');
    cameraContainer.style = `
      background: rgba(255,255,255,0.1);
      border: 2px solid rgba(255,255,255,0.2);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.3);
      animation: slideUp 0.4s ease-out;
      backdrop-filter: blur(20px);
    `;

    // Video untuk preview kamera dengan modern styling
    const video = document.createElement('video');
    video.style = `
      width: 90vw; 
      max-width: 400px; 
      border-radius: 16px; 
      box-shadow: 0 15px 35px rgba(0,0,0,0.4);
      border: 3px solid rgba(255,255,255,0.3);
      background: #000;
    `;
    video.autoplay = true;
    cameraContainer.appendChild(video);

    // Container untuk tombol-tombol
    const buttonContainer = document.createElement('div');
    buttonContainer.style = `
      display: flex;
      gap: 16px;
      margin-top: 24px;
      justify-content: center;
    `;

    // Tombol Jepret dengan desain modern
    const snapBtn = document.createElement('button');
    snapBtn.innerHTML = `
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 8px;">
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
      Jepret
    `;
    snapBtn.className = 'camera-button';
    snapBtn.style = `
      padding: 14px 28px;
      border-radius: 50px;
      background: linear-gradient(45deg, #14B8A6, #0891B2);
      color: white;
      font-weight: 600;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(20,184,166,0.4);
      font-size: 16px;
      letter-spacing: 0.5px;
    `;

    // Tombol Tutup dengan desain modern
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = `
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 6px;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
      Tutup
    `;
    closeBtn.className = 'camera-button';
    closeBtn.style = `
      padding: 12px 24px;
      border-radius: 50px;
      background: linear-gradient(45deg, #EF4444, #DC2626);
      color: white;
      font-weight: 500;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(239,68,68,0.4);
      font-size: 14px;
    `;

    buttonContainer.appendChild(snapBtn);
    buttonContainer.appendChild(closeBtn);
    cameraContainer.appendChild(buttonContainer);
    popup.appendChild(cameraContainer);
    this.appendChild(popup);

    // Akses kamera
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      video.srcObject = stream;
    } catch (err) {
      // Modern error popup
      const errorDiv = document.createElement('div');
      errorDiv.style = `
        background: linear-gradient(45deg, #EF4444, #DC2626);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        margin-top: 16px;
        box-shadow: 0 8px 25px rgba(239,68,68,0.3);
        text-align: center;
        font-weight: 500;
      `;
      errorDiv.textContent = 'Tidak dapat mengakses kamera: ' + err.message;
      cameraContainer.appendChild(errorDiv);
      
      setTimeout(() => popup.remove(), 3000);
      return;
    }

    // Fungsi Jepret
    snapBtn.addEventListener('click', () => {
      // Add capture animation
      snapBtn.style.animation = 'pulse 0.3s ease-out';
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');

      // Modern preview dengan animasi
      const previewContainer = document.createElement('div');
      previewContainer.style = `
        background: rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 16px;
        margin-top: 20px;
        animation: slideUp 0.4s ease-out;
        border: 2px solid rgba(255,255,255,0.2);
      `;

      const imgPreview = document.createElement('img');
      imgPreview.src = imageDataUrl;
      imgPreview.style = `
        max-width: 90vw; 
        border-radius: 12px; 
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        border: 2px solid rgba(255,255,255,0.3);
      `;

      const successLabel = document.createElement('div');
      successLabel.textContent = '✓ Foto berhasil diambil!';
      successLabel.style = `
        color: #10B981;
        font-weight: 600;
        text-align: center;
        margin-top: 12px;
        padding: 8px;
        background: rgba(16,185,129,0.1);
        border-radius: 8px;
        border: 1px solid rgba(16,185,129,0.3);
      `;

      previewContainer.appendChild(imgPreview);
      previewContainer.appendChild(successLabel);
      cameraContainer.appendChild(previewContainer);

      // Stop kamera setelah jepret dan hide elements
      stream.getTracks().forEach(track => track.stop());
      video.style.display = 'none';
      snapBtn.style.display = 'none';
    });

    // Tutup popup & stop kamera
    closeBtn.addEventListener('click', () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      popup.style.animation = 'fadeIn 0.3s ease-out reverse';
      setTimeout(() => popup.remove(), 200);
    });

    // Close on backdrop click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closeBtn.click();
      }
    });
  }

  render() {
    this.innerHTML = `
      <div class="min-h-screen bg-gradient-to-b from-[#E5FFFB] to-white flex flex-col">
        <!-- Header -->
        <header class="bg-[#00667A] text-white py-4 px-6 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                       2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74
                       C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5
                       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span class="text-xl font-bold">AcureScan</span>
          </div>
          <div>
            <svg class="w-9 h-9 text-white bg-cyan-600 rounded-full p-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 
                       1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2
                       c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </header>

        <!-- Welcome Section -->
        <section class="flex-grow px-6 py-8">
          <div class="bg-gradient-to-l from-[#F5F5F5] to-[#D2F0EB] p-6 rounded-lg shadow-md max-w-2xl text-left">
            <h1 class="text-2xl md:text-3xl font-bold text-teal-700 mb-2">Welcome!</h1>
            <p class="text-gray-600 text-sm">Deteksi penyakit jerawat menggunakan teknologi machine learning</p>
          </div>
        </section>

        <section class="flex-grow px-6 py-8">
          <div class="bg-[#e0f5ef] p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto space-y-6">

            <!-- Grid untuk 3 card pertama -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              <!-- Upload Gambar -->
              <div
                id="uploadTrigger"
                class="bg-[#E9F7FB] rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition min-h-[260px] cursor-pointer"
              >
                <div class="mb-4 rounded-full bg-cyan-100 w-16 h-16 flex items-center justify-center overflow-hidden">
                  <img src="/images/icon/upload.png" alt="Upload Gambar" class="w-20 h-20 object-contain" />
                </div>
                <input id="imageInput" type="file" accept="image/*" class="hidden" />
                <h3 class="font-semibold text-teal-700 mb-2">Upload Gambar</h3>
                <p class="text-sm text-gray-700">Upload photo from gallery</p>
              </div>

              <!-- Using Camera -->
              <div
                id="cameraTrigger"
                class="bg-[#D8FAEC] rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition min-h-[260px] cursor-pointer"
                role="button"
                tabindex="0"
                aria-label="Open camera to take picture"
              >
                <div class="mb-4 rounded-full bg-cyan-100 w-16 h-16 flex items-center justify-center overflow-hidden">
                  <img src="/images/icon/camera.png" alt="Using Camera" class="w-20 h-20 object-contain" />
                </div>
                <h3 class="font-semibold text-teal-700 mb-2">Using Camera</h3>
                <p class="text-sm text-gray-700">Take the picture now</p>
              </div>

              <!-- History -->
              <div
                id="historyTrigger"
                class="bg-[#EFFBED] rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition min-h-[260px] cursor-pointer"
                role="button"
                tabindex="0"
                aria-label="Go to History Page"
              >
                <div class="mb-4 rounded-full bg-cyan-100 w-16 h-16 flex items-center justify-center overflow-hidden">
                  <img src="/images/icon/histori.png" alt="History Icon" class="w-12 h-12 object-contain" />
                </div>
                <h3 class="font-semibold text-teal-700 mb-2">History</h3>
                <p class="text-sm text-gray-700">See your previous scan results</p>
              </div>

            </div>

            <!-- See Article (tanpa background bulat) -->
            <a href="#/artikel" class="rounded-lg p-6 shadow-md flex flex-col md:flex-row items-center gap-6 cursor-pointer bg-gradient-to-r from-green-50 to-green-100 hover:shadow-lg transition-transform duration-300 active:scale-95">
              <img src="/images/news.jpeg" alt="Article Icon" class="w-36 h-36 object-contain transition-transform duration-300" />
              <div class="text-left flex-1">
                <h3 class="font-semibold text-teal-700 mb-2 text-xl">See Article</h3>
                <p class="text-gray-600 text-base">See the article about acne, its types, how to treat it, and its medicine</p>
              </div>
            </a>
          </div>
        </section>

        <!-- Footer -->
        <footer class="text-center text-gray-500 text-sm py-4">
          © 2025 AcureScan. SkinCheck. All rights reserved.
        </footer>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);