class LandingPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="bg-gradient-to-b from-[#DBF1E7] to-[#C5E7E1] min-h-screen">
                <!-- Navigation -->
                <div class="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
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
                </div>
                
                <!-- Section 1: Hero -->
                <section id="home" class="min-h-screen flex flex-col">
                    <!-- Card Container -->
                    <div class="bg-[#e0f5ef] m-6 md:m-10 rounded-xl shadow-lg flex-grow">
                        <!-- Main Content -->
                        <main class="flex-grow flex flex-col md:flex-row items-center px-6 py-12">
                            <!-- Left Content -->
                            <div class="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8">
                                <h2 class="text-gray-600 font-medium text-lg md:text-xl mb-3">Detect & Resolve</h2>
                                <h1 class="text-3xl md:text-5xl font-bold text-teal-700 mb-4">Accurate detection of acne on the face becomes easy for you</h1>
                                <p class="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                                    Feel free to use our application and start detecting acne on your face
                                </p>
                                <a href="#" class="inline-block bg-cyan-400 hover:bg-cyan-500 text-white font-medium rounded-full px-8 py-3 shadow-md transition-all">
                                    Start Sign 
                                </a>
                            </div>
                            
                            <!-- Right Image -->
                            <div class="md:w-1/2 flex justify-center">
                                <div class="relative w-full max-w-md">
                                    <div class="rounded-lg w-full h-96 bg-teal-100 flex items-center justify-center">
                                        <div class="text-center p-4">
                                            <svg class="w-16 h-16 mx-auto text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p class="text-teal-700">Acne Detection Illustration</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </section>

                <!-- Section 2: Why AcureScan -->
                <section id="why-acurescan" class="py-16 px-6 md:px-20">
                    <!-- Card Container -->
                    <div class="bg-[#dcf2ef] rounded-xl shadow-lg p-8">
                        <h2 class="text-2xl md:text-3xl font-bold text-cyan-800 mb-10 text-center">Why AcureScan?</h2>
                        <div class="flex flex-col md:flex-row items-center justify-center gap-10">
                            <!-- Image -->
                            <div class="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
                                <div class="rounded-lg w-full max-w-sm h-80 bg-teal-100 flex items-center justify-center">
                                    <div class="text-center p-4">
                                        <svg class="w-16 h-16 mx-auto text-teal-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <p class="text-teal-700">Why Choose Us Illustration</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Cards -->
                            <div class="w-full md:w-1/2 space-y-6">
                                <!-- Card 1 -->
                                <div class="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                                    <div class="text-cyan-500">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 7H7v6h6V7z" />
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3-9h6a1 1 0 011 1v6a1 1 0 01-1 1H7a1 1 0 01-1-1V10a1 1 0 011-1z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold text-cyan-700">High Accuracy</h3>
                                        <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                                    </div>
                                </div>
                                <!-- Card 2 -->
                                <div class="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                                    <div class="text-orange-400">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 4a1 1 0 011-1h3.586a1 1 0 01.707.293l1.414 1.414A1 1 0 0010.414 5H15a1 1 0 011 1v1H3V4z" />
                                            <path d="M3 8h14v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold text-orange-500">Monitor Scan Result</h3>
                                        <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                                    </div>
                                </div>
                                <!-- Card 3 -->
                                <div class="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
                                    <div class="text-cyan-700">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 3a1 1 0 000 2h10a1 1 0 100-2H5z" />
                                            <path fill-rule="evenodd" d="M4 6a1 1 0 00-1 1v9a2 2 0 002 2h10a2 2 0 002-2V7a1 1 0 00-1-1H4zm2 3a1 1 0 112 0 1 1 0 01-2 0zm5 1a1 1 0 100-2 1 1 0 000 2zm-4 3h6a1 1 0 100-2H7a1 1 0 100 2z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-semibold text-cyan-800">Accurate Scan</h3>
                                        <p class="text-gray-600 text-sm">AcureScan uses machine learning to detect acne disease 99% of the time</p>
                                    </div>
                                </div>
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