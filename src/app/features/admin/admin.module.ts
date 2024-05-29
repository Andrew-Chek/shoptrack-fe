import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'primeng/api';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StatsModule } from './components/stats/stats.module';



@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        AngularSvgIconModule,
        RouterModule.forChild([
            {
                path: 'store-addresses/:storeName',
                loadChildren: () => import('../../shared/components/stores/stores.module').then(m => m.StoresModule),
            },
            {
                path: routes.profile,
                loadChildren: () => import('../../shared/components/profile/profile.module').then(m => m.ProfileModule),
            },
            // {
            //     path: routes.stats,
            //     loadChildren: () => import('./components/stats/stats.module').then(m => m.StatsModule),
            // }
        ]),
    ]
})
export class AdminModule { }
