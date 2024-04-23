import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputStyle, InputType } from '../input';
import { IconEnum } from '@core/icons.enum';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true,
        },
    ],
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() public inputStyle: InputStyle = InputStyle.inputCheck;

    @Input() public inputType: InputType = InputType.check;

    @Input() public inputLabel?: string;

    @Input() public inputName?: string;
    public colorFill = false;

    @Input() public startGlow!: boolean;
    @Output() public valueChange = new EventEmitter<boolean>();

    public checkIcon = IconEnum.CheckOffIcon;

    private innerValue = false;

    private onChange: (val: boolean) => void = () => {};

    private onTouched: () => void = () => {};

    updateValue() {
        this.innerValue = !this.innerValue;
        this.onChange(this.innerValue);
        this.onTouched();
        this.valueChange.emit(this.innerValue);
    }

    get InnerValue(): boolean {
        return this.innerValue;
    }

    writeValue(value: boolean): void {
        this.innerValue = value;
    }

    registerOnChange(fn: (_: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
