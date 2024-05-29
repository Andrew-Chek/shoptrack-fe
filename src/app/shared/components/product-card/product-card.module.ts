import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
    declarations: [ProductCardComponent],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule
    ],
    exports: [ProductCardComponent]
})
export class ProductCardModule { }
