import api from './api';

const authService = {
    login: async (email, password) => {
        // Backend expects email
        const response = await api.post('amr/login', { email, password });
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role || 'USER');
            localStorage.setItem('username', response.data.username || '');
        }
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await api.post(`amr/forgot-password`, null, {
            params: { email }
        });
        return response.data;
    },

    resetPassword: async (email, otp, newPassword, confirmPassword) => {
        const response = await api.post(`amr/reset-password`, null, {
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
        // Mocking assignedMeters for ADMIN role to demonstrate filtering
        // In a real scenario, this would come from the backend response
        const response = await api.get('amr/me');
        if (response.data && response.data.role === 'ADMIN') {
            response.data.assignedMeters = ['SOLAR', 'ELECTRIC']; // Mocked assignments: Solar and Energy (Devices)
        }
        return response.data;
    },

    createAdminUser: async (userData) => {
        const response = await api.post('amr/create-admin-user', userData);
        return response.data;
    },

    createUser: async (userData) => {
        const response = await api.post('amr/create-user', userData);
        return response.data;
    },

    getUserList: async (createdBy, page = 0, size = 10) => {
        const response = await api.get('amr/users/userlist', {
            params: { createdBy, page, size }
        });
        return response.data;
    }
};

export default authService;
