import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@app/shared/shared.module';
import { UserComponent } from './user.component';
import { routes } from '@app/core/constants/routes.const';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
        {
            path: '',
            component: UserComponent,
        },
        {
            path: 'store-addresses/:storeName',
            loadChildren: () => import('../../shared/components/stores/stores.module').then(m => m.StoresModule),
        },
        {
            path: routes.profile,
            loadChildren: () => import('../../shared/components/profile/profile.module').then(m => m.ProfileModule),
        },
        {
            path: routes.lists,
            loadChildren: () => import('./components/lists/lists.module').then(m => m.ListsModule),
        }
    ]),
  ]
})
export class UserModule { }
