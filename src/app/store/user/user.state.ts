import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserService } from 'app/core/api/user.service';
import { ToasterService } from 'app/shared/services/toaster.service';
import { catchError, tap } from 'rxjs';
import { LogoutUser, UpdateUser, UpdateUserInStore } from './user.action';
import { UserModel } from './user.model';

@State<UserModel>({
    name: 'user',
    defaults: { user: undefined },
})
@Injectable()
export class UserState {
    constructor(
        private userService: UserService,
        private toasterService: ToasterService,
    ) {}

    @Selector()
    static getUser(state: UserModel) {
        return state.user;
    }

    @Action(UpdateUser)
    update_user({ patchState }: StateContext<UserModel>, action: UpdateUser) {
        return this.userService.patch(action.payload).pipe(
            tap(userResponse => {
                patchState({ user: userResponse });
            }),
            catchError(async ({ error }) => {
                await this.toasterService.showToaster(error.localize);
                throw new Error(error.message);
            })
        );
    }

    @Action(UpdateUserInStore)
    update_user_in_store({ patchState, getState }: StateContext<UserModel>, action: UpdateUserInStore) {
        const { user } = getState();

        if (!user || user === undefined || user === null) {
            patchState({
                user: action.payload,
            });
        } else {
            patchState({
                user: { ...user, ...action.payload },
            });
        }
    }

    @Action(LogoutUser)
    logout_user({ patchState }: StateContext<UserModel>) {
        patchState({
            user: undefined,
        });
    }
}
