import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ButtonTheme, ButtonType } from 'app/shared/components/button';
import { InputStyle, InputType } from 'app/shared/components/input';
import { Router } from '@angular/router';
import { routes } from 'app/core/constants/routes.const';
import { Validation } from 'app/core/enums/validation.enum';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { ForgotPassword } from 'app/store/auth/auth.action';
import { OnDestroy } from '@angular/core';
import { IconEnum } from '@core/icons.enum';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnDestroy {
    public readonly inputIconAt = IconEnum.EmailIcon;
    public readonly inputTextEmail = 'Email';
    public readonly textType = InputType.text;
    public readonly inputIconLock = IconEnum.LockInputIcon;
    public readonly textInput = InputStyle.inputText;
    public readonly buttonType = ButtonType.submit;
    public readonly primaryButton = ButtonTheme.primary;
    public readonly forgotIcon = IconEnum.ForgotpasswordIcon;

    public email = new FormControl('', [Validators.required, Validators.email]);
    private destroy$: Subject<boolean> = new Subject<boolean>();
    public constructor(public router: Router, public store: Store) {}

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public forgotpassForm = new FormGroup({
        email: this.email,
    });
    public onSubmit(): void {
        if (this.forgotpassForm.valid) {
            const payload = {
                email: this.forgotpassForm.controls.email.value || '',
            };
            this.store
                .dispatch(new ForgotPassword(payload))
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.router.navigate([routes.home, routes.auth, routes.resetPassword]);
                });
        }
    }

    public redirectToLoginPage(): void {
        this.router.navigate([routes.home, routes.auth, routes.signin]);
    }

    public get isValidEmail(): boolean {
        return this.email.status === Validation.Valid;
    }
    public get isValidControl(): boolean {
        return this.forgotpassForm.invalid;
    }
}
