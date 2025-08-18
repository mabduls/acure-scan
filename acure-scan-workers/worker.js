import { Router } from 'itty-router'
import { handleRegister, handleLogin, handleLogout } from '../src/server/workers/worker-auth.js'

const router = Router()

const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://elaborate-duckanoo-4121a7.netlify.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true'
}

// Handler OPTIONS
router.options('*', () => new Response(null, { headers: corsHeaders }))

// Auth routes
router.post('/api/auth/register', async request => {
    const response = await handleRegister(request)
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }
    })
})

router.post('/api/auth/login', async request => {
    const response = await handleLogin(request)
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }
    })
})

router.post('/api/auth/logout', async request => {
    const response = await handleLogout(request)
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }
    })
})

// Main handler
export default {
    async fetch(request, env, ctx) {
        try {
            return await router.handle(request)
        } catch (error) {
            return new Response(JSON.stringify({
                error: error.message || 'Something went wrong'
            }), {
                status: error.status || 500,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
            })
        }
    }
}