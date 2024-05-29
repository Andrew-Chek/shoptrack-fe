import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddListComponent } from './add-list.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [AddListComponent],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
        FormsModule
    ]
})
export class AddListModule { }
