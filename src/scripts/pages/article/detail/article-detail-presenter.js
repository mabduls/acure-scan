import { navigateToUrl } from '../../../routes/routes.js'

class ArticleDetailPresenter {
    constructor(view) {
        this._view = view
        this._articleSlug = null
        this._articles = {
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
    }

    async init() {
        try {
            // Show loading spinner
            this._showLoadingSpinner()

            const articleSlug = this._articleSlug || this._extractArticleSlugFromUrl()
            if (!articleSlug) {
                this._hideLoadingSpinner()
                this._showErrorMessage('Could not parse article ID from URL')
                return
            }

            const article = this._articles[articleSlug]
            if (!article) {
                this._hideLoadingSpinner()
                this._showErrorMessage('Artikel tidak ditemukan')
                return
            }

            // Simulate network request for more engaging loading experience
            await this._simulateNetworkDelay(800)

            this._renderArticle(article)
            this._setupEventListeners()
            this._animatePageElements()
            this._hideLoadingSpinner()
        } catch (error) {
            console.error('Error initializing article detail:', error)
            this._hideLoadingSpinner()
            this._showErrorMessage('Terjadi kesalahan saat memuat artikel')
        }
    }

    _extractArticleSlugFromUrl() {
        const url = window.location.hash
        const queryString = url.split('?')[1]
        if (!queryString) return null

        const params = new URLSearchParams(queryString)
        return params.get('slug')
    }

    _showLoadingSpinner() {
        const spinner = this._view.querySelector('#loading-spinner')
        if (spinner) {
            spinner.classList.remove('hidden')
        }
    }

    _hideLoadingSpinner() {
        const spinner = this._view.querySelector('#loading-spinner')
        if (spinner) {
            spinner.classList.add('hidden')
        }
    }

    _showErrorMessage(message) {
        const errorTemplate = this._view.querySelector('#error-template')
        const articleTemplate = this._view.querySelector('#article-template')

        if (errorTemplate) {
            errorTemplate.classList.remove('hidden')
            // Apply animation to show the error message
            setTimeout(() => {
                errorTemplate.classList.remove('opacity-0', 'scale-95')
                errorTemplate.classList.add('opacity-100', 'scale-100')
            }, 50)

            const errorMessage = this._view.querySelector('#error-message')
            if (errorMessage) {
                errorMessage.textContent = message
            }
        }

        if (articleTemplate) {
            articleTemplate.classList.add('hidden', 'opacity-0', 'scale-95')
        }

        const backButton = this._view.querySelector('#back-to-articles')
        if (backButton) {
            backButton.addEventListener('click', () => {
                // Animate button on click
                backButton.classList.add('scale-95')
                setTimeout(() => {
                    backButton.classList.remove('scale-95')
                    window.location.hash = '#/artikel'
                }, 200)
            })
        }
    }

    _renderArticle(article) {
        const errorTemplate = this._view.querySelector('#error-template')
        const articleTemplate = this._view.querySelector('#article-template')

        if (errorTemplate) {
            errorTemplate.classList.add('hidden', 'opacity-0', 'scale-95')
        }

        if (articleTemplate) {
            articleTemplate.classList.remove('hidden')
        }

        // Set article data
        const titleElement = this._view.querySelector('#article-title')
        if (titleElement) {
            titleElement.textContent = article.title
            // We'll animate this later
        }

        const imageElement = this._view.querySelector('#article-image')
        if (imageElement) {
            // Set as data-src for lazy loading
            imageElement.setAttribute('data-src', article.img)
            imageElement.src = article.img // Set src directly as fallback
            imageElement.alt = article.title
        }

        const contentElement = this._view.querySelector('#article-content')
        if (contentElement) {
            contentElement.textContent = article.content
            // We'll animate this later
        }

        // Render lists with staggered animation classes
        this._renderListWithAnimation('#characteristics-list', article.ciri)
        this._renderListWithAnimation('#causes-list', article.penyebab)
        this._renderListWithAnimation('#treatment-list', article.penanganan)
        this._renderListWithAnimation('#prevention-list', article.pencegahan)
    }

    _renderListWithAnimation(selector, items) {
        const listElement = this._view.querySelector(selector)
        if (!listElement) return

        listElement.innerHTML = items
            .map(
                (item, index) =>
                    `<li class="opacity-0 transform -translate-x-4 transition-all duration-500" 
                 style="transition-delay: ${100 + index * 150}ms;">${item}</li>`
            )
            .join('')
    }

    _animatePageElements() {
        // Animate title
        const titleElement = this._view.querySelector('#article-title')
        if (titleElement) {
            setTimeout(() => {
                titleElement.classList.remove('opacity-0', '-translate-y-4')
                titleElement.classList.add('opacity-100', 'translate-y-0')
            }, 300)
        }

        // Animate underline
        const underlineElement = this._view.querySelector('.w-0.h-1.mb-12')
        if (underlineElement) {
            setTimeout(() => {
                underlineElement.classList.remove('w-0')
                underlineElement.classList.add('w-20')
            }, 600)
        }

        // Animate image container
        const imageContainer = this._view.querySelector('#article-image')?.parentElement
        if (imageContainer) {
            setTimeout(() => {
                imageContainer.classList.remove('opacity-0', 'scale-95')
                imageContainer.classList.add('opacity-100', 'scale-100')
            }, 900)
        }

        // Animate content
        const contentElement = this._view.querySelector('#article-content')
        if (contentElement) {
            setTimeout(() => {
                contentElement.classList.remove('opacity-0', '-translate-y-4')
                contentElement.classList.add('opacity-100', 'translate-y-0')
            }, 1200)
        }

        // Animate sections
        const sections = [
            '#characteristics-section',
            '#causes-section',
            '#treatment-section',
            '#prevention-section'
        ]

        sections.forEach((selector, index) => {
            const section = this._view.querySelector(selector)
            if (section) {
                setTimeout(
                    () => {
                        section.classList.remove('opacity-0', '-translate-y-4')
                        section.classList.add('opacity-100', 'translate-y-0')

                        // Animate each list item
                        const listItems = section.querySelectorAll('li')
                        listItems.forEach((item, i) => {
                            setTimeout(
                                () => {
                                    item.classList.remove('opacity-0', '-translate-x-4')
                                    item.classList.add('opacity-100', 'translate-x-0')
                                },
                                100 + i * 100
                            )
                        })
                    },
                    1400 + index * 200
                )
            }
        })

        // Animate tips section
        const tipsSection = this._view.querySelector('section:nth-of-type(5)')
        if (tipsSection) {
            setTimeout(() => {
                tipsSection.classList.remove('opacity-0', '-translate-y-4')
                tipsSection.classList.add('opacity-100', 'translate-y-0')
            }, 2200)
        }

        // Animate navigation buttons
        const navSection = this._view.querySelector('section:nth-of-type(6)')
        if (navSection) {
            setTimeout(() => {
                navSection.classList.remove('opacity-0', '-translate-y-4')
                navSection.classList.add('opacity-100', 'translate-y-0')
            }, 2400)
        }

        // Animate footer
        const footer = this._view.querySelector('footer')
        if (footer) {
            setTimeout(() => {
                footer.classList.remove('opacity-0', '-translate-y-4')
                footer.classList.add('opacity-100', 'translate-y-0')
            }, 2600)
        }

        // Animate the whole article template for a nice entrance
        const articleTemplate = this._view.querySelector('#article-template')
        if (articleTemplate) {
            setTimeout(() => {
                articleTemplate.classList.remove('opacity-0', 'scale-95')
                articleTemplate.classList.add('opacity-100', 'scale-100')
            }, 100)
        }
    }

    _setupEventListeners() {
        // Back button with animation
        const backButton = this._view.querySelector('#back-to-articles-list')
        if (backButton) {
            backButton.addEventListener('click', e => {
                e.preventDefault()
                // Animate button on click
                backButton.classList.add('scale-95')

                // Animate page transition out
                const articleTemplate = this._view.querySelector('#article-template')
                if (articleTemplate) {
                    articleTemplate.classList.add('opacity-0', 'scale-95')
                    articleTemplate.classList.remove('opacity-100', 'scale-100')
                }

                setTimeout(() => {
                    backButton.classList.remove('scale-95')
                    navigateToUrl('/article')
                }, 300)
            })
        }

        // All articles button with animation
        const allArticlesButton = this._view.querySelector('#all-articles-button')
        if (allArticlesButton) {
            allArticlesButton.addEventListener('click', e => {
                e.preventDefault()
                // Animate button on click
                allArticlesButton.classList.add('scale-95')

                // Animate page transition out
                const articleTemplate = this._view.querySelector('#article-template')
                if (articleTemplate) {
                    articleTemplate.classList.add('opacity-0', 'translate-y-4')
                    articleTemplate.classList.remove('opacity-100', 'translate-y-0')
                }

                setTimeout(() => {
                    allArticlesButton.classList.remove('scale-95')
                    navigateToUrl('/article')
                }, 300)
            })
        }

        // Dashboard button with animation
        const dashboardButton = this._view.querySelector('#dashboard-button')
        if (dashboardButton) {
            dashboardButton.addEventListener('click', e => {
                e.preventDefault()
                // Animate button on click
                dashboardButton.classList.add('scale-95')

                // Animate page transition out
                const articleTemplate = this._view.querySelector('#article-template')
                if (articleTemplate) {
                    articleTemplate.classList.add('opacity-0', 'translate-y-4')
                    articleTemplate.classList.remove('opacity-100', 'translate-y-0')
                }

                setTimeout(() => {
                    dashboardButton.classList.remove('scale-95')
                    window.location.hash = '#/dashboard'
                }, 300)
            })
        }

        // Add hover effects for list items
        const listItems = this._view.querySelectorAll('li')
        listItems.forEach(item => {
            item.classList.add(
                'transition-all',
                'duration-300',
                'hover:translate-x-1',
                'cursor-default'
            )
        })

        // Add scroll reveal animations
        this._setupScrollRevealAnimations()
    }

    _setupScrollRevealAnimations() {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }

            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-reveal')
                        observer.unobserve(entry.target)
                    }
                })
            }, observerOptions)

            // Observe all section headers for scroll reveal
            const sectionHeaders = this._view.querySelectorAll('h2')
            sectionHeaders.forEach(header => {
                header.classList.add('transition-all', 'duration-700')
                observer.observe(header)
            })
        }
    }

    // Simulate network delay for better UX with animations
    _simulateNetworkDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export default ArticleDetailPresenter
