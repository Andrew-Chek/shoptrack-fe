import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InputModule } from './components/input';
import { ButtonTypeModule } from './components/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from './components/checkbox/checkbox.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        InputModule,
        ButtonTypeModule,
        CheckboxModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        AngularSvgIconModule,
        InputModule,
        ButtonTypeModule,
        CheckboxModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class SharedModule { }
