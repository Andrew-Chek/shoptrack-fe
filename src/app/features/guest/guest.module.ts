import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';



@NgModule({
    declarations: [GuestComponent],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: GuestComponent,
            },
            {
                path: 'store-addresses/:storeName',
                loadChildren: () => import('../../shared/components/stores/stores.module').then(m => m.StoresModule),
            }
        ]),
    ]
})
export class GuestModule { }
