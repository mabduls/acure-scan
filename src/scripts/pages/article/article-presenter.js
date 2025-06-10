class ArticlePresenter {
    constructor(view) {
        this._view = view
        this._articles = [
            {
                slug: 'blackheads',
                imageUrl: '/images/artikel/blackheads.jpg',
                title: 'Jerawat Blackheads (Komedo Hitam)',
                description:
                    'Blackheads atau komedo hitam adalah pori-pori yang tersumbat oleh minyak dan sel kulit mati yang terpapar udara sehingga berubah warna menjadi hitam. Jenis jerawat ini umumnya muncul di area T-zone wajah seperti hidung, dahi, dan dagu. Meskipun tidak menimbulkan peradangan, blackheads dapat mempengaruhi penampilan kulit.'
            },
            {
                slug: 'whiteheads',
                imageUrl: '/images/artikel/whiteheads.jpg',
                title: 'Jerawat Whiteheads (Komedo Putih)',
                description:
                    'Whiteheads atau komedo putih adalah pori-pori yang tersumbat oleh minyak dan sel kulit mati yang tertutup lapisan kulit, sehingga tampak sebagai benjolan kecil berwarna putih. Berbeda dengan blackheads, whiteheads tidak terpapar udara sehingga tetap berwarna putih atau flesh-tone. Jenis jerawat ini sering muncul di area pipi dan dahi.'
            },
            {
                slug: 'papula',
                imageUrl: '/images/artikel/papula.jpg',
                title: 'Jerawat Papula',
                description:
                    'Papula adalah jenis jerawat yang meradang, terasa sakit saat disentuh, dan terlihat kemerahan tanpa nanah di permukaan kulit. Papula terbentuk ketika dinding folikel rambut pecah akibat peradangan, menyebabkan bakteri menyebar ke jaringan kulit sekitarnya. Jenis jerawat ini tidak boleh dipencet karena dapat memperparah peradangan.'
            },
            {
                slug: 'pustula',
                imageUrl: '/images/artikel/pustula.jpg',
                title: 'Jerawat Pustula',
                description:
                    "Pustula adalah jerawat yang berisi nanah di tengahnya, berwarna putih atau kuning, dan dikelilingi oleh peradangan kemerahan. Berbeda dengan papula, pustula memiliki 'mata' putih di tengahnya yang berisi nanah. Jenis jerawat ini terbentuk ketika sel darah putih berkumpul untuk melawan infeksi bakteri di dalam pori-pori yang tersumbat."
            },
            {
                slug: 'kistik',
                imageUrl: '/images/artikel/kistik.jpg',
                title: 'Jerawat Kistik (Cystic Acne)',
                description:
                    'Jerawat kistik adalah jenis jerawat parah yang terbentuk jauh di bawah permukaan kulit. Berisi nanah, terasa nyeri, dan berisiko meninggalkan bekas luka permanen. Jerawat kistik memerlukan penanganan khusus dari dermatologis karena dapat menyebabkan kerusakan jaringan kulit yang serius. Jenis jerawat ini sering dikaitkan dengan faktor hormonal dan genetik.'
            }
        ]
    }

    async init() {
        this._renderArticles()
        this._setupEventListeners()
        this._setupAnimations()
    }

    _renderArticles() {
        const container = this._view.querySelector('#articles-container')
        if (container) {
            container.innerHTML = this._articles
                .map((article, index) =>
                    this._renderArticleCard(
                        article.slug,
                        article.imageUrl,
                        article.title,
                        article.description,
                        index
                    )
                )
                .join('')
        }
    }

    _renderArticleCard(slug, imageUrl, title, description, index) {
        // Menambahkan animasi pada card artikel
        return `
        <article data-slug="${slug}" class="artikel-card cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up" style="animation-delay: ${0.6 + index * 0.2}s;">
            <div class="md:flex group">
                <div class="md:w-2/5 overflow-hidden">
                    <img src="${imageUrl}" alt="${title}" class="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div class="md:w-3/5 p-8">
                    <div class="flex items-center mb-4">
                        <div class="w-2 h-8 bg-[#00667A] rounded-full mr-4 transition-all duration-300 group-hover:h-12 group-hover:bg-[#009CA6]"></div>
                        <h3 class="text-2xl font-bold text-[#00667A] transition-colors duration-300 group-hover:text-[#009CA6]">${title}</h3>
                    </div>
                    <p class="text-gray-700 leading-7 text-justify mb-6 transition-all duration-300 group-hover:text-gray-900">${description}</p>
                    <div class="flex items-center text-[#009CA6] font-semibold hover:text-[#00667A] transition-all duration-300 group-hover:translate-x-1">
                        <span class="mr-2">Baca selengkapnya</span>
                        <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </article>
    `
    }

    _setupEventListeners() {
        const backButton = this._view.querySelector('#back-button')
        if (backButton) {
            backButton.addEventListener('click', e => {
                e.preventDefault()
                // Menambahkan animasi fade-out sebelum navigasi
                document.body.classList.add('page-exit')
                setTimeout(() => {
                    window.location.hash = '#/dashboard'
                }, 300)
            })
        }

        // Perbaikan selector dan routing dengan animasi
        this._view.querySelectorAll('.artikel-card').forEach(card => {
            card.addEventListener('click', e => {
                e.preventDefault()
                const slug = card.getAttribute('data-slug')

                // Menambahkan animasi pada card yang diklik
                card.classList.add('scale-95', 'opacity-75')

                // Menambahkan animasi fade-out sebelum navigasi
                setTimeout(() => {
                    document.body.classList.add('page-exit')
                    setTimeout(() => {
                        window.location.hash = `#/article-detail?slug=${slug}`
                    }, 300)
                }, 200)
            })

            // Tambahkan efek hover yang interaktif
            card.addEventListener('mouseenter', () => {
                const otherCards = Array.from(this._view.querySelectorAll('.artikel-card')).filter(
                    item => item !== card
                )
                otherCards.forEach(otherCard => {
                    otherCard.classList.add('opacity-75')
                })
            })

            card.addEventListener('mouseleave', () => {
                this._view.querySelectorAll('.artikel-card').forEach(item => {
                    item.classList.remove('opacity-75')
                })
            })
        })
    }

    _setupAnimations() {
        // Menambahkan kelas CSS untuk animasi transisi halaman
        const style = document.createElement('style')
        style.textContent = `
            .page-exit {
                animation: fadeOut 0.3s forwards;
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            body {
                overflow-x: hidden;
            }
            
            /* Animasi smooth scroll */
            html {
                scroll-behavior: smooth;
            }
            
            /* Efek reveal saat scroll */
            .reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .reveal.active {
                opacity: 1;
                transform: translateY(0);
            }
        `
        document.head.appendChild(style)

        // Tambahkan efek reveal saat scroll
        this._setupScrollReveal()
    }

    _setupScrollReveal() {
        // Fungsi untuk mendeteksi elemen yang masuk ke viewport
        const revealOnScroll = () => {
            const elements = this._view.querySelectorAll('.artikel-card')
            const windowHeight = window.innerHeight

            elements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top
                const elementVisible = 150

                if (elementTop < windowHeight - elementVisible) {
                    setTimeout(() => {
                        element.classList.add('active')
                    }, index * 100) // Staggered animation
                }
            })
        }

        // Tambahkan kelas reveal ke artikel cards
        this._view.querySelectorAll('.artikel-card').forEach(card => {
            card.classList.add('reveal')
        })

        // Panggil fungsi saat halaman dimuat dan saat scroll
        window.addEventListener('scroll', revealOnScroll)
        window.addEventListener('load', revealOnScroll)

        // Panggil sekali untuk elemen yang sudah visible saat load
        setTimeout(revealOnScroll, 300)
    }
}

export default ArticlePresenter
