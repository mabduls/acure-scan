import { Router } from 'itty-router'
import { handleRegister, handleLogin, handleLogout } from './worker-auth.js'

const router = Router()

// List of allowed origins
const allowedOrigins = [
    'http://localhost:9000',
    'https://elaborate-duckanoo-4121a7.netlify.app',
    'https://mabduls.github.io/acure-scan',
    'https://mabduls.github.io',
    'http://127.0.0.1:8080'
]

// Dynamic CORS headers
const getCorsHeaders = (origin) => {
    const headers = {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, Origin, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true'
    }

    // Check if origin is allowed
    const isAllowedOrigin = allowedOrigins.some(allowedOrigin =>
        origin === allowedOrigin ||
        origin.endsWith('.netlify.app') ||
        origin.endsWith('.github.io')
    )

    if (isAllowedOrigin) {
        headers['Access-Control-Allow-Origin'] = origin
    } else {
        headers['Access-Control-Allow-Origin'] = allowedOrigins[0]
    }

    return headers
}

// Handler OPTIONS for preflight requests
router.options('*', (request) => {
    const origin = request.headers.get('origin') || ''
    return new Response(null, {
        status: 200,
        headers: getCorsHeaders(origin)
    })
})

// Simple test route untuk debugging
router.get('/test', () => {
    const origin = '*'
    return new Response(JSON.stringify({
        message: 'API is working!',
        timestamp: new Date().toISOString()
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
        }
    })
})

// Health check route
router.get('/health', () => {
    const origin = '*'
    return new Response(JSON.stringify({
        status: 'OK',
        timestamp: new Date().toISOString()
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
        }
    })
})

// Apply CORS to auth routes
router.post('/api/auth/register', async (request) => {
    try {
        const origin = request.headers.get('origin') || ''
        const response = await handleRegister(request)

        // Add CORS headers
        const headers = new Headers(response.headers)
        Object.entries(getCorsHeaders(origin)).forEach(([key, value]) => {
            headers.set(key, value)
        })

        return new Response(response.body, {
            status: response.status,
            headers
        })
    } catch (error) {
        const origin = request.headers.get('origin') || ''
        return new Response(JSON.stringify({
            error: error.message || 'Registration failed'
        }), {
            status: error.status || 500,
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(origin)
            }
        })
    }
})

router.post('/api/auth/login', async (request) => {
    try {
        const origin = request.headers.get('origin') || ''
        const response = await handleLogin(request)

        // Add CORS headers
        const headers = new Headers(response.headers)
        Object.entries(getCorsHeaders(origin)).forEach(([key, value]) => {
            headers.set(key, value)
        })

        return new Response(response.body, {
            status: response.status,
            headers
        })
    } catch (error) {
        const origin = request.headers.get('origin') || ''
        return new Response(JSON.stringify({
            error: error.message || 'Login failed'
        }), {
            status: error.status || 500,
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(origin)
            }
        })
    }
})

router.post('/api/auth/logout', async (request) => {
    try {
        const origin = request.headers.get('origin') || ''
        const response = await handleLogout(request)

        // Add CORS headers
        const headers = new Headers(response.headers)
        Object.entries(getCorsHeaders(origin)).forEach(([key, value]) => {
            headers.set(key, value)
        })

        return new Response(response.body, {
            status: response.status,
            headers
        })
    } catch (error) {
        const origin = request.headers.get('origin') || ''
        return new Response(JSON.stringify({
            error: error.message || 'Logout failed'
        }), {
            status: error.status || 500,
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(origin)
            }
        })
    }
})

// Root route
router.get('/', () => {
    const origin = '*'
    return new Response(JSON.stringify({
        message: 'Acure Scan API is running!',
        endpoints: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            logout: 'POST /api/auth/logout',
            test: 'GET /test',
            health: 'GET /health'
        }
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
        }
    })
})

// Handle 404
router.all('*', () => {
    const origin = '*'
    return new Response(JSON.stringify({
        error: 'Endpoint not found',
        available_endpoints: ['/api/auth/register', '/api/auth/login', '/api/auth/logout', '/test', '/health']
    }), {
        status: 404,
        headers: {
            'Content-Type': 'application/json',
            ...getCorsHeaders(origin)
        }
    })
})

export default {
    async fetch(request, env, ctx) {
        try {
            // Handle preflight requests
            if (request.method === 'OPTIONS') {
                const origin = request.headers.get('origin') || ''
                return new Response(null, {
                    headers: getCorsHeaders(origin)
                })
            }

            // Handle the request
            const response = await router.handle(request)
            return response

        } catch (error) {
            console.error('Unhandled error in worker:', error)
            const origin = request.headers.get('origin') || ''
            return new Response(JSON.stringify({
                error: 'Internal Server Error',
                message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
            }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...getCorsHeaders(origin)
                }
            })
        }
    }
}