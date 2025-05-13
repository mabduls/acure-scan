class LandingPage extends HTMLElement {
  connectedCallback() {
      this.render();
  }

  render() {
      this.innerHTML = `
      <div class="bg-gradient-to-b from-[#DBF1E7] to-[#C5E7E1] min-h-screen flex flex-col">
          <!-- Navigation -->
          <nav class="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
              <div class="flex items-center">
                  <svg class="w-6 h-6 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 17.27L16.15 21L14.64 13.97L20 9.24L12.76 8.63L10 2L7.24 8.63L0 9.24L5.36 13.97L3.85 21L10 17.27Z" />
                  </svg>
                  <div class="text-2xl font-bold">
                      <span class="text-teal-700">Acure</span><span class="text-teal-600">Scan</span>
                  </div>
              </div>
              <div class="hidden md:flex space-x-8">
                  <a href="#home" class="text-gray-600 hover:text-teal-600 nav-link">Home</a>
                  <a href="#why-acurescan" class="text-gray-600 hover:text-teal-600 nav-link">Why AcureScan</a>
                  <a href="#" class="text-gray-600 hover:text-teal-600">Contact</a>
              </div>
              <div class="flex space-x-4">
                  <a href="#" class="text-teal-700 font-medium hover:text-teal-800">Login</a>
                  <a href="#" class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">Sign Up</a>
              </div>
          </nav>

          <!-- Hero Section -->
          <section id="home" class="flex-grow">
              <div class="bg-[#e0f5ef] m-6 md:m-10 rounded-xl shadow-lg flex-grow">
                  <main class="flex flex-col md:flex-row items-center px-6 py-12">
                      <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8">
                          <h2 class="text-gray-600 font-medium text-lg md:text-xl mb-3">Detect & Resolve</h2>
                          <h1 class="text-3xl md:text-5xl font-bold text-teal-700 mb-4">
                              Accurate detection of acne on the face becomes easy for you
                          </h1>
                          <p class="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                              Feel free to use our application and start detecting acne on your face
                          </p>
                          <a href="#" class="inline-block bg-cyan-400 hover:bg-cyan-500 text-white font-medium rounded-full px-8 py-3 shadow-md transition-all">
                              Start Sign In
                          </a>
                      </div>
                      <div class="md:w-1/2 flex justify-center">
                          <div class="relative w-full max-w-md">
                              <div class="rounded-lg w-full h-96 bg-teal-100 flex items-center justify-center">
                                  <div class="text-center p-4">
                                      <svg class="w-16 h-16 mx-auto text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                          viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      <p class="text-teal-700">Acne Detection Illustration</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </main>
              </div>
          </section>

                
<!-- Section 2: Fitur Utama -->
<section class="min-h-screen flex flex-col">
    <div class="bg-gradient-to-b from-[#C5E7E1] to-[#FFFFFF] m-6 md:m-10 rounded-xl shadow-lg flex-grow px-6 py-12">
        <h2 class="text-2xl md:text-3xl font-bold text-teal-800 mb-10 text-left border-b-2 border-teal-800 inline-block">Fitur Utama</h2>


                   <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <div class="bg-[#E9F7FB] p-6 rounded-lg shadow text-center transform transition duration-300 hover:scale-105 hover:shadow-lg max-w-xs mx-auto">
        <img src="https://img.icons8.com/color/96/face-scan.png" alt="Scan Acne Type" class="mx-auto mb-4 w-12 h-12" />
        <h3 class="font-semibold text-lg text-teal-700">Scan Acne Type</h3>
        <p class="text-sm text-gray-600 mt-2">Mengidentifikasi berbagai jenis penyakit jerawat dengan cepat</p>
    </div>
    <div class="bg-[#E9F7FB] p-6 rounded-lg shadow text-center transform transition duration-300 hover:scale-105 hover:shadow-lg max-w-xs mx-auto">
        <img src="https://img.icons8.com/color/96/pill.png" alt="Treatment Recommendations" class="mx-auto mb-4 w-12 h-12" />
        <h3 class="font-semibold text-lg text-teal-700">Treatment Recommendations</h3>
        <p class="text-sm text-gray-600 mt-2">Menyarankan obat yang tepat berdasarkan analisis kondisi jerawat</p>
    </div>
    <div class="bg-[#E9F7FB] p-6 rounded-lg shadow text-center transform transition duration-300 hover:scale-105 hover:shadow-lg max-w-xs mx-auto">
        <img src="https://img.icons8.com/color/96/spa-flower.png" alt="Customized care" class="mx-auto mb-4 w-12 h-12" />
        <h3 class="font-semibold text-lg text-teal-700">Customized care</h3>
        <p class="text-sm text-gray-600 mt-2">Memberikan rencana perawatan yang sesuai untuk kulit anda</p>
    </div>
</div>

                 <div class="flex flex-col md:flex-row items-center md:justify-between bg-gradient-to-r from-[#C5E7E1] to-[#FFFFFF] rounded-xl shadow p-6 mb-8">
    <div class="text-gray-900 text-lg md:text-xl md:w-2/3 mb-4 md:mb-0"> <!-- Mengubah text-sm ke text-lg dan mengurangi margin bawah -->
        <p>Aplikasi yang <strong>sangat membantu!</strong> Jerawat saya berkurang setelah menggunakan pengobatan yang disarankan</p>
    </div>

    <div class="mt-4 md:mt-0">
        <img src="/images/fitur-utama.png" 
             alt="Fitur Utama" 
             class="w-32 h-32 md:w-40 md:h-40 transition-all duration-300 transform hover:scale-105" />
    </div>
</div>


              <div class="rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
    <div class="w-[200px] h-[200px] rounded-[30px] bg-white/70 flex items-center justify-center shadow-md">
        <img src="/images/monitor.jpeg" alt="Monitor" class="w-[150px] h-[150px] object-contain transition-all duration-300 transform hover:scale-105" />
    </div>


    <div class="text-center md:text-left">
        <h3 class="text-[28px] leading-tight font-semibold text-cyan-800 mb-2 max-w-[870px]">
            Accurate detection of acne on the face becomes easy for you
        </h3>
        <p class="text-sm text-gray-900">
            Aplikasi yang sangat membantu! Jerawat saya berkurang setelah menggunakan pengobatan yang disarankan
        </p>
    </div>
</div>
                </div>
            </section>

        <!-- Section 3: Why AcureScan -->
<section id="why-acurescan" class="min-h-screen flex flex-col">
    <div class="bg-[#e0f5ef] m-6 md:m-10 rounded-xl shadow-lg flex-grow px-6 py-12">
        <div class="flex flex-col md:flex-row items-center justify-center gap-10">
            
            <!-- Gambar -->
            <div class="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
                <div class="rounded-lg bg-teal-100 flex items-center justify-center overflow-hidden p-4">
                    <img src="images/why-acurescan.jpeg"
                        alt="Why Choose Us"
                        class="rounded-lg object-contain max-h-80" />
                </div>
            </div>

            <!-- Judul & Cards -->
            <div class="w-full md:w-1/2 space-y-6">
                <h2 class="text-2xl md:text-3xl font-bold text-cyan-800">Why AcureScan?</h2>

                <!-- Card 1 -->
                <div class="bg-[#CDF6F6] p-6 rounded-xl shadow-md flex items-start gap-4 transition duration-300 ease-in-out hover:scale-105">
                    <div class="text-[#DE8F5F]">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 7H7v6h6V7z" />
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-9h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V10a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-[#00667A]">High Accuracy</h3>
                        <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="bg-[#C5E7E1] p-6 rounded-xl shadow-md flex items-start gap-4 transition duration-300 ease-in-out hover:scale-105">
                    <div class="text-[#FCFFC1]">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h3.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0010.414 5H15a1 1 0 011 1v1H3V4z" />
                            <path d="M3 8h14v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-[#00667A]">Monitor Scan Result</h3>
                        <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="bg-[#C1F1E5] p-6 rounded-xl shadow-md flex items-start gap-4 transition duration-300 ease-in-out hover:scale-105">
                    <div class="text-[#FFB38E]">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a1 1 0 000 2h10a1 1 0 100-2H5z" />
                            <path fill-rule="evenodd" d="M4 6a1 1 0 00-1 1v9a2 2 0 002 2h10a2 2 0 002-2V7a1 1 0 00-1-1H4zm2 3a1 1 0 112 0 1 1 0 01-2 0zm5 1a1 1 0 100-2 1 1 0 000 2zm-4 3h6a1 1 0 100-2H7a1 1 0 100 2z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-[#00667A]">Accurate Scan</h3>
                        <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
      </div>
      `;
  }
}

customElements.define('landing-page', LandingPage);
