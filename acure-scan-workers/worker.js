import { Router } from 'itty-router'
import { handleRegister, handleLogin, handleLogout } from '../src/server/workers/worker-auth.js'

const router = Router()

// List of allowed origins
const allowedOrigins = [
    'https://elaborate-duckanoo-4121a7.netlify.app',
    'https://mabduls.github.io',
    'http://localhost:9000' // Untuk development lokal
]

// Dynamic CORS headers
const getCorsHeaders = (origin) => ({
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
})

// Handler OPTIONS
router.options('*', (request) => {
    const origin = request.headers.get('origin') || ''
    return new Response(null, {
        headers: getCorsHeaders(origin)
    })
})

// Auth routes with dynamic CORS
const handleWithCors = (handler) => async (request) => {
    const origin = request.headers.get('origin') || ''
    try {
        const response = await handler(request)
        return new Response(JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(origin)
            }
        })
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message || 'Something went wrong'
        }), {
            status: error.status || 500,
            headers: {
                'Content-Type': 'application/json',
                ...getCorsHeaders(origin)
            }
        })
    }
}

// Apply CORS to all routes
router.post('/api/auth/register', handleWithCors(handleRegister))
router.post('/api/auth/login', handleWithCors(handleLogin))
router.post('/api/auth/logout', handleWithCors(handleLogout))

// Main handler
export default {
    async fetch(request, env, ctx) {
        try {
            const response = await router.handle(request)

            // Add CORS headers to all responses
            const origin = request.headers.get('origin') || ''
            for (const [key, value] of Object.entries(getCorsHeaders(origin))) {
                response.headers.set(key, value)
            }

            return response
        } catch (error) {
            const origin = request.headers.get('origin') || ''
            return new Response(JSON.stringify({
                error: error.message || 'Something went wrong'
            }), {
                status: error.status || 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...getCorsHeaders(origin)
                }
            })
        }
    }
}