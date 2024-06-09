const API_URL = 'http://localhost:5090/api';

export const AUTH = {
    signin: `${API_URL}/auth/sign-in`,
    registration: `${API_URL}/users`,
    forgotpassword: '/auth/forgot-password',
    resetpassword: '/auth/reset-password',
};

export const USER = {
    users: `${API_URL}/users`,
};

export const STORE = {
    stores: `${API_URL}/stores`,
    store: `${API_URL}/stores/store`,
    names: `${API_URL}/stores/names`,
};

export const PRODUCT = {
    discounts: `${API_URL}/discounts`,
    products: `${API_URL}/products`,
    product: `${API_URL}/products/product`,
};

export const LIST = {
    listsByUser: `${API_URL}/lists/user`,
    lists: `${API_URL}/lists`,
};

export const STATISTICS = {
    productsInListPerStore: `${API_URL}/products/in-lists-count-per-store-name`,
    cheapestProducts: `${API_URL}/products/cheapest-per-store`,
    mostExpensiveProducts: `${API_URL}/products/most-expensive-per-store`,
    maxDiscounts: `max-discounts`,
};
