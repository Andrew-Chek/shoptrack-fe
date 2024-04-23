import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth/auth.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CommonModule } from '@angular/common';

import { UserState } from './user/user.state';

@NgModule({
    imports: [
        CommonModule,
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsModule.forFeature([
            AuthState,
            UserState,
        ]),
    ],
    exports: [NgxsModule, NgxsReduxDevtoolsPluginModule],
})
export class StoreModule {}
