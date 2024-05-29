import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseListDialogComponent } from './choose-list-dialog.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [ChooseListDialogComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [ChooseListDialogComponent]
})
export class ChooseListDialogModule { }
