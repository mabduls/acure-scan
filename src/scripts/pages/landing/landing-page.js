class LandingPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="bg-gradient-to-b from-[#DBF1E7] to-[#C5E7E1] min-h-screen">
                <!-- Navigation Bar -->
        <nav class="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
          <!-- Logo -->
          <div class="flex items-center">
            <svg class="w-6 h-6 text-[#00667A] mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <h1 class="text-2xl font-bold">
              <span class="text-teal-700">Acure</span><span class="text-teal-600">Scan</span>
            </h1>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="text-gray-700 hover:text-teal-600 font-medium">Home</a>
            <a href="#why-acurescan" class="text-gray-700 hover:text-teal-600 font-medium">Why AcureScan</a>
            <a href="#contact" class="text-gray-700 hover:text-teal-600 font-medium">Contact</a>
          </div>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <a href="#" class="text-teal-700 font-medium hover:text-teal-800">Login</a>
            <a href="#" class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">Sign Up</a>
          </div>
        </nav>
                
                
<!-- Section 1: Hero -->
<section id="home" class="min-h-screen flex flex-col">
  <!-- Card Container -->
  <div class="bg-[#e0f5ef] m-6 md:m-10 rounded-xl shadow-lg flex-grow">
    <!-- Main Content -->
    <main class="flex-grow flex flex-col md:flex-row items-center justify-center px-6 py-12">
      <!-- Left Content -->
      <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8 md:pl-12">
        <h2 class="text-gray-600 font-medium text-lg md:text-xl mb-4">Detect & Resolve</h2>
        <h1 class="text-3xl md:text-5xl font-bold text-teal-700 mb-6 leading-snug">
          Accurate detection of acne on the face becomes easy for you
        </h1>
        <p class="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
          Feel free to use our application and start detecting acne on your face
        </p>
        <a href="#" class="inline-block bg-cyan-400 hover:bg-cyan-500 text-white font-medium rounded-full px-8 py-3 shadow-md transition-all">
          Start Sign
        </a>
      </div>

      <!-- Image -->
      <div class="w-full md:w-1/2 flex justify-center">
        <div class="rounded-lg w-full max-w-sm h-80 flex items-center justify-center">
          <div class="text-center p-4">
            <img src="images/home.png" class="w-full h-80 object-cover mx-auto rounded-lg" alt="Acne Detection"></div>
        </div>
      </div>
    </main>
  </div>
</section>

            <!-- Section 2: ABOUT -->
<section id="features" class="min-h-screen flex flex-col justify-center">
  <div class="rounded-xl shadow-lg p-8 m-6 md:m-10 flex flex-col space-y-10" style="background: linear-gradient(90deg, #C5E7E1, #FFFFFF);">
    
    <!-- Judul Fitur Utama -->
    <h2 class="text-2xl md:text-3xl font-bold text-left text-[#00667A] border-b-2 border-[#00667A] inline-block w-max pb-1">
      Fitur Utama
    </h2>

    <!-- 3 Fitur Utama -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <!-- Fitur 1 -->
      <div class="p-6 rounded-xl shadow-md bg-[#E9F7FB] transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4 gap-2">
          <img src="/images/icon/fitur1.png" alt="Scan Acne Type" class="w-12 h-12 object-contain">
          <h3 class="font-semibold text-lg text-teal-700">Scan Acne Type</h3>
        </div>
        <p class="text-gray-600 text-sm">Mengidentifikasi berbagai jenis penyakit jerawat dengan cepat</p>
      </div>

      <!-- Fitur 2 -->
      <div class="p-6 rounded-xl shadow-md bg-[#D8FAEC] transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4 gap-2">
          <img src="/images/icon/fitur2.png" alt="Treatment Recommendations" class="w-12 h-12 object-contain">
          <h3 class="font-semibold text-lg text-teal-700">Treatment Recommendations</h3>
        </div>
        <p class="text-gray-600 text-sm">Menyarankan obat yang tepat berdasarkan analisis kondisi jerawat</p>
      </div>

      <!-- Fitur 3 -->
      <div class="p-6 rounded-xl shadow-md bg-[#E5FFFB] transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-center mb-4 gap-2">
          <img src="/images/icon/fitur3.png" alt="Customized Care" class="w-10 h-10 object-contain">
          <h3 class="font-semibold text-lg text-teal-700">Customized Care</h3>
        </div>
        <p class="text-gray-600 text-sm">Memberikan rencana perawatan yang sesuai untuk kulit Anda</p>
      </div>
    </div>

    <!-- Testimoni / Penjelasan -->
    <div class="rounded-lg p-6 shadow-md flex flex-col md:flex-row items-center gap-4" style="background: linear-gradient(90deg, #EEFBF7, #EEFAF7);">
      <p class="text-gray-700 text-center md:text-left flex-1">
        Aplikasi yang <span class="font-semibold text-cyan-700">sangat membantu</span>! Jerawat saya berkurang setelah menggunakan pengobatan yang disarankan.
      </p>
      <img src="images/testimoni.png" alt="Acne Icon" class="w-40 h-40" />
    </div>

    <!-- Penjelasan Tambahan -->
    <div class="flex items-center gap-6 max-w-3xl p-4">
      <div class="flex-shrink-0">
        <img src="/images/monitor.jpeg" alt="Customized Care" class="w-48 h-48 object-contain">
      </div>
      <div>
        <h3 class="text-xl font-semibold text-cyan-700 mb-2">
          Accurate detection of acne on the face becomes easy for you
        </h3>
        <p class="text-gray-600 text-base">
          Aplikasi yang sangat membantu! Jerawat saya berkurang setelah menggunakan pengobatan yang disarankan.
        </p>
      </div>
    </div>

    <!-- Why AcureScan Section -->
    <div class="bg-gradient-to-br from-[#D7FAF0] to-[#EFFBEC] rounded-xl shadow-lg p-8 m-6 md:m-10 flex-grow">
      <div class="flex flex-col md:flex-row items-center justify-center gap-10">
        
        <!-- Image -->
        <div class="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div class="rounded-lg w-full max-w-sm h-80 flex items-center justify-center">
            <div class="text-center p-4">
              <img src="images/why-acurescan.jpeg" alt="Why AcureScan" class="w-full h-80 object-cover mx-auto mb-4 rounded-lg">
            </div>
          </div>
        </div>

        <!-- Cards -->
        <div class="w-full md:w-1/2 space-y-6">
          <h2 class="text-2xl md:text-3xl font-bold text-cyan-800 mb-6 text-left inline-block border-b-4 border-cyan-800">
            Why AcureScan?
          </h2>

          <!-- Card 1 -->
          <div class="bg-[#CDF6F6] p-6 rounded-xl shadow-md flex items-start gap-4 transition duration-300 hover:bg-[#B0E6E6] hover:shadow-lg">
            <div class="text-cyan-500">
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
          <div class="bg-[#C5E7E1] p-6 rounded-xl shadow-md flex items-start gap-4 transition duration-300 hover:bg-[#A8D9CF] hover:shadow-lg">
            <div class="text-orange-400">
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
          <div class="bg-[#C1F1E5] p-6 rounded-xl shadow-md flex items-start gap-4 transition duration-300 hover:bg-[#A0E9CD] hover:shadow-lg">
            <div class="text-cyan-700">
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

  </div>
</section>


<!-- Section 4: Kontak -->
<section id="kontak" class="py-12 px-6 md:px-10">
  <div class="max-w-7xl mx-auto bg-[#E5FFFB] rounded-xl shadow-lg px-6 py-8 md:px-12">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
      <!-- Logo dan Nama -->
      <div class="flex items-center gap-3 mb-6 md:mb-0">
        <svg class="w-8 h-8 text-[#00667A]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span class="text-xl font-bold">AcureScan</span>
      </div>

      <!-- Kontak -->
      <div class="text-sm max-w-md md:text-right">
        <h3 class="font-semibold mb-2">Kontak</h3>
        <p>
          Gedung Citra Towers Jl. Benyamin Sueb Kav. A6,<br>
          Kemayoran, Jakarta Pusat 10630<br>
          <a href="mailto:AcureScan@dbs.com" class="hover:underline">AcureScan@dbs.com</a><br>
          <a href="https://www.acurescan.com" target="_blank" class="hover:underline">www.acurescan.com</a>
        </p>
      </div>
    </div>

    <hr class="my-6 border-[#00667A] opacity-50">

    <!-- Footer -->
    <div class="flex flex-col md:flex-row justify-between items-center text-xs text-[#00667A]">
      <p>&copy; 2025 AcureScan. All rights reserved.</p>
      <div class="flex gap-4 mt-2 md:mt-0">
        <a href="#" class="hover:underline">Dashboard</a>
        <a href="#" class="hover:underline">Ketentuan & Privasi</a>
        <a href="#" class="hover:underline">FAQ</a>
      </div>
    </div>
  </div>
</section>

</div>
`;

        // Add smooth scrolling to navigation links
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

customElements.define('landing-page', LandingPage);

export default LandingPage;
