import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, AngularSvgIconModule],
    exports: [CheckboxComponent],
})
export class CheckboxModule {}
