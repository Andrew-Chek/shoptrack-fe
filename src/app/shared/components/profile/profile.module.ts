import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { IonicModule } from '@ionic/angular';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    IonicModule,
    AngularSvgIconModule,
    RouterModule.forChild([
        {
            path: '',
            component: ProfileComponent,
        }
    ])
  ]
})
export class ProfileModule { }
