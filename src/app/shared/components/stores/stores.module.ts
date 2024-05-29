import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCardModule } from '../store-card/store-card.module';
import { IonicModule } from '@ionic/angular';
import { StoresComponent } from './stores.component';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
    declarations: [StoresComponent],
    imports: [
        CommonModule,
        StoreCardModule,
        IonicModule,
        AngularSvgIconModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: StoresComponent
            },
            {
                path: 'store-page/:store_id',
                loadChildren: () => import('../store-page/store-page.module').then(m => m.StorePageModule)
            },
        ]),
    ]
})
export class StoresModule { }
