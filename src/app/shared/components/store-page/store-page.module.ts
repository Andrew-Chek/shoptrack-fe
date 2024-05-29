import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCardModule } from '../store-card/store-card.module';
import { IonicModule } from '@ionic/angular';
import { StorePageComponent } from './store-page.component';
import { PaginationModule } from '../pagination/pagination.module';
import { ProductCardModule } from '../product-card/product-card.module';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
    declarations: [StorePageComponent],
    imports: [
        CommonModule,
        StoreCardModule,
        IonicModule,
        PaginationModule,
        ProductCardModule,
        AngularSvgIconModule,
        RouterModule.forChild([
            {
                path: 'store-page/:store_id',
                component: StorePageComponent
            }
        ])
    ]
})
export class StorePageModule { }
