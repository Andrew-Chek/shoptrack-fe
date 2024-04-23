import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconEnum } from '@core/icons.enum';
import { InputStyle } from './inputStyle.enum';
import { InputType } from './inputType.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input() public inputStyle: InputStyle = InputStyle.inputText;

    @Input() public inputType: InputType = InputType.text;

    @Input() public inputLabel?: string;

    @Input() public inputPlaceholder?: string;

    @Input() public inputDisabled!: boolean;

    @Input() public inputErrorMessage?: string;

    @Input() public inputIcon?: IconEnum;

    @Input() public inputValue!: string | number;

    @Input() public inputValid?: boolean;

    @Input() public inputName?: string;

    @Input() public checkboxChecked!: boolean;

    @Input() public enableFormControl = true;

    @Output() inChange = new EventEmitter();

    @ViewChild('input', { read: ElementRef<HTMLInputElement>, static: true })
    public input!: ElementRef<HTMLInputElement>;

    public eyeIcon$ = new BehaviorSubject(IconEnum.EyeSlashIcon);

    public password!: string;

    public currentName?: string;

    public readonly inputRadio = InputStyle.inputRadio;

    public readonly inputCheck = InputStyle.inputCheck;

    public readonly inputSwitch = InputStyle.inputSwitch;

    public readonly inputText = InputStyle.inputText;

    public readonly type = InputType;

    public value: string | undefined;

    public showPlaceholder = true;

    private hidePassword = true;

    constructor(private readonly changeDetector: ChangeDetectorRef) {}

    ngOnInit() {
        if (this.inputPlaceholder) {
            this.inputPlaceholder!.length <= 1 && (this.showPlaceholder = false);
        }
        this.password = this.inputType;
        this.inputName ? (this.currentName = this.inputName || this.inputLabel) : this.currentName;

        if (!this.inputValue) {
            if (this.value) {
                this.inputValue = this.value;
                this.writeValue(this.inputValue);
            } else {
                this.inputValue = '';
                this.writeValue('');
            }
        }

        this.writeValue(this.inputValue as string);
    }

    get hasInputIcon(): boolean {
        return !!this.inputIcon;
    }

    get isTypeNumber(): boolean {
        return this.inputType === InputType.number;
    }

    public onChange!: (value: string | boolean) => void;
    public onTouched!: (value: string) => void;

    public onInputValueChange(event: Event): void {
        const targetDivElement = event.target as HTMLInputElement;
        const value = targetDivElement.value;
        this.inChange.emit(value);
        this.onChange(value);
    }

    public updateAmountControl() {
        this.onChange(this.value as string);
    }

    public writeValue(value: string): void {
        this.value = value;
        this.changeDetector.detectChanges();
    }

    public registerOnChange(fn: (value: string | boolean) => void): void {
        if (this.enableFormControl) {
            this.onChange = fn;
        }
    }

    public registerOnTouched(fn: (value: string) => void): void {
        if (this.enableFormControl) {
            this.onTouched = fn;
        }
    }

    public toggleEyeIcon() {
        this.hidePassword = !this.hidePassword;
        if (!this.hidePassword) {
            this.eyeIcon$.next(IconEnum.EyeIcon);
            this.inputType = InputType.text;
        } else {
            this.eyeIcon$.next(IconEnum.EyeSlashIcon);
            this.inputType = InputType.password;
        }
    }
}
