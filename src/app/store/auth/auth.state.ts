import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from 'app/core/api/auth.service';
import { UserApiInterface } from '@app/core/dto/signin.api.interface';
import { VaultService } from 'app/shared/services/storage.service';
import { catchError, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UpdateUserInStore } from '../user/user.action';
import {
    Signin,
    Registration,
} from './auth.action';
import { AuthModel } from './auth.model';
import { StoreService } from '@app/core/api/store.service';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';

// TODO: refactor entity auth email, id?
@State<AuthModel>({
    name: 'auth',
    defaults: { email: '', id: 0, username: '', role_id: 2},
})
@Injectable()
export class AuthState {

    constructor(
        private authService: AuthService,
        private vaultService: VaultService,
        private storeService: StoreService
    ) {}

    @Action(Signin)
    login(
        { patchState, dispatch }: StateContext<AuthModel>,
        { payload }: Signin
    ) {
        return this.authService.signin(payload).pipe(
            tap((response: any) => {
                console.log('response', response);
                if ('token' in response) {
                    // Handle sign-in response
                    dispatch(new UpdateUserInStore(response));
                } else {
                    // Handle other response, e.g., fetch user details
                    const user = response as UserApiInterface;
                    patchState({ id: user.userId, username: user.username, role_id: user.roleId });
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
        if(payload.storeName === '' && payload.roleId === 1) {
            return throwError('Store name is required');
        }
        return this.authService.registration(payload).pipe(
            switchMap((response: any) => {
                if (payload.storeName !== '') {
                    // Якщо ім'я магазину є в payload, отримати магазин за назвою
                    return this.storeService.getStoresByName(payload.storeName).pipe(
                        tap((stores: StoreApiInterface[]) => {
                            if (stores.length > 0) {
                                // Якщо знайдено магазини, беремо перший
                                const storeId = stores[0].store_id;
                                // Оновлюємо користувача, прив'язуючи до нього магазин
                                this.authService.updateUserStore(response, storeId).subscribe();
                            }
                        }),
                        map(() => response) // Повертаємо оригінальний response
                    );
                }
                else if(payload.roleId === 2) {
                    return of(response); // Якщо немає магазину, повертаємо оригінальний response
                }
                else {
                    return throwError('Store name is required');
                }
            }),
            catchError((error) => {
                return throwError(error);
            })
        );    
    }
}
