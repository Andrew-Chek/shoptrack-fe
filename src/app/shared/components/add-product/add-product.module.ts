import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddProductComponent } from './add-product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [AddProductComponent],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule
    ]
})
export class AddProductModule { }
