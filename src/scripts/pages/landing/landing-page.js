class LandingPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this._setupEventListeners();
  }

  _setupEventListeners() {
    // Set up navigation event listeners
    const loginButton = this.querySelector("#loginButton");
    const signupButton = this.querySelector("#signupButton");
    const startScanButton = this.querySelector("#startScanButton");
    const articleButton = this.querySelector("#articleButton");
    const dashboardButton = this.querySelector("#dashboardButton");

    if (loginButton) {
      loginButton.addEventListener("click", () => {
        window.location.hash = "#/login";
      });
    }

    if (signupButton) {
      signupButton.addEventListener("click", () => {
        window.location.hash = "#/register";
      });
    }

    if (startScanButton) {
      startScanButton.addEventListener("click", () => {
        window.location.hash = "#/dashboard";
      });
    }

    if (articleButton) {
      articleButton.addEventListener("click", () => {
        window.location.hash = "#/artikel";
      });
    }

    if (dashboardButton) {
      dashboardButton.addEventListener("click", () => {
        window.location.hash = "#/dashboard";
      });
    }

    // Smooth scroll for navigation links
    this.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }

  render() {
    this.innerHTML = `
        <div class="bg-gradient-to-b from-[#DBF1E7] to-[#C5E7E1] min-h-screen">
          <!-- Navigation Bar -->
          <nav class="bg-gradient-to-r from-white to-[#f0faf7] shadow-lg py-4 px-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-sm bg-white/90">
            <!-- Logo -->
            <div class="flex items-center">
              <svg class="w-6 h-6 text-[#00667A] mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                AcureScan
              </h1>
            </div>
  
            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center space-x-8">
              <a href="#home" class="text-gray-700 hover:text-teal-600 font-medium transition-colors nav-link">Home</a>
              <a href="#why-acurescan" class="text-gray-700 hover:text-teal-600 font-medium transition-colors nav-link">Why AcureScan</a>
              <a href="#features" class="text-gray-700 hover:text-teal-600 font-medium transition-colors nav-link">Features</a>
              <a href="#/artikel" id="articleButton" class="text-gray-700 hover:text-teal-600 font-medium transition-colors">Articles</a>
              <a href="#/dashboard" id="dashboardButton" class="text-gray-700 hover:text-teal-600 font-medium transition-colors">Dashboard</a>
            </div>
  
            <!-- Auth Buttons -->
            <div class="flex items-center space-x-4">
              <a href="#/login" id="loginButton" class="text-teal-700 font-medium hover:text-teal-800 transition-colors">Login</a>
              <a href="#/register" id="signupButton" class="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-cyan-500 transition-all shadow-md hover:shadow-lg transform hover:scale-105">Sign Up</a>
            </div>
          </nav>
                    
          <!-- Unified Background Card for All Sections -->
          <div class="bg-gradient-to-br from-[#e8f7f0] via-[#e0f5ef] to-[#d8f2ea] m-6 md:m-10 rounded-2xl shadow-2xl border border-white/30">
                        
            <!-- Section 1: Hero -->
            <section id="home" class="px-6 py-12 bg-gradient-to-r from-transparent to-white/20 rounded-t-2xl">
              <div class="flex flex-col md:flex-row items-center justify-center">
                <!-- Left Content -->
                <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8 md:pl-12">
                  <h2 class="text-gray-600 font-medium text-lg md:text-xl mb-4 bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">Detect & Resolve</h2>
                  <h1 class="text-3xl md:text-5xl font-bold bg-gradient-to-r from-teal-700 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-snug">
                    Accurate detection of acne on the face becomes easy for you
                  </h1>
                  <p class="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                    Feel free to use our application and start detecting acne on your face
                  </p>
                  <a href="#/dashboard" id="startScanButton" class="inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 hover:from-cyan-500 hover:via-teal-500 hover:to-cyan-600 text-white font-medium rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    Start Scan
                  </a>
                </div>
  
                <!-- Image -->
                <div class="w-full md:w-1/2 flex justify-center">
                  <div class="rounded-2xl w-full max-w-sm h-80 flex items-center justify-center bg-gradient-to-br from-white/30 to-transparent shadow-inner">
                    <div class="text-center p-4">
                      <img src="images/home.png" class="w-full h-80 object-cover mx-auto rounded-xl shadow-lg" alt="Acne Detection">
                    </div>
                  </div>
                </div>
              </div>
            </section>
  
            <!-- Section 2: Features -->
            <section id="features" class="px-6 py-12 bg-gradient-to-b from-white/10 to-transparent">
              <div class="flex flex-col space-y-10">
                              
                <!-- Judul Fitur Utama -->
                <h2 class="text-2xl md:text-3xl font-bold text-left bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent border-b-2 border-gradient-to-r from-[#00667A] to-teal-600 inline-block w-max pb-1">
                  Fitur Utama
                </h2>
  
                <!-- 3 Fitur Utama -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <!-- Fitur 1 -->
                  <div class="p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#E9F7FB] via-[#E0F4F9] to-[#D7F1F7] transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:from-[#D7F1F7] hover:to-[#C5EEF4] border border-white/50">
                    <div class="flex items-center justify-center mb-4 gap-2">
                      <img src="/images/icon/fitur1.png" alt="Scan Acne Type" class="w-12 h-12 object-contain">
                      <h3 class="font-semibold text-lg bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">Scan Acne Type</h3>
                    </div>
                    <p class="text-gray-600 text-sm">Mengidentifikasi berbagai jenis penyakit jerawat dengan cepat</p>
                  </div>
  
                  <!-- Fitur 2 -->
                  <div class="p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#D8FAEC] via-[#D0F7E6] to-[#C8F4E0] transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:from-[#C8F4E0] hover:to-[#C0F1DA] border border-white/50">
                    <div class="flex items-center justify-center mb-4 gap-2">
                      <img src="/images/icon/fitur2.png" alt="Treatment Recommendations" class="w-12 h-12 object-contain">
                      <h3 class="font-semibold text-lg bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">Treatment Recommendations</h3>
                    </div>
                    <p class="text-gray-600 text-sm">Menyarankan obat yang tepat berdasarkan analisis kondisi jerawat</p>
                  </div>
  
                  <!-- Fitur 3 -->
                  <div class="p-6 rounded-xl shadow-lg bg-gradient-to-br from-[#E5FFFB] via-[#DDFDF8] to-[#D5FAF5] transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:from-[#D5FAF5] hover:to-[#CDF7F2] border border-white/50">
                    <div class="flex items-center justify-center mb-4 gap-2">
                      <img src="/images/icon/fitur3.png" alt="Customized Care" class="w-10 h-10 object-contain">
                      <h3 class="font-semibold text-lg bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent">Customized Care</h3>
                    </div>
                    <p class="text-gray-600 text-sm">Memberikan rencana perawatan yang sesuai untuk kulit Anda</p>
                  </div>
                </div>
  
                <!-- Article Button - New Section -->
                <div class="mt-8 text-center">
                  <a href="#/artikel" class="inline-block bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-8 py-3 rounded-full hover:from-teal-600 hover:to-cyan-500 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                    Explore Articles
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
  
                <!-- Testimoni / Penjelasan -->
                <div class="rounded-xl p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-[#EEFBF7] via-[#EEFAF7] to-[#F0FCF8] border border-white/30">
                  <p class="text-gray-700 text-center md:text-left flex-1 text-sm md:text-base">
                    Aplikasi yang <span class="font-semibold bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-transparent">sangat membantu</span>! Jerawat saya berkurang setelah menggunakan pengobatan yang disarankan.
                  </p>
                  <img src="images/testimoni.png" alt="Acne Icon" class="w-24 h-24 md:w-32 md:h-32" />
                </div>
  
                <!-- Penjelasan Tambahan -->
                <div class="rounded-xl p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-[#e8f7f0] via-[#e0f5ef] to-[#d8f2ea] border border-white/30">
                  <div class="flex-shrink-0">
                    <img src="/images/monitor.jpeg" alt="Customized Care" class="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg shadow-md">
                  </div>
                  <div class="text-center md:text-left flex-1">
                    <h3 class="text-sm md:text-base font-semibold bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-transparent mb-2">
                      Accurate detection of acne on the face becomes easy for you
                    </h3>
                    <p class="text-gray-600 text-sm md:text-base">
                      Aplikasi yang sangat membantu! Jerawat saya berkurang setelah menggunakan pengobatan yang disarankan.
                    </p>
                  </div>
                </div>
              </div>
            </section>
  
            <!-- Section 3: Why AcureScan -->
            <section id="why-acurescan" class="px-6 py-12 bg-gradient-to-b from-transparent to-white/10">
              <div class="flex flex-col md:flex-row items-center justify-center gap-10">
                              
                <!-- Image -->
                <div class="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
                  <div class="rounded-2xl w-full max-w-sm h-80 flex items-center justify-center bg-gradient-to-br from-white/20 to-transparent shadow-inner">
                    <div class="text-center p-4">
                      <img src="images/why-acurescan.jpeg" alt="Why AcureScan" class="w-full h-80 object-cover mx-auto mb-4 rounded-xl shadow-lg">
                    </div>
                  </div>
                </div>
  
                <!-- Cards -->
                <div class="w-full md:w-1/2 space-y-6">
                  <h2 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-800 to-teal-700 bg-clip-text text-transparent mb-6 text-left inline-block border-b-4 border-gradient-to-r from-cyan-800 to-teal-700">
                    Why AcureScan?
                  </h2>
  
                  <!-- Card 1 -->
                  <div class="bg-gradient-to-r from-[#CDF6F6] via-[#C5F4F4] to-[#BDF2F2] p-6 rounded-xl shadow-lg flex items-start gap-4 transition-all duration-300 hover:from-[#B0E6E6] hover:via-[#A8E4E4] hover:to-[#A0E2E2] hover:shadow-xl hover:scale-105 border border-white/30">
                    <div class="text-cyan-500">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 7H7v6h6V7z" />
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-9h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V10a1 1 0 011-1z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent">High Accuracy</h3>
                      <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                    </div>
                  </div>
  
                  <!-- Card 2 -->
                  <div class="bg-gradient-to-r from-[#C5E7E1] via-[#BDE4DE] to-[#B5E1DB] p-6 rounded-xl shadow-lg flex items-start gap-4 transition-all duration-300 hover:from-[#A8D9CF] hover:via-[#A0D6CC] hover:to-[#98D3C9] hover:shadow-xl hover:scale-105 border border-white/30">
                    <div class="text-orange-400">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h3.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0010.414 5H15a1 1 0 011 1v1H3V4z" />
                        <path d="M3 8h14v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent">Monitor Scan Result</h3>
                      <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                    </div>
                  </div>
  
                  <!-- Card 3 -->
                  <div class="bg-gradient-to-r from-[#C1F1E5] via-[#B9EEE2] to-[#B1EBDF] p-6 rounded-xl shadow-lg flex items-start gap-4 transition-all duration-300 hover:from-[#A0E9CD] hover:via-[#98E6CA] hover:to-[#90E3C7] hover:shadow-xl hover:scale-105 border border-white/30">
                    <div class="text-cyan-700">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a1 1 0 000 2h10a1 1 0 100-2H5z" />
                        <path fill-rule="evenodd" d="M4 6a1 1 0 00-1 1v9a2 2 0 002 2h10a2 2 0 002-2V7a1 1 0 00-1-1H4zm2 3a1 1 0 112 0 1 1 0 01-2 0zm5 1a1 1 0 100-2 1 1 0 000 2zm-4 3h6a1 1 0 100-2H7a1 1 0 100 2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent">Accurate Scan</h3>
                      <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                    </div>
                  </div>
                  
                  <!-- Dashboard Button - New -->
                  <div class="text-center pt-4">
                    <a href="#/dashboard" class="inline-block bg-gradient-to-r from-cyan-500 to-teal-400 text-white px-8 py-3 rounded-full hover:from-cyan-600 hover:to-teal-500 transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                      Go to Dashboard
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>
  
            <!-- Section 4: Kontak -->
            <section id="kontak" class="px-6 py-12">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-8 md:px-12">
                <!-- Logo dan Nama -->
                <div class="flex items-center gap-3 mb-6 md:mb-0">
                  <svg class="w-8 h-8 text-[#00667A]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span class="text-xl font-bold bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent">AcureScan</span>
                </div>
  
                <!-- Kontak -->
                <div class="text-sm max-w-md md:text-right">
                  <h3 class="font-semibold mb-2 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">Kontak</h3>
                  <p class="text-gray-600">
                    Gedung Citra Towers Jl. Benyamin Sueb Kav. A6,<br>
                    Kemayoran, Jakarta Pusat 10630<br>
                    <a href="mailto:AcureScan@dbs.com" class="hover:text-teal-600 transition-colors">AcureScan@dbs.com</a><br>
                    <a href="https://www.acurescan.com" target="_blank" class="hover:text-teal-600 transition-colors">www.acurescan.com</a>
                  </p>
                </div>
              </div>
  
              <hr class="my-6 border-[#00667A] opacity-30 mx-6 md:mx-12">
  
              <!-- Footer -->
              <div class="flex flex-col md:flex-row justify-between items-center text-xs text-[#00667A] px-6 md:px-12">
                <p>&copy; 2025 AcureScan. All rights reserved.</p>
                <div class="flex gap-4 mt-2 md:mt-0">
                  <a href="#/dashboard" class="hover:text-teal-600 transition-colors">Dashboard</a>
                  <a href="#/artikel" class="hover:text-teal-600 transition-colors">Articles</a>
                  <a href="#/login" class="hover:text-teal-600 transition-colors">Login</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      `;
  }
}

customElements.define("landing-page", LandingPage);

export default LandingPage;
