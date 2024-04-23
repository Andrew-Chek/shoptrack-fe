import {
    ForgotPasswordParams,
    SigninParams,
    RegistrationParams,
    ResetPasswordParams,
} from './auth.model';

export class Signin {
    static readonly type = '[Auth] Signin';
    constructor(public payload: SigninParams) {}
}

export class Registration {
    static readonly type = '[Auth] Registration';
    constructor(public payload: RegistrationParams) {}
}

export class ForgotPassword {
    static readonly type = '[Auth] ForgotPassword';
    constructor(public payload: ForgotPasswordParams) {}
}

export class ResetPassword {
    static readonly type = '[Auth] ResetPassword';
    constructor(public payload: ResetPasswordParams) {}
}
