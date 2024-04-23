export interface AuthModel {
    email: string;
    id: number;
    username: string;
    role: string;
}

export interface SigninParams {
    username?: string;
    password?: string;
}

export interface RegistrationParams {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface ForgotPasswordParams {
    email: string;
}

export interface ResetPasswordParams {
    password: string;
}
