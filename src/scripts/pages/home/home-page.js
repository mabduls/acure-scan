class HomePage extends HTMLElement {
    connectedCallback() {
        this.render()

        // Upload Gambar (input file)
        const uploadTrigger = this.querySelector('#uploadTrigger')
        const imageInput = this.querySelector('#imageInput')
        uploadTrigger.addEventListener('click', () => imageInput.click())

        // Using Camera: tombol untuk buka kamera real-time
        const cameraTrigger = this.querySelector('#cameraTrigger')
        cameraTrigger.addEventListener('click', () => this.openCamera())

        // History navigation
        const historyTrigger = this.querySelector('#historyTrigger')
        historyTrigger.addEventListener('click', () => {
            window.location.hash = '#/history'
        })
    }

    async openCamera() {
        // Remove existing popup if any (toggle)
        let existingPopup = this.querySelector('#cameraPopup')
        if (existingPopup) {
            existingPopup.remove()
            return
        }

        // Insert keyframe animations once
        if (!document.querySelector('#cameraAnimations')) {
            const style = document.createElement('style')
            style.id = 'cameraAnimations'
            style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(1rem); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .camera-button:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
          }
          .camera-button:active {
            transform: translateY(0);
            box-shadow: none;
          }
        `
            document.head.appendChild(style)
        }

        // Create popup overlay
        const popup = document.createElement('div')
        popup.id = 'cameraPopup'
        popup.className =
            'fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm animate-fadeIn'

        // Camera container (glass morphism style for light theme)
        const cameraContainer = document.createElement('div')
        cameraContainer.className =
            'bg-white rounded-3xl p-6 shadow-lg flex flex-col items-center animate-slideUp max-w-md w-full mx-4'

        // Video preview
        const video = document.createElement('video')
        video.autoplay = true
        video.className = 'w-full max-w-sm rounded-xl border border-gray-300 shadow-md bg-black'

        // Buttons container
        const buttonContainer = document.createElement('div')
        buttonContainer.className = 'flex gap-6 mt-6'

        // Snap button (cyan accent)
        const snapBtn = document.createElement('button')
        snapBtn.type = 'button'
        snapBtn.className =
            'camera-button inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300'
        snapBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
        </svg>
        Jepret
      `

        // Close button (red accent)
        const closeBtn = document.createElement('button')
        closeBtn.type = 'button'
        closeBtn.className =
            'camera-button inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 font-semibold text-white shadow-md transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-red-300'
        closeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        Tutup
      `

        buttonContainer.appendChild(snapBtn)
        buttonContainer.appendChild(closeBtn)

        // Assemble popup
        cameraContainer.appendChild(video)
        cameraContainer.appendChild(buttonContainer)
        popup.appendChild(cameraContainer)
        this.appendChild(popup)

        let stream
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            })
            video.srcObject = stream
        } catch (err) {
            // Error message container
            const errorDiv = document.createElement('div')
            errorDiv.className =
                'mt-6 rounded-lg bg-red-100 border border-red-300 px-4 py-3 text-red-700 font-medium text-center shadow-sm'
            errorDiv.textContent = 'Tidak dapat mengakses kamera: ' + err.message

            // Retry button
            const retryBtn = document.createElement('button')
            retryBtn.type = 'button'
            retryBtn.className =
                'mt-3 px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors'
            retryBtn.textContent = 'Coba Lagi'

            retryBtn.addEventListener('click', () => {
                errorDiv.remove()
                retryBtn.remove()
                this.openCamera()
            })

            cameraContainer.appendChild(errorDiv)
            cameraContainer.appendChild(retryBtn)
            return
        }

        snapBtn.addEventListener('click', () => {
            snapBtn.style.animation = 'pulse 0.3s ease-out'

            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const imageDataUrl = canvas.toDataURL('image/png')

            // Preview container
            const previewContainer = document.createElement('div')
            previewContainer.className =
                'bg-white rounded-xl p-4 mt-6 border border-gray-300 shadow-md animate-slideUp max-w-sm mx-auto'

            const imgPreview = document.createElement('img')
            imgPreview.src = imageDataUrl
            imgPreview.alt = 'Preview Foto'
            imgPreview.className = 'w-full rounded-lg shadow-lg border border-gray-200'

            const successLabel = document.createElement('div')
            successLabel.textContent = '✓ Foto berhasil diambil!'
            successLabel.className =
                'mt-3 text-green-600 font-semibold text-center bg-green-100 p-2 rounded-md border border-green-300'

            previewContainer.appendChild(imgPreview)
            previewContainer.appendChild(successLabel)
            cameraContainer.appendChild(previewContainer)

            // Stop camera & hide video and snap button
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
            video.style.display = 'none'
            snapBtn.style.display = 'none'
        })

        closeBtn.addEventListener('click', () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }
            popup.remove()
        })

        // Close popup on backdrop click
        popup.addEventListener('click', e => {
            if (e.target === popup) {
                closeBtn.click()
            }
        })
    }

    render() {
        this.innerHTML = `
        <style>
          @keyframes fadeIn {
            from {opacity: 0; transform: scale(0.95);}
            to {opacity: 1; transform: scale(1);}
          }
          @keyframes slideUp {
            from {opacity: 0; transform: translateY(1rem);}
            to {opacity: 1; transform: translateY(0);}
          }
          @keyframes pulse {
            0%, 100% {transform: scale(1);}
            50% {transform: scale(1.05);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease forwards;
          }
          .animate-slideUp {
            animation: slideUp 0.4s ease forwards;
          }
          .camera-button {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .camera-button:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
          }
          .camera-button:active {
            transform: translateY(0);
            box-shadow: none;
          }
        </style>
        <div class="min-h-screen bg-white flex flex-col">
          <header class="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-30">
            <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
              <div class="flex items-center space-x-3">
                <svg class="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span class="text-2xl font-extrabold text-gray-900">AcureScan</span>
              </div>
              <nav class="space-x-6 hidden md:flex text-gray-600 font-medium">
                <a href="#" class="hover:text-cyan-600 transition">Home</a>
                <a href="#/artikel" class="hover:text-cyan-600 transition">Article</a>
                <a href="#/history" class="hover:text-cyan-600 transition">History</a>
              </nav>
              <div class="hidden md:flex">
                <button class="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-5 py-2 rounded-md transition focus:outline-none focus:ring-4 focus:ring-cyan-300">
                  Get Started
                </button>
              </div>
              <button id="mobileMenuButton" aria-label="Open Menu" class="md:hidden text-gray-600 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>
          </header>
  
          <main class="flex-grow max-w-7xl mx-auto px-6 py-16">
            <!-- Hero Section -->
            <section class="max-w-4xl mx-auto text-center mb-20">
              <h1 class="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Deteksi Penyakit Jerawat dengan Teknologi Machine Learning
              </h1>
              <p class="text-gray-600 text-lg">
                Akurasi tinggi untuk diagnosa kulit yang lebih baik.
              </p>
              <div class="mt-8">
                <button id="uploadTrigger" class="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg font-semibold shadow-lg hover:bg-cyan-700 transition focus:outline-none focus:ring-4 focus:ring-cyan-300 cursor-pointer">
                  Upload Gambar
                  <input id="imageInput" type="file" accept="image/*" class="hidden" />
                </button>
                <button id="cameraTrigger" class="ml-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-pointer">
                  Buka Kamera
                </button>
              </div>
            </section>
  
            <!-- Features grid -->
            <section class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              <div id="uploadTrigger" class="cursor-pointer select-none rounded-xl bg-[#E9F7FB] shadow hover:shadow-lg transition p-8 flex flex-col items-center text-center">
                <img src="/images/icon/upload.png" alt="Upload Icon" class="w-20 h-20 mb-4" />
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Upload Gambar</h3>
                <p class="text-gray-600">Upload photo dari galeri untuk analisa</p>
              </div>
  
              <div id="cameraTrigger" class="cursor-pointer select-none rounded-xl bg-[#D8FAEC] shadow hover:shadow-lg transition p-8 flex flex-col items-center text-center" role="button" tabindex="0" aria-label="Buka kamera untuk ambil foto">
                <img src="/images/icon/camera.png" alt="Camera Icon" class="w-20 h-20 mb-4" />
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Using Camera</h3>
                <p class="text-gray-600">Ambil foto now dengan kamera</p>
              </div>
  
              <div id="historyTrigger" class="cursor-pointer select-none rounded-xl bg-[#EFFBED] shadow hover:shadow-lg transition p-8 flex flex-col items-center text-center" role="button" tabindex="0" aria-label="Lihat halaman riwayat">
                <img src="/images/icon/histori.png" alt="History Icon" class="w-16 h-16 mb-4" />
                <h3 class="text-xl font-semibold text-gray-900 mb-2">History</h3>
                <p class="text-gray-600">Lihat hasil scan sebelumnya</p>
              </div>
            </section>
  
            <!-- Article Section -->
            <section class="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col md:flex-row items-center gap-8" tabindex="0" role="link" aria-label="Lihat artikel tentang jerawat">
              <img src="/images/news.jpeg" alt="Article Image" class="w-40 h-40 object-cover rounded-lg shadow-md flex-shrink-0" />
              <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-2">See Article</h3>
                <p class="text-gray-600 leading-relaxed">
                  Baca artikel tentang jerawat, tipe-tipe, cara mengobati, dan obat-obatan terkait.
                </p>
              </div>
            </section>
          </main>
  
          <footer class="text-center text-gray-500 text-sm py-10">
            © 2025 AcureScan. SkinCheck. All rights reserved.
          </footer>
        </div>
      `
    }
}

customElements.define('home-page', HomePage)
