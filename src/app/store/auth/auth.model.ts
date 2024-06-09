import { StoreApiInterface } from "@app/core/dto/store.api.inteface";

export interface AuthModel {
    email: string;
    id: number;
    username: string;
    role_id: number;
}

export interface SigninParams {
    username?: string;
    password?: string;
}

export interface RegistrationParams {
    username: string;
    email: string;
    password: string;
    roleId: number;
    storeName: string
}

export interface ForgotPasswordParams {
    email: string;
}

export interface ResetPasswordParams {
    password: string;
}
