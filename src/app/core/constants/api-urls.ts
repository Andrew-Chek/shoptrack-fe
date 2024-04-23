const API_URL = 'http://localhost:5270/api';

export const AUTH = {
    signin: `${API_URL}/auth/sign-in`,
    registration: `${API_URL}/users`,
    forgotpassword: '/auth/forgot-password',
    resetpassword: '/auth/reset-password',
};

export const USER = {
    users: '/users',
};
