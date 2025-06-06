const { register, login, logout } = require('../controllers/auth-controller');

const authRoutes = [
    {
        method: 'POST',
        path: '/api/auth/register', // Hapus /api jika ingin menggunakan path yang sama dengan api.js
        handler: register,
        options: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/api/auth/login',
        handler: login,
        options: {
            auth: false
        }
    },
    {
        method: 'POST',
        path: '/api/auth/logout',
        handler: logout
    }
];

module.exports = authRoutes;