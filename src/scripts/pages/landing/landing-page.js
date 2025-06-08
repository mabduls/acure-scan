class LandingPage extends HTMLElement {
  connectedCallback() {
    this.render();
    this._setupEventListeners();
    this._setupScrollAnimations();
  }

  _setupEventListeners() {
    // (event setup code as before...)
    const loginButton = this.querySelector("#loginButton");
    const signupButton = this.querySelector("#signupButton");
    const startScanButton = this.querySelector("#startScanButton");
    const articleButton = this.querySelector("#articleButton");
    const dashboardButton = this.querySelector("#dashboardButton");

    if (loginButton)
      loginButton.addEventListener("click", () => {
        window.location.hash = "#/login";
      });
    if (signupButton)
      signupButton.addEventListener("click", () => {
        window.location.hash = "#/register";
      });
    if (startScanButton)
      startScanButton.addEventListener("click", () => {
        window.location.hash = "#/dashboard";
      });
    if (articleButton)
      articleButton.addEventListener("click", () => {
        window.location.hash = "#/artikel";
      });
    if (dashboardButton)
      dashboardButton.addEventListener("click", () => {
        window.location.hash = "#/dashboard";
      });

    this.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  _setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-slide-up");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.querySelectorAll(".scroll-animate").forEach((el) => {
      el.classList.add("opacity-0", "translate-y-6");
      observer.observe(el);
    });
  }

  render() {
    this.innerHTML = `
      <style>
        @keyframes fadeSlideUp {
          from {opacity: 0; transform: translateY(1.5rem);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .transition-smooth {
          transition: all 0.3s ease-in-out;
        }
        .hover-scale {
          will-change: transform;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .hover-scale:hover,
        .hover-scale:focus {
          transform: scale(1.05);
          outline: none;
        }
      </style>

      <div class="bg-white text-gray-700 font-sans antialiased min-h-screen">
        <!-- Navigation Bar (as previously defined) -->
        <nav class="sticky top-0 z-50 bg-white shadow-sm py-4 px-8 flex justify-between items-center max-w-[1200px] mx-auto rounded-b-xl">
          <div class="flex items-center space-x-4">
            <svg class="w-7 h-7 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <h1 class="text-3xl font-extrabold tracking-tight text-teal-700 select-none">AcureScan</h1>
          </div>
          <div class="hidden md:flex space-x-8 font-semibold text-lg text-gray-700">
            <a href="#home" class="nav-link hover:text-teal-600 transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Home</a>
            <a href="#why-acurescan" class="nav-link hover:text-teal-600 transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Why AcureScan</a>
            <a href="#features" class="nav-link hover:text-teal-600 transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Features</a>
            <a href="#/artikel" id="articleButton" class="hover:text-teal-600 transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Articles</a>
            <a href="#/dashboard" id="dashboardButton" class="hover:text-teal-600 transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Dashboard</a>
          </div>
          <div class="flex space-x-6">
            <a href="#/login" id="loginButton" class="text-teal-700 font-semibold hover:text-teal-900 transition-smooth focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Login</a>
            <a href="#/register" id="signupButton" class="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-2 rounded-full shadow-md hover:from-teal-600 hover:to-cyan-500 transition-all hover-scale focus:outline-none focus:ring-2 focus:ring-cyan-400">Sign Up</a>
          </div>
        </nav>

        <main class="max-w-[1200px] mx-auto px-8 py-16 space-y-24">
          <!-- Hero Section -->
          <section id="home" class="scroll-animate flex flex-col md:flex-row items-center gap-16 pt-16 pb-20">
            <div class="md:w-1/2 text-center md:text-left space-y-8">
              <h2 class="text-gray-600 font-semibold tracking-wide text-xl md:text-2xl bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent select-none">Detect & Resolve</h2>
              <h1 class="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-700 via-cyan-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                Accurate detection of acne on the face becomes easy for you
              </h1>
              <p class="text-gray-600 text-lg max-w-lg mx-auto md:mx-0">
                Feel free to use our application and start detecting acne on your face.
              </p>
              <a href="#/dashboard" id="startScanButton" class="inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 text-white font-medium rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all hover-scale focus:outline-none focus:ring-4 focus:ring-cyan-300">
                Start Scan
              </a>
            </div>
            <div class="md:w-1/2 flex justify-center">
              <div class="rounded-2xl w-full max-w-sm h-80 flex items-center justify-center bg-gradient-to-br from-white/30 to-transparent shadow-inner transition-transform hover:scale-105">
                <img src="images/home.png" alt="Acne Detection" class="w-full h-80 object-cover rounded-xl shadow-lg" />
              </div>
            </div>
          </section>

          <!-- Features Section -->
          <section id="features" class="scroll-animate space-y-20 pt-16 pb-20">
            <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent border-b-4 border-gradient-to-r from-[#00667A] to-teal-600 inline-block max-w-max pb-3 select-none">
              Fitur Utama
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
              <article class="bg-gradient-to-br from-[#E9F7FB] via-[#E0F4F9] to-[#D7F1F7] p-8 rounded-xl shadow-lg border border-white/30 transition-all hover:shadow-xl hover:-translate-y-2 hover:from-[#D7F1F7] hover:to-[#C5EEF4] hover-scale cursor-pointer flex flex-col items-center text-center select-text">
                <img src="/images/icon/fitur1.png" alt="Scan Acne Type" class="w-16 h-16 mb-6" />
                <h3 class="font-semibold text-xl bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent mb-3 select-none">
                  Scan Acne Type
                </h3>
                <p class="text-gray-600">Mengidentifikasi berbagai jenis penyakit jerawat dengan cepat</p>
              </article>

              <article class="bg-gradient-to-br from-[#D8FAEC] via-[#D0F7E6] to-[#C8F4E0] p-8 rounded-xl shadow-lg border border-white/30 transition-all hover:shadow-xl hover:-translate-y-2 hover:from-[#C8F4E0] hover:to-[#C0F1DA] hover-scale cursor-pointer flex flex-col items-center text-center select-text">
                <img src="/images/icon/fitur2.png" alt="Treatment Recommendations" class="w-16 h-16 mb-6" />
                <h3 class="font-semibold text-xl bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent mb-3 select-none">
                  Treatment Recommendations
                </h3>
                <p class="text-gray-600">Menyarankan obat yang tepat berdasarkan analisis kondisi jerawat</p>
              </article>

              <article class="bg-gradient-to-br from-[#E5FFFB] via-[#DDFDF8] to-[#D5FAF5] p-8 rounded-xl shadow-lg border border-white/30 transition-all hover:shadow-xl hover:-translate-y-2 hover:from-[#D5FAF5] hover:to-[#CDF7F2] hover-scale cursor-pointer flex flex-col items-center text-center select-text">
                <img src="/images/icon/fitur3.png" alt="Customized Care" class="w-14 h-14 mb-6" />
                <h3 class="font-semibold text-xl bg-gradient-to-r from-teal-700 to-cyan-600 bg-clip-text text-transparent mb-3 select-none">
                  Customized Care
                </h3>
                <p class="text-gray-600">Memberikan rencana perawatan yang sesuai untuk kulit Anda</p>
              </article>
            </div>

            <div class="text-center">
              <a href="#/artikel" class="inline-block bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-10 py-4 rounded-full shadow-md hover:from-teal-600 hover:to-cyan-500 transition-all hover-scale focus:outline-none focus:ring-4 focus:ring-cyan-400">
                Explore Articles
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </section>

          <!-- Why AcureScan Section -->
          <section id="why-acurescan" class="scroll-animate flex flex-col md:flex-row items-center gap-16 pt-16 pb-20">
            <div class="md:w-1/2 flex justify-center">
              <img src="images/why-acurescan.jpeg" alt="Why AcureScan" class="w-full max-w-md rounded-xl shadow-lg object-cover" />
            </div>
            <div class="md:w-1/2 space-y-8">
              <h2 class="text-4xl text-[#00667A] font-extrabold border-b-4 border-[#00667A] inline-block max-w-max select-none pb-3">
                Why AcureScan?
              </h2>

              <article class="flex items-start gap-6 bg-gradient-to-r from-[#CDF6F6] via-[#C5F4F4] to-[#BDF2F2] p-6 rounded-xl shadow-lg border border-white/30 hover:shadow-xl hover:scale-105 transition-all hover-scale cursor-pointer">
                <svg class="w-7 h-7 flex-shrink-0 text-cyan-500 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M13 7H7v6h6V7z" />
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-9h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V10a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h3 class="font-semibold text-lg bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent select-none">High Accuracy</h3>
                  <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                </div>
              </article>

              <article class="flex items-start gap-6 bg-gradient-to-r from-[#C5E7E1] via-[#BDE4DE] to-[#B5E1DB] p-6 rounded-xl shadow-lg border border-white/30 hover:shadow-xl hover:scale-105 transition-all hover-scale cursor-pointer">
                <svg class="w-7 h-7 flex-shrink-0 text-orange-400 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M3 4a1 1 0 011-1h3.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0010.414 5H15a1 1 0 011 1v1H3V4z" />
                  <path d="M3 8h14v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
                </svg>
                <div>
                  <h3 class="font-semibold text-lg bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent select-none">Monitor Scan Result</h3>
                  <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                </div>
              </article>

              <article class="flex items-start gap-6 bg-gradient-to-r from-[#C1F1E5] via-[#B9EEE2] to-[#B1EBDF] p-6 rounded-xl shadow-lg border border-white/30 hover:shadow-xl hover:scale-105 transition-all hover-scale cursor-pointer">
                <svg class="w-7 h-7 flex-shrink-0 text-cyan-700 mt-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5 3a1 1 0 000 2h10a1 1 0 100-2H5z" />
                  <path fill-rule="evenodd" d="M4 6a1 1 0 00-1 1v9a2 2 0 002 2h10a2 2 0 002-2V7a1 1 0 00-1-1H4zm2 3a1 1 0 112 0 1 1 0 01-2 0zm5 1a1 1 0 100-2 1 1 0 000 2zm-4 3h6a1 1 0 100-2H7a1 1 0 100 2z" clip-rule="evenodd" />
                </svg>
                <div>
                  <h3 class="font-semibold text-lg bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent select-none">Accurate Scan</h3>
                  <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                </div>
              </article>

              <div class="pt-6 text-center">
                <a href="#/dashboard" class="inline-block bg-gradient-to-r from-cyan-500 to-teal-400 text-white px-8 py-3 rounded-full shadow-md hover:from-cyan-600 hover:to-teal-500 transition-all hover-scale focus:outline-none focus:ring-4 focus:ring-cyan-400">
                  Go to Dashboard
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          <!-- Contact Section -->
          <section id="kontak" class="pt-16 pb-20 px-8 max-w-[1200px] mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
              <div class="flex items-center gap-4 select-none">
                <svg class="w-8 h-8 text-[#00667A]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.04 4.13 2.56h1.74C14.09 5.04 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span class="text-xl font-bold bg-gradient-to-r from-[#00667A] to-teal-600 bg-clip-text text-transparent">AcureScan</span>
              </div>

              <address class="not-italic text-gray-600 text-sm max-w-md md:text-right leading-relaxed">
                Gedung Citra Towers Jl. Benyamin Sueb Kav. A6,<br />
                Kemayoran, Jakarta Pusat 10630<br />
                <a href="mailto:AcureScan@dbs.com" class="hover:text-teal-600 transition-colors underline">AcureScan@dbs.com</a><br />
                <a href="https://www.acurescan.com" target="_blank" rel="noopener noreferrer" class="hover:text-teal-600 transition-colors underline">www.acurescan.com</a>
              </address>
            </div>

            <hr class="my-6 border-[#00667A] opacity-30" />

            <!-- Footer -->
            <footer class="flex flex-col md:flex-row justify-between items-center text-xs text-[#00667A] space-y-2 md:space-y-0 select-none">
              <p>&copy; 2025 AcureScan. All rights reserved.</p>
              <nav class="flex gap-6">
                <a href="#/dashboard" class="hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Dashboard</a>
                <a href="#/artikel" class="hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Articles</a>
                <a href="#/login" class="hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 rounded">Login</a>
              </nav>
            </footer>
          </section>
        </main>
      </div>
    `;
  }
}

customElements.define("landing-page", LandingPage);

export default LandingPage;
