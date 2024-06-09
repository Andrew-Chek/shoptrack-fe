import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
    declarations: [StatsComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        NgxChartsModule,
        AngularSvgIconModule,
        RouterModule.forChild([
            {
                path: '',
                component: StatsComponent
            }
        ])
    ]
})
export class StatsModule { }
