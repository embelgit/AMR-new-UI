import api from './api';

const authService = {
    login: async (email, password) => {
        // Backend expects username
        const response = await api.post('/amr/login', { username: email, password });
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role || 'USER');
            localStorage.setItem('username', response.data.username || '');
        }
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await api.post(`/amr/forgot-password`, null, {
            params: { email }
        });
        return response.data;
    },

    resetPassword: async (email, otp, newPassword, confirmPassword) => {
        const response = await api.post(`/amr/reset-password`, null, {
            params: { email, otp, newPassword, confirmPassword }
        });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
    },

    getProfile: async () => {
        const response = await api.get('/amr/me');
        return response.data;
    }
};

export default authService;
