import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
// import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
    declarations: [StatsComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        // NgxChartsModule
    ]
})
export class StatsModule { }
