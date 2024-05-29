import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
    declarations: [ShoppingCartComponent],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
    ]
})
export class ShoppingCartModule { }
