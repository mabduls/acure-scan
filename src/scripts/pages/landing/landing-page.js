class LandingPage extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="min-h-screen bg-emerald-50 flex flex-col">
                <!-- Navigation -->
                <nav class="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-cyan-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 17.27L16.15 21L14.64 13.97L20 9.24L12.76 8.63L10 2L7.24 8.63L0 9.24L5.36 13.97L3.85 21L10 17.27Z" />
                        </svg>
                        <div class="text-2xl font-bold">
                            <span class="text-teal-700">Acure</span><span class="text-teal-600">Scan</span>
                        </div>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#" class="text-gray-600 hover:text-teal-600">Home</a>
                        <a href="#" class="text-gray-600 hover:text-teal-600">About</a>
                        <a href="#" class="text-gray-600 hover:text-teal-600">Contact</a>
                    </div>
                    <div class="flex space-x-4">
                        <a href="#" class="text-teal-700 font-medium hover:text-teal-800">Login</a>
                        <a href="#" class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition">Sign Up</a>
                    </div>
                </nav>
            
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
                            Start Sign In
                        </a>
                    </div>
                    
                    <!-- Right Image -->
                    <div class="md:w-1/2 flex justify-center">
                        <div class="relative w-full max-w-md">
                            <!-- Menggunakan div dengan background-color sebagai placeholder -->
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
        `;
    }
}

customElements.define('landing-page', LandingPage);

export default LandingPage;