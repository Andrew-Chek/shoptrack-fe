import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreCardComponent } from './store-card.component';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
    declarations: [StoreCardComponent],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule
    ],
    exports: [StoreCardComponent]
})
export class StoreCardModule { }
