import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStoreComponent } from './add-store.component';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [AddStoreComponent],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
        ReactiveFormsModule
    ]
})
export class AddStoreModule { }
