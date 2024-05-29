import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [ListsComponent],
    imports: [
        CommonModule,
        IonicModule,
        AngularSvgIconModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListsComponent
            }
        ])
    ]
})
export class ListsModule { }
