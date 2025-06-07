class ArtikelDetailPage extends HTMLElement {
  connectedCallback() {
    this._initializeArticle();
    this._setupEventListeners();
  }

  _initializeArticle() {
    const url = window.location.hash; // Example: "#/artikel-detail/blackheads"
    let jenis = "";

    try {
      // Extract the slug from the URL
      const pathSegments = url.split("/");
      jenis = pathSegments[pathSegments.length - 1]; // Get the last segment

      console.log("Loading article detail for:", jenis);
    } catch (error) {
      console.error("Error parsing article ID:", error);
      this._showErrorMessage("Could not parse article ID from URL");
      return;
    }

    const dataArtikel = {
      blackheads: {
        title: "Blackheads (Komedo Hitam)",
        img: "/images/artikel/blackheads.jpg",
        content:
          "Blackheads adalah tonjolan kecil berwarna hitam karena pori-pori terbuka yang tersumbat minyak dan sel kulit mati. Umumnya muncul di wajah, dada, punggung, leher, dan bahu. Tidak terasa sakit saat disentuh.",
        ciri: [
          "Tonjolan kecil berwarna hitam karena pori-pori terbuka",
          "Umumnya muncul di wajah, dada, punggung, leher, dan bahu",
          "Tidak terasa sakit saat disentuh",
        ],
        penyebab: [
          "Penumpukan minyak dan sel kulit mati",
          "Produksi sebum berlebih",
          "Bakteri Propionibacterium acnes",
          "Perubahan hormon (pubertas, menstruasi, penggunaan pil KB)",
          "Pola makan tinggi gula dan produk susu",
        ],
        penanganan: [
          "Asam salisilat: Mengelupas sel kulit mati dan membuka pori-pori",
          "Retinoid topikal: Mempercepat regenerasi sel",
          "Chemical peeling: Menggunakan bahan kimia untuk eksfoliasi",
          "Terapi laser: Mengurangi produksi minyak dan bakteri",
        ],
        pencegahan: [
          "Cuci wajah dua kali sehari dengan pembersih ringan",
          "Gunakan produk non-comedogenic",
          "Hindari menyentuh wajah secara berlebihan",
          "Eksfoliasi ringan 1–2 kali seminggu",
          "Kurangi konsumsi makanan tinggi gula dan susu",
        ],
      },
      whiteheads: {
        title: "Whiteheads (Komedo Putih)",
        img: "/images/artikel/whiteheads.jpg",
        content:
          "Whiteheads adalah bintik kecil berwarna putih akibat pori-pori tersumbat tetapi tertutup oleh lapisan kulit. Berbeda dengan blackheads, komedo putih tidak terpapar udara sehingga tetap berwarna putih.",
        ciri: [
          "Bintik kecil berwarna putih",
          "Pori-pori tersumbat tetapi tertutup lapisan kulit",
          "Tidak terasa sakit dan tidak meradang",
        ],
        penyebab: [
          "Produksi sebum dan penumpukan sel kulit mati",
          "Perubahan hormon",
          "Penggunaan produk yang tidak cocok dengan kulit",
        ],
        penanganan: [
          "Asam salisilat: Membersihkan pori-pori",
          "Retinoid ringan: Mengatur siklus pergantian sel kulit",
          "Rutin membersihkan wajah: Hindari memencet komedo",
        ],
        pencegahan: [
          "Pilih produk skincare dengan label non-comedogenic",
          "Jaga kebersihan wajah dan rambut",
          "Ganti sarung bantal dan handuk secara rutin",
          "Hindari produk terlalu berat (terutama yang berbasis minyak)",
        ],
      },
      papula: {
        title: "Papules (Jerawat Papula)",
        img: "/images/artikel/papula.jpg",
        content:
          "Papules adalah benjolan kecil, merah, padat, tidak mengandung nanah. Kulit terasa meradang dan kasar saat disentuh. Jenis jerawat ini menunjukkan adanya peradangan pada pori-pori yang tersumbat.",
        ciri: [
          "Benjolan kecil, merah, dan padat",
          "Tidak mengandung nanah",
          "Kulit terasa meradang dan kasar",
          "Nyeri saat disentuh",
        ],
        penyebab: [
          "Perubahan hormon",
          "Infeksi bakteri P. acnes",
          "Produksi minyak berlebih",
          "Pemakaian kosmetik berat dan pola makan buruk",
        ],
        penanganan: [
          "Pembersih wajah lembut: Menghindari iritasi",
          "Asam salisilat, benzoil peroksida, sulfur: Mengurangi peradangan",
          "Antibiotik topikal atau oral: Jika peradangan parah",
          "Hindari memencet jerawat",
        ],
        pencegahan: [
          "Gunakan skincare ringan dan tidak menyumbat pori",
          "Hindari makanan pemicu (gula, makanan cepat saji)",
          "Jangan sering menyentuh atau memencet wajah",
          "Bersihkan wajah sebelum dan sesudah aktivitas berat",
        ],
      },
      pustula: {
        title: "Pustules (Jerawat Pustula)",
        img: "/images/artikel/pustula.jpg",
        content:
          "Pustules adalah benjolan merah dengan titik putih di tengah yang berisi nanah. Nyeri saat disentuh dan mudah pecah jika tidak ditangani dengan benar. Merupakan tahap lanjut dari papula yang terinfeksi.",
        ciri: [
          "Benjolan merah dengan titik putih di tengah",
          "Berisi nanah",
          "Nyeri saat disentuh",
          "Mudah pecah jika dipencet",
        ],
        penyebab: [
          "Kombinasi minyak berlebih, sel kulit mati, dan bakteri",
          "Pengaruh hormonal",
          "Kosmetik berat, stres, dan faktor genetik",
          "Kebiasaan merokok",
        ],
        penanganan: [
          "Asam salisilat & benzoil peroksida: Mengurangi sumbatan dan bakteri",
          "Retinoid & antibiotik topikal: Menenangkan peradangan",
          "Antibiotik oral / isotretinoin: Untuk kasus parah",
          "Fototerapi: Menggunakan cahaya untuk membunuh bakteri",
        ],
        pencegahan: [
          "Rutin cuci muka dan lakukan double cleansing",
          "Gunakan sunscreen non-komedogenik",
          "Hindari produk yang terlalu oklusif (menyumbat pori)",
          "Jaga pola makan dan tidur yang teratur",
        ],
      },
      kistik: {
        title: "Cystic Acne (Jerawat Kistik)",
        img: "/images/artikel/kistik.jpg",
        content:
          "Cystic acne adalah benjolan besar, merah, dalam, terasa nyeri, dan berisi nanah. Merupakan jenis jerawat paling parah yang terbentuk jauh di bawah permukaan kulit dan sering meninggalkan bekas luka permanen.",
        ciri: [
          "Benjolan besar, merah, dan dalam",
          "Terasa sangat nyeri",
          "Berisi nanah",
          "Sering meninggalkan bekas luka",
        ],
        penyebab: [
          "Produksi minyak berlebih yang menyumbat jaringan kulit dalam",
          "Perubahan hormon yang ekstrem",
          "Kosmetik berat dan tidak cocok",
          "Faktor genetik, stres, dan obat-obatan tertentu",
        ],
        penanganan: [
          "Antibiotik oral: Mengurangi bakteri dan inflamasi",
          "Retinoid topikal: Mengatur regenerasi kulit",
          "Isotretinoin oral: Obat kuat untuk jerawat parah (resep dokter)",
          "Suntik kortikosteroid: Mengempiskan jerawat besar dengan cepat",
        ],
        pencegahan: [
          "Hindari penggunaan produk wajah berat dan berminyak",
          "Rutin konsultasi dengan dermatologis jika ada riwayat keluarga",
          "Kelola stres dengan baik (olahraga, meditasi, tidur cukup)",
          "Hindari memencet jerawat kistik karena bisa memperburuk luka",
        ],
      },
    };

    const artikel = dataArtikel[jenis];

    if (!artikel) {
      this._showErrorMessage("Artikel tidak ditemukan");
      return;
    }

    this._renderArticle(artikel);
  }

  _showErrorMessage(message) {
    this.innerHTML = `
        <div class="p-4 text-center">
          <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-md">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-red-700 font-medium">${message}</p>
              </div>
            </div>
          </div>
          <button id="back-to-articles" class="mt-4 bg-[#00667A] text-white px-4 py-2 rounded hover:bg-[#004b5d] transition-colors">
            Kembali ke Daftar Artikel
          </button>
        </div>
      `;

    // Add event listener to the back button
    const backButton = this.querySelector("#back-to-articles");
    if (backButton) {
      backButton.addEventListener("click", () => {
        window.location.hash = "#/artikel";
      });
    }
  }

  _renderArticle(artikel) {
    this.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          
          .artikel-container {
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
          }
          
          .article-header {
            background: linear-gradient(135deg, #FFECDF 0%, #C5E7E1 100%);
            position: relative;
            overflow: hidden;
          }
          
          .article-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 40%, rgba(0, 102, 122, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(0, 156, 166, 0.1) 0%, transparent 50%);
          }
          
          .article-content {
            background: #ffffff;
            position: relative;
            z-index: 1;
          }
          
          .hero-image {
            border-radius: 16px;
            box-shadow: 0 20px 40px -10px rgba(0, 102, 122, 0.2);
            transition: all 0.3s ease;
            width: 100%;
            height: auto;
            max-width: 100%;
            object-fit: cover;
            image-rendering: auto;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          
          .hero-image:hover {
            box-shadow: 0 25px 50px -15px rgba(0, 102, 122, 0.3);
            transform: translateY(-5px);
          }
          
          .section-divider {
            width: 80px;
            height: 4px;
            background: linear-gradient(135deg, #00667A 0%, #009CA6 100%);
            border-radius: 2px;
            margin: 2rem 0;
          }
          
          .content-section {
            margin-bottom: 3rem;
            padding: 2rem 0;
          }
          
          .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: #00667A;
            margin-bottom: 1.5rem;
            position: relative;
            padding-left: 1rem;
          }
          
          .section-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(135deg, #00667A 0%, #009CA6 100%);
            border-radius: 2px;
          }
          
          .article-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .article-list li {
            margin-bottom: 1rem;
            padding: 1rem 1.5rem;
            background: #f8fafc;
            border-left: 4px solid #009CA6;
            border-radius: 0 8px 8px 0;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .article-list li:hover {
            background: #f1f9f9;
            transform: translateX(8px);
            box-shadow: 0 4px 12px rgba(0, 156, 166, 0.15);
          }
          
          .article-list li::before {
            content: '•';
            color: #009CA6;
            font-size: 1.2rem;
            position: absolute;
            left: 0.5rem;
            top: 1rem;
          }
          
          .article-text {
            color: #374151;
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }
          
          .intro-text {
            font-size: 1.2rem;
            color: #4b5563;
            line-height: 1.8;
            margin-bottom: 2rem;
            padding: 2rem;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }
          
          .back-button {
            background: white;
            border: 2px solid #00667A;
            color: #00667A;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            text-decoration: none;
            margin-bottom: 2rem;
            cursor: pointer;
          }
          
          .back-button:hover {
            background: #00667A;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 102, 122, 0.3);
          }
          
          .tips-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          }
          
          .tip-card {
            background: linear-gradient(135deg, #C5E7E1 0%, #A8DFD7 50%, #FFECDF 100%);
            padding: 2rem;
            border-radius: 16px;
            text-align: center;
            transition: transform 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .tip-card:hover {
            transform: translateY(-5px);
          }
          
          .tip-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          
          .tip-text {
            font-weight: 600;
            color: #00667A;
            font-size: 1.1rem;
          }
          
          .article-meta {
            background: #f8fafc;
            padding: 1.5rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            border: 1px solid #e2e8f0;
          }
          
          .meta-badge {
            background: #00667A;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            display: inline-block;
          }
          
          @media (max-width: 768px) {
            .section-title {
              font-size: 1.5rem;
            }
            
            .article-text {
              font-size: 1rem;
            }
            
            .intro-text {
              font-size: 1.1rem;
              padding: 1.5rem;
            }
            
            .hero-image {
              height: 250px;
            }
          }
          
          /* Navigation buttons */
          .navigation-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 2rem;
            gap: 1rem;
          }
          
          .nav-button {
            flex: 1;
            text-align: center;
            padding: 1rem;
            border-radius: 10px;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .article-button {
            background: linear-gradient(135deg, #C5E7E1 0%, #A8DFD7 100%);
            color: #00667A;
            border: 1px solid rgba(0, 102, 122, 0.1);
          }
          
          .article-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 102, 122, 0.15);
            background: linear-gradient(135deg, #A8DFD7 0%, #8FD8CC 100%);
          }
          
          .dashboard-button {
            background: linear-gradient(135deg, #00667A 0%, #009CA6 100%);
            color: white;
            border: 1px solid rgba(0, 102, 122, 0.1);
          }
          
          .dashboard-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 102, 122, 0.25);
            background: linear-gradient(135deg, #005666 0%, #008A94 100%);
          }
        </style>
        
        <div class="artikel-container">
          <!-- Header Section -->
          <div class="article-header py-16 px-4">
            <div class="max-w-4xl mx-auto relative z-10">
              <!-- Back Button -->
              <button id="back-to-articles-list" class="back-button">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Kembali ke Artikel
              </button>
              
              <!-- Article Meta -->
              <div class="article-meta">
                <span class="meta-badge">📚 Panduan Kesehatan Kulit</span>
              </div>
              
              <!-- Article Title -->
              <h1 class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#00667A] via-[#009CA6] to-[#00667A] bg-clip-text text-transparent mb-6 leading-tight">
                ${artikel.title}
              </h1>
              
              <div class="section-divider"></div>
            </div>
          </div>
  
          <!-- Main Content -->
          <div class="article-content">
            <div class="max-w-4xl mx-auto px-4 py-8">
              <!-- Hero Image and Introduction -->
              <div class="mb-12">
                <img src="${artikel.img}" alt="${
      artikel.title
    }" class="hero-image mb-8" style="height: 320px;" />
                
                <div class="intro-text">
                  ${artikel.content}
                </div>
              </div>
  
              <!-- Content Sections -->
              <article class="prose prose-lg max-w-none">
                
                <!-- Ciri-ciri Section -->
                <section class="content-section">
                  <h2 class="section-title">Ciri-ciri dan Gejala</h2>
                  <p class="article-text">
                    Berikut adalah karakteristik utama yang dapat membantu Anda mengidentifikasi kondisi ini:
                  </p>
                  <ul class="article-list">
                    ${artikel.ciri.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </section>
  
                <div class="section-divider mx-0"></div>
  
                <!-- Penyebab Section -->
                <section class="content-section">
                  <h2 class="section-title">Penyebab dan Faktor Risiko</h2>
                  <p class="article-text">
                    Memahami penyebab kondisi ini sangat penting untuk pencegahan dan penanganan yang tepat:
                  </p>
                  <ul class="article-list">
                    ${artikel.penyebab
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ul>
                </section>
  
                <div class="section-divider mx-0"></div>
  
                <!-- Penanganan Section -->
                <section class="content-section">
                  <h2 class="section-title">Cara Mengatasi dan Pengobatan</h2>
                  <p class="article-text">
                    Terdapat berbagai metode penanganan yang dapat dilakukan, mulai dari perawatan mandiri hingga bantuan medis profesional:
                  </p>
                  <ul class="article-list">
                    ${artikel.penanganan
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ul>
                </section>
  
                <div class="section-divider mx-0"></div>
  
                <!-- Pencegahan Section -->
                <section class="content-section">
                  <h2 class="section-title">Pencegahan dan Perawatan</h2>
                  <p class="article-text">
                    Langkah-langkah pencegahan berikut dapat membantu mengurangi risiko terjadinya kondisi ini:
                  </p>
                  <ul class="article-list">
                    ${artikel.pencegahan
                      .map((item) => `<li>${item}</li>`)
                      .join("")}
                  </ul>
                </section>
  
                <div class="section-divider mx-0"></div>
  
                <!-- Tips Section -->
                <section class="content-section">
                  <h2 class="section-title">Tips Penting untuk Diingat</h2>
                  <p class="article-text">
                    Berikut adalah beberapa tips penting yang perlu Anda ingat dalam menangani kondisi kulit ini:
                  </p>
                  
                  <div class="tips-grid">
                    <div class="tip-card">
                      <div class="tip-icon">✅</div>
                      <p class="tip-text">Jaga kebersihan kulit dengan rutin dan konsisten</p>
                    </div>
                    <div class="tip-card">
                      <div class="tip-icon">🚫</div>
                      <p class="tip-text">Hindari memencet atau menyentuh area yang bermasalah</p>
                    </div>
                    <div class="tip-card">
                      <div class="tip-icon">👨‍⚕️</div>
                      <p class="tip-text">Konsultasikan dengan dokter kulit untuk penanganan optimal</p>
                    </div>
                  </div>
                </section>
                
                <!-- Navigation Buttons -->
                <section class="content-section">
                  <div class="navigation-buttons">
                    <a href="#/artikel" id="all-articles-button" class="nav-button article-button">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Lihat Semua Artikel
                    </a>
                    <a href="#/dashboard" id="dashboard-button" class="nav-button dashboard-button">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Kembali ke Dashboard
                    </a>
                  </div>
                </section>
              </article>
            </div>
          </div>
          
          <!-- Footer -->
          <footer class="bg-gray-50 py-8 px-4 text-center text-gray-500 text-sm border-t">
            <div class="max-w-4xl mx-auto">
              © 2025 AcureScan. SkinCheck. All rights reserved.
            </div>
          </footer>
        </div>
      `;
  }

  _setupEventListeners() {
    // Wait for the DOM to be fully loaded before adding event listeners
    setTimeout(() => {
      // Back button (top of page)
      const backButton = this.querySelector("#back-to-articles-list");
      if (backButton) {
        backButton.addEventListener("click", () => {
          window.location.hash = "#/artikel";
        });
      }

      // All articles button (bottom of page)
      const allArticlesButton = this.querySelector("#all-articles-button");
      if (allArticlesButton) {
        allArticlesButton.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.hash = "#/artikel";
        });
      }

      // Dashboard button (bottom of page)
      const dashboardButton = this.querySelector("#dashboard-button");
      if (dashboardButton) {
        dashboardButton.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.hash = "#/dashboard";
        });
      }
    }, 100);
  }
}

customElements.define("artikel-detail-page", ArtikelDetailPage);
