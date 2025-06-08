class ArtikelDetailPage extends HTMLElement {
    connectedCallback() {
        this._initializeArticle()
        this._setupEventListeners()
    }

    _initializeArticle() {
        const url = window.location.hash // Example: "#/artikel-detail/blackheads"
        let jenis = ''

        try {
            // Extract the slug from the URL
            const pathSegments = url.split('/')
            jenis = pathSegments[pathSegments.length - 1] // Get the last segment

            console.log('Loading article detail for:', jenis)
        } catch (error) {
            console.error('Error parsing article ID:', error)
            this._showErrorMessage('Could not parse article ID from URL')
            return
        }

        const dataArtikel = {
            blackheads: {
                title: 'Blackheads (Komedo Hitam)',
                img: '/images/artikel/blackheads.jpg',
                content:
                    'Blackheads adalah tonjolan kecil berwarna hitam karena pori-pori terbuka yang tersumbat minyak dan sel kulit mati. Umumnya muncul di wajah, dada, punggung, leher, dan bahu. Tidak terasa sakit saat disentuh.',
                ciri: [
                    'Tonjolan kecil berwarna hitam karena pori-pori terbuka',
                    'Umumnya muncul di wajah, dada, punggung, leher, dan bahu',
                    'Tidak terasa sakit saat disentuh'
                ],
                penyebab: [
                    'Penumpukan minyak dan sel kulit mati',
                    'Produksi sebum berlebih',
                    'Bakteri Propionibacterium acnes',
                    'Perubahan hormon (pubertas, menstruasi, penggunaan pil KB)',
                    'Pola makan tinggi gula dan produk susu'
                ],
                penanganan: [
                    'Asam salisilat: Mengelupas sel kulit mati dan membuka pori-pori',
                    'Retinoid topikal: Mempercepat regenerasi sel',
                    'Chemical peeling: Menggunakan bahan kimia untuk eksfoliasi',
                    'Terapi laser: Mengurangi produksi minyak dan bakteri'
                ],
                pencegahan: [
                    'Cuci wajah dua kali sehari dengan pembersih ringan',
                    'Gunakan produk non-comedogenic',
                    'Hindari menyentuh wajah secara berlebihan',
                    'Eksfoliasi ringan 1–2 kali seminggu',
                    'Kurangi konsumsi makanan tinggi gula dan susu'
                ]
            },
            whiteheads: {
                title: 'Whiteheads (Komedo Putih)',
                img: '/images/artikel/whiteheads.jpg',
                content:
                    'Whiteheads adalah bintik kecil berwarna putih akibat pori-pori tersumbat tetapi tertutup oleh lapisan kulit. Berbeda dengan blackheads, komedo putih tidak terpapar udara sehingga tetap berwarna putih.',
                ciri: [
                    'Bintik kecil berwarna putih',
                    'Pori-pori tersumbat tetapi tertutup lapisan kulit',
                    'Tidak terasa sakit dan tidak meradang'
                ],
                penyebab: [
                    'Produksi sebum dan penumpukan sel kulit mati',
                    'Perubahan hormon',
                    'Penggunaan produk yang tidak cocok dengan kulit'
                ],
                penanganan: [
                    'Asam salisilat: Membersihkan pori-pori',
                    'Retinoid ringan: Mengatur siklus pergantian sel kulit',
                    'Rutin membersihkan wajah: Hindari memencet komedo'
                ],
                pencegahan: [
                    'Pilih produk skincare dengan label non-comedogenic',
                    'Jaga kebersihan wajah dan rambut',
                    'Ganti sarung bantal dan handuk secara rutin',
                    'Hindari produk terlalu berat (terutama yang berbasis minyak)'
                ]
            },
            papula: {
                title: 'Papules (Jerawat Papula)',
                img: '/images/artikel/papula.jpg',
                content:
                    'Papules adalah benjolan kecil, merah, padat, tidak mengandung nanah. Kulit terasa meradang dan kasar saat disentuh. Jenis jerawat ini menunjukkan adanya peradangan pada pori-pori yang tersumbat.',
                ciri: [
                    'Benjolan kecil, merah, dan padat',
                    'Tidak mengandung nanah',
                    'Kulit terasa meradang dan kasar',
                    'Nyeri saat disentuh'
                ],
                penyebab: [
                    'Perubahan hormon',
                    'Infeksi bakteri P. acnes',
                    'Produksi minyak berlebih',
                    'Pemakaian kosmetik berat dan pola makan buruk'
                ],
                penanganan: [
                    'Pembersih wajah lembut: Menghindari iritasi',
                    'Asam salisilat, benzoil peroksida, sulfur: Mengurangi peradangan',
                    'Antibiotik topikal atau oral: Jika peradangan parah',
                    'Hindari memencet jerawat'
                ],
                pencegahan: [
                    'Gunakan skincare ringan dan tidak menyumbat pori',
                    'Hindari makanan pemicu (gula, makanan cepat saji)',
                    'Jangan sering menyentuh atau memencet wajah',
                    'Bersihkan wajah sebelum dan sesudah aktivitas berat'
                ]
            },
            pustula: {
                title: 'Pustules (Jerawat Pustula)',
                img: '/images/artikel/pustula.jpg',
                content:
                    'Pustules adalah benjolan merah dengan titik putih di tengah yang berisi nanah. Nyeri saat disentuh dan mudah pecah jika tidak ditangani dengan benar. Merupakan tahap lanjut dari papula yang terinfeksi.',
                ciri: [
                    'Benjolan merah dengan titik putih di tengah',
                    'Berisi nanah',
                    'Nyeri saat disentuh',
                    'Mudah pecah jika dipencet'
                ],
                penyebab: [
                    'Kombinasi minyak berlebih, sel kulit mati, dan bakteri',
                    'Pengaruh hormonal',
                    'Kosmetik berat, stres, dan faktor genetik',
                    'Kebiasaan merokok'
                ],
                penanganan: [
                    'Asam salisilat & benzoil peroksida: Mengurangi sumbatan dan bakteri',
                    'Retinoid & antibiotik topikal: Menenangkan peradangan',
                    'Antibiotik oral / isotretinoin: Untuk kasus parah',
                    'Fototerapi: Menggunakan cahaya untuk membunuh bakteri'
                ],
                pencegahan: [
                    'Rutin cuci muka dan lakukan double cleansing',
                    'Gunakan sunscreen non-komedogenik',
                    'Hindari produk yang terlalu oklusif (menyumbat pori)',
                    'Jaga pola makan dan tidur yang teratur'
                ]
            },
            kistik: {
                title: 'Cystic Acne (Jerawat Kistik)',
                img: '/images/artikel/kistik.jpg',
                content:
                    'Cystic acne adalah benjolan besar, merah, dalam, terasa nyeri, dan berisi nanah. Merupakan jenis jerawat paling parah yang terbentuk jauh di bawah permukaan kulit dan sering meninggalkan bekas luka permanen.',
                ciri: [
                    'Benjolan besar, merah, dan dalam',
                    'Terasa sangat nyeri',
                    'Berisi nanah',
                    'Sering meninggalkan bekas luka'
                ],
                penyebab: [
                    'Produksi minyak berlebih yang menyumbat jaringan kulit dalam',
                    'Perubahan hormon yang ekstrem',
                    'Kosmetik berat dan tidak cocok',
                    'Faktor genetik, stres, dan obat-obatan tertentu'
                ],
                penanganan: [
                    'Antibiotik oral: Mengurangi bakteri dan inflamasi',
                    'Retinoid topikal: Mengatur regenerasi kulit',
                    'Isotretinoin oral: Obat kuat untuk jerawat parah (resep dokter)',
                    'Suntik kortikosteroid: Mengempiskan jerawat besar dengan cepat'
                ],
                pencegahan: [
                    'Hindari penggunaan produk wajah berat dan berminyak',
                    'Rutin konsultasi dengan dermatologis jika ada riwayat keluarga',
                    'Kelola stres dengan baik (olahraga, meditasi, tidur cukup)',
                    'Hindari memencet jerawat kistik karena bisa memperburuk luka'
                ]
            }
        }

        const artikel = dataArtikel[jenis]

        if (!artikel) {
            this._showErrorMessage('Artikel tidak ditemukan')
            return
        }

        this._renderArticle(artikel)
    }

    _showErrorMessage(message) {
        this.innerHTML = `
          <div class="p-6 max-w-xl mx-auto text-center">
            <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
              <div class="flex items-center justify-center">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <p class="ml-3 text-red-700 font-semibold text-lg">${message}</p>
              </div>
            </div>
            <button id="back-to-articles" class="mt-6 bg-[#00667A] text-white px-6 py-2 rounded-full hover:bg-[#004b5d] transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-[#00667A] focus:ring-offset-2">
              Kembali ke Daftar Artikel
            </button>
          </div>
        `

        const backButton = this.querySelector('#back-to-articles')
        if (backButton) {
            backButton.addEventListener('click', () => {
                window.location.hash = '#/artikel'
            })
        }
    }

    _renderArticle(artikel) {
        this.innerHTML = `
        <div class="max-w-5xl mx-auto p-6 sm:p-12 font-sans text-gray-700 select-none">
          <!-- Back Button -->
          <button id="back-to-articles-list" class="mb-8 inline-flex items-center gap-2 px-5 py-2 border-2 border-[#00667A] rounded-full text-[#00667A] hover:bg-[#00667A] hover:text-white transition-transform transform focus:outline-none focus:ring-4 focus:ring-[#00667A]" aria-label="Kembali ke daftar artikel">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Kembali ke Artikel
          </button>
  
          <!-- Article Title -->
          <h1 class="text-5xl font-extrabold text-[#00667A] mb-6 leading-tight break-words">
            ${artikel.title}
          </h1>
          <div class="w-20 h-1 mb-12 rounded-full bg-gradient-to-r from-[#00667A] via-[#009CA6] to-[#00667A]"></div>
  
          <!-- Hero Image -->
          <img src="${artikel.img}" alt="${
              artikel.title
          }" class="w-full rounded-2xl shadow-lg mb-10 object-cover max-h-96 transition-transform duration-300 hover:scale-105" />
  
          <!-- Introduction Content -->
          <p class="text-lg mb-12 leading-relaxed text-gray-600 tracking-wide">
            ${artikel.content}
          </p>
  
          <!-- Sections -->
          <section class="mb-14">
            <h2 class="text-2xl font-semibold text-[#00667A] mb-4 border-l-4 border-[#009CA6] pl-4">
              Ciri-ciri dan Gejala
            </h2>
            <p class="mb-4 text-gray-700">
              Berikut adalah karakteristik utama yang dapat membantu Anda mengidentifikasi kondisi ini:
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              ${artikel.ciri.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </section>
  
          <section class="mb-14">
            <h2 class="text-2xl font-semibold text-[#00667A] mb-4 border-l-4 border-[#009CA6] pl-4">
              Penyebab dan Faktor Risiko
            </h2>
            <p class="mb-4 text-gray-700">
              Memahami penyebab kondisi ini sangat penting untuk pencegahan dan penanganan yang tepat:
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              ${artikel.penyebab.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </section>
  
          <section class="mb-14">
            <h2 class="text-2xl font-semibold text-[#00667A] mb-4 border-l-4 border-[#009CA6] pl-4">
              Cara Mengatasi dan Pengobatan
            </h2>
            <p class="mb-4 text-gray-700">
              Terdapat berbagai metode penanganan yang dapat dilakukan, mulai dari perawatan mandiri hingga bantuan medis profesional:
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              ${artikel.penanganan.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </section>
  
          <section class="mb-14">
            <h2 class="text-2xl font-semibold text-[#00667A] mb-4 border-l-4 border-[#009CA6] pl-4">
              Pencegahan dan Perawatan
            </h2>
            <p class="mb-4 text-gray-700">
              Langkah-langkah pencegahan berikut dapat membantu mengurangi risiko terjadinya kondisi ini:
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-600">
              ${artikel.pencegahan.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </section>
  
          <section class="mb-16">
            <h2 class="text-2xl font-semibold text-[#00667A] mb-6 border-l-4 border-[#009CA6] pl-4">
              Tips Penting untuk Diingat
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-gradient-to-r from-[#C5E7E1] to-[#FFECDF] rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 cursor-default">
                <div class="text-4xl mb-3">✅</div>
                <p class="font-semibold text-[#00667A]">Jaga kebersihan kulit dengan rutin dan konsisten</p>
              </div>
              <div class="bg-gradient-to-r from-[#C5E7E1] to-[#FFECDF] rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 cursor-default">
                <div class="text-4xl mb-3">🚫</div>
                <p class="font-semibold text-[#00667A]">Hindari memencet atau menyentuh area yang bermasalah</p>
              </div>
              <div class="bg-gradient-to-r from-[#C5E7E1] to-[#FFECDF] rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 cursor-default">
                <div class="text-4xl mb-3">👨‍⚕️</div>
                <p class="font-semibold text-[#00667A]">Konsultasikan dengan dokter kulit untuk penanganan optimal</p>
              </div>
            </div>
          </section>
  
          <!-- Navigation Buttons -->
          <section class="flex flex-col sm:flex-row sm:justify-between gap-4 mb-10">
            <a href="#/artikel" id="all-articles-button" class="flex items-center gap-2 justify-center flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-[#C5E7E1] to-[#FFECDF] text-[#00667A] font-semibold shadow transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#00667A]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Lihat Semua Artikel
            </a>
            <a href="#/dashboard" id="dashboard-button" class="flex items-center gap-2 justify-center flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-[#00667A] to-[#009CA6] text-white font-semibold shadow transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#00667A]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Kembali ke Dashboard
            </a>
          </section>
  
          <!-- Footer -->
          <footer class="border-t border-gray-200 py-8 text-center text-gray-500 text-sm select-none max-w-5xl mx-auto">
            © 2025 AcureScan. SkinCheck. All rights reserved.
          </footer>
        </div>
      `
    }

    _setupEventListeners() {
        // Add event listeners after DOM is updated
        setTimeout(() => {
            const backButton = this.querySelector('#back-to-articles-list')
            backButton?.addEventListener('click', () => {
                window.location.hash = '#/artikel'
            })

            const allArticlesButton = this.querySelector('#all-articles-button')
            allArticlesButton?.addEventListener('click', e => {
                e.preventDefault()
                window.location.hash = '#/artikel'
            })

            const dashboardButton = this.querySelector('#dashboard-button')
            dashboardButton?.addEventListener('click', e => {
                e.preventDefault()
                window.location.hash = '#/dashboard'
            })
        }, 100)
    }
}

customElements.define('artikel-detail-page', ArtikelDetailPage)
