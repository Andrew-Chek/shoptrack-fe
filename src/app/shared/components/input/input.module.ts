import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, AngularSvgIconModule, FormsModule],
    declarations: [InputComponent],
    exports: [InputComponent],
})
export class InputModule {}
