import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ButtonTheme } from './buttonTheme.enum';
import { ButtonType } from './buttonType.enum';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    @Input()
    public href!: string;

    @Input()
    public buttonTheme: ButtonTheme = ButtonTheme.primary;

    @Input()
    public buttonText = '';

    @Input()
    public buttonType: ButtonType = ButtonType.button;

    @Input()
    public buttonDisabled!: boolean;

    @Input()
    public buttonIconLeft!: string;

    @Input()
    public buttonIconRight!: string;

    @Input()
    public isLoading: boolean | null = false;

    public readonly primaryButton = ButtonTheme.primary;
    public readonly secondaryButton = ButtonTheme.secondary;
    public readonly flatButton = ButtonTheme.flat;
    public readonly alertButton = ButtonTheme.alert;
    public readonly alertSecondaryButton = ButtonTheme.alertSecondary;
}
