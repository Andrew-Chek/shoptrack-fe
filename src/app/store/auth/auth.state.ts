import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from 'app/core/api/auth.service';
import { UserApiInterface } from '@app/core/dto/signin.api.interface';
import { RegistrationApiInterface } from 'app/core/dto/registration.api.interface';
import { VaultService } from 'app/shared/services/storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UpdateUserInStore } from '../user/user.action';
import {
    ForgotPassword,
    Signin,
    Registration,
    ResetPassword,
} from './auth.action';
import { AuthModel } from './auth.model';

// TODO: refactor entity auth email, id?
@State<AuthModel>({
    name: 'auth',
    defaults: { email: '', id: 0, username: '', role: ''},
})
@Injectable()
export class AuthState {

    constructor(
        private authService: AuthService,
        private vaultService: VaultService
    ) {}

    @Action(Signin)
    login(
        { patchState, dispatch }: StateContext<AuthModel>,
        { payload }: Signin
    ) {
        return this.authService.signin(payload).pipe(
            tap((response: any) => {
                if ('token' in response) {
                    // Handle sign-in response
                    dispatch(new UpdateUserInStore(response));
                } else {
                    // Handle other response, e.g., fetch user details
                    const user = response as UserApiInterface;
                    patchState({ id: user.userId, username: user.username, role: user.role });
                }
            }),
            catchError((error) => {
                return throwError(error);
            })
        );
  }

    @Action(Registration)
    registration(
        { dispatch }: StateContext<AuthModel>,
        { payload }: Registration
    ) {
        return this.authService.registration(payload).pipe(
            tap((response: any) => {
                if ('token' in response) {
                    // Handle registration response
                    dispatch(new UpdateUserInStore(response));
                } else {
                    // Handle other response, if needed
                }
            }),
            catchError((error) => {
                return throwError(error);
            })
        );
    }
}
