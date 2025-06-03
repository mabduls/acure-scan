class ArtikelPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this._addClickListeners();
  }

  render() {
    this.innerHTML = `
      <div class="min-h-screen bg-gradient-to-b from-[#FFECDF] to-[#C5E7E1] flex flex-col">
        <!-- Header -->
        <header class="bg-[#00667A] text-white py-4 px-6 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span class="text-xl font-bold">AcureScan</span>
          </div>
          
          <!-- Tombol Kembali -->
          <button id="back-button" class="flex items-center space-x-2 hover:bg-[#004b5d] px-3 py-2 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="text-sm">Kembali</span>
          </button>
        </header>

        <!-- Main Content -->
        <main class="flex-1 py-8 px-4">
          <div class="max-w-6xl mx-auto">
            <!-- Header Artikel -->
            <div class="text-center mb-12">
              <h1 class="text-3xl font-bold text-[#00667A] mb-2">Artikel Kesehatan Kulit</h1>
              <h2 class="text-xl font-semibold text-[#009CA6]">Mengenal Jenis-jenis Jerawat</h2>
              <div class="w-24 h-1 bg-[#009CA6] mx-auto mt-4 rounded-full"></div>
            </div>

            <!-- Intro Paragraf -->
            <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-white/20">
              <p class="text-gray-700 leading-7 text-justify">
                Jerawat adalah masalah kulit yang umum dialami oleh banyak orang. Memahami berbagai jenis jerawat sangat penting untuk menentukan perawatan yang tepat. Setiap jenis jerawat memiliki karakteristik dan cara penanganan yang berbeda. Berikut adalah penjelasan lengkap mengenai jenis-jenis jerawat yang perlu Anda ketahui.
              </p>
            </div>

            <!-- Artikel Cards -->
            <div class="space-y-8">
              <article data-slug="blackheads" class="artikel-card cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="md:flex">
                  <div class="md:w-2/5">
                    <img src="/images/artikel/blackheads.jpg" alt="Blackheads" class="w-full h-64 md:h-full object-cover" />
                  </div>
                  <div class="md:w-3/5 p-8">
                    <div class="flex items-center mb-4">
                      <div class="w-2 h-8 bg-[#00667A] rounded-full mr-4"></div>
                      <h3 class="text-2xl font-bold text-[#00667A]">
                        Jerawat Blackheads (Komedo Hitam)
                      </h3>
                    </div>
                    <p class="text-gray-700 leading-7 text-justify mb-6">
                      Blackheads atau komedo hitam adalah pori-pori yang tersumbat oleh minyak dan sel kulit mati yang terpapar udara sehingga berubah warna menjadi hitam. Jenis jerawat ini umumnya muncul di area T-zone wajah seperti hidung, dahi, dan dagu. Meskipun tidak menimbulkan peradangan, blackheads dapat mempengaruhi penampilan kulit.
                    </p>
                    <div class="flex items-center text-[#009CA6] font-semibold hover:text-[#00667A] transition-colors">
                      <span class="mr-2">Baca selengkapnya</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>

              <article data-slug="whiteheads" class="artikel-card cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="md:flex md:flex-row-reverse">
                  <div class="md:w-2/5">
                    <img src="/images/artikel/whiteheads.jpg" alt="Whiteheads" class="w-full h-64 md:h-full object-cover" />
                  </div>
                  <div class="md:w-3/5 p-8">
                    <div class="flex items-center mb-4">
                      <div class="w-2 h-8 bg-[#00667A] rounded-full mr-4"></div>
                      <h3 class="text-2xl font-bold text-[#00667A]">
                        Jerawat Whiteheads (Komedo Putih)
                      </h3>
                    </div>
                    <p class="text-gray-700 leading-7 text-justify mb-6">
                      Whiteheads atau komedo putih adalah pori-pori yang tersumbat oleh minyak dan sel kulit mati yang tertutup lapisan kulit, sehingga tampak sebagai benjolan kecil berwarna putih. Berbeda dengan blackheads, whiteheads tidak terpapar udara sehingga tetap berwarna putih atau flesh-tone. Jenis jerawat ini sering muncul di area pipi dan dahi.
                    </p>
                    <div class="flex items-center text-[#009CA6] font-semibold hover:text-[#00667A] transition-colors">
                      <span class="mr-2">Baca selengkapnya</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>

              <article data-slug="papula" class="artikel-card cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="md:flex">
                  <div class="md:w-2/5">
                    <img src="/images/artikel/papula.jpg" alt="Papula" class="w-full h-64 md:h-full object-cover" />
                  </div>
                  <div class="md:w-3/5 p-8">
                    <div class="flex items-center mb-4">
                      <div class="w-2 h-8 bg-[#00667A] rounded-full mr-4"></div>
                      <h3 class="text-2xl font-bold text-[#00667A]">
                        Jerawat Papula
                      </h3>
                    </div>
                    <p class="text-gray-700 leading-7 text-justify mb-6">
                      Papula adalah jenis jerawat yang meradang, terasa sakit saat disentuh, dan terlihat kemerahan tanpa nanah di permukaan kulit. Papula terbentuk ketika dinding folikel rambut pecah akibat peradangan, menyebabkan bakteri menyebar ke jaringan kulit sekitarnya. Jenis jerawat ini tidak boleh dipencet karena dapat memperparah peradangan.
                    </p>
                    <div class="flex items-center text-[#009CA6] font-semibold hover:text-[#00667A] transition-colors">
                      <span class="mr-2">Baca selengkapnya</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>

              <article data-slug="pustula" class="artikel-card cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="md:flex md:flex-row-reverse">
                  <div class="md:w-2/5">
                    <img src="/images/artikel/pustula.jpg" alt="Pustula" class="w-full h-64 md:h-full object-cover" />
                  </div>
                  <div class="md:w-3/5 p-8">
                    <div class="flex items-center mb-4">
                      <div class="w-2 h-8 bg-[#00667A] rounded-full mr-4"></div>
                      <h3 class="text-2xl font-bold text-[#00667A]">
                        Jerawat Pustula
                      </h3>
                    </div>
                    <p class="text-gray-700 leading-7 text-justify mb-6">
                      Pustula adalah jerawat yang berisi nanah di tengahnya, berwarna putih atau kuning, dan dikelilingi oleh peradangan kemerahan. Berbeda dengan papula, pustula memiliki "mata" putih di tengahnya yang berisi nanah. Jenis jerawat ini terbentuk ketika sel darah putih berkumpul untuk melawan infeksi bakteri di dalam pori-pori yang tersumbat.
                    </p>
                    <div class="flex items-center text-[#009CA6] font-semibold hover:text-[#00667A] transition-colors">
                      <span class="mr-2">Baca selengkapnya</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>

              <article data-slug="kistik" class="artikel-card cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="md:flex">
                  <div class="md:w-1/3">
                    <img src="/images/artikel/kistik.jpg" alt="Jerawat Kistik" class="w-full h-64 md:h-full object-cover" />
                  </div>
                  <div class="md:w-2/3 p-8">
                    <div class="flex items-center mb-4">
                      <div class="w-2 h-8 bg-[#00667A] rounded-full mr-4"></div>
                      <h3 class="text-2xl font-bold text-[#00667A]">
                        Jerawat Kistik (Cystic Acne)
                      </h3>
                    </div>
                    <p class="text-gray-700 leading-7 text-justify mb-6">
                      Jerawat kistik adalah jenis jerawat parah yang terbentuk jauh di bawah permukaan kulit. Berisi nanah, terasa nyeri, dan berisiko meninggalkan bekas luka permanen. Jerawat kistik memerlukan penanganan khusus dari dermatologis karena dapat menyebabkan kerusakan jaringan kulit yang serius. Jenis jerawat ini sering dikaitkan dengan faktor hormonal dan genetik.
                    </p>
                    <div class="flex items-center text-[#009CA6] font-semibold hover:text-[#00667A] transition-colors">
                      <span class="mr-2">Baca selengkapnya</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <!-- Penutup Artikel -->
            <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mt-8 shadow-lg border border-white/20">
              <p class="text-gray-700 leading-7 text-justify">
                Mengenali jenis jerawat yang Anda alami adalah langkah pertama untuk mendapatkan perawatan yang tepat. Jika jerawat tidak membaik dengan perawatan rumahan, sebaiknya konsultasikan dengan dokter kulit untuk mendapatkan penanganan yang sesuai dengan kondisi kulit Anda.
              </p>
            </div>
          </div>
        </main>

        <!-- Footer -->
        <footer class="text-center text-gray-500 text-sm py-4 border-t border-white/20">
          © 2025 AcureScan. SkinCheck. All rights reserved.
        </footer>
      </div>
    `;
  }

  _addClickListeners() {
    // Tombol kembali
    const backButton = this.querySelector('#back-button');
    backButton.addEventListener('click', () => {
      window.history.back();
    });

    // Artikel cards
    this.querySelectorAll('.artikel-card').forEach(card => {
      card.addEventListener('click', () => {
        const slug = card.getAttribute('data-slug');
        window.location.hash = `/artikel-detail/${slug}`;
      });
    });
  }
}

customElements.define('artikel-page', ArtikelPage);