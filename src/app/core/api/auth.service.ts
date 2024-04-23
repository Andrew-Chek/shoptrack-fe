import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@core/constants/routes.const';
import { AUTH } from 'app/core/constants/api-urls';
import { UserApiInterface } from '@app/core/dto/signin.api.interface';
import { RegistrationApiInterface } from 'app/core/dto/registration.api.interface';
import {
    ForgotPasswordParams,
    SigninParams,
    RegistrationParams,
    ResetPasswordParams,
} from 'app/store/auth/auth.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    public signin(body: SigninParams): Observable<RegistrationApiInterface | UserApiInterface> {
        return this.http.post<RegistrationApiInterface>(AUTH.signin, body);
    }

    public registration(body: RegistrationParams): Observable<RegistrationApiInterface | UserApiInterface> {
        const params = new HttpParams().set('deviceType', 'mobile');
        return this.http.post<RegistrationApiInterface>(AUTH.registration, body, { params });
    }

    public forgotPassword(body: ForgotPasswordParams): Observable<ArrayBuffer> {
        const params = new HttpParams().set('email', body.email);
        return this.http.post<ArrayBuffer>(
            AUTH.forgotpassword,
            {},
            {
                params,
            }
        );
    }

    public async redirectToSignIn(): Promise<void> {
        await this.router.navigate([routes.home, routes.auth, routes.signin]);
    }

    public resetPassword(body: ResetPasswordParams): Observable<ResetPasswordParams> {
        const params = new HttpParams().set('password', body.password);
        return this.http.post<ResetPasswordParams>(
            AUTH.resetpassword,
            {},
            {
                params,
            }
        );
    }
}
