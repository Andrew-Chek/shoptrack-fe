import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { Signin } from 'app/store/auth/auth.action';
import { Store } from '@ngxs/store';
import { ToasterService } from 'app/shared/services/toaster.service';
import { SigninParams } from 'app/store/auth/auth.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { inputValidation } from '@core/enums/inputValueValid.enum';

@UntilDestroy()
@Injectable()
export class SignInService {
    private isLoadingLoginButton = new BehaviorSubject<boolean>(false);

    public isLoadingLoginButton$ = this.isLoadingLoginButton.asObservable();

    public signInForm!: FormGroup<{ password: FormControl; username: FormControl }>;

    private usernameErrorMessage = new BehaviorSubject<string>('');

    private passwordErrorMessage = new BehaviorSubject<string>('');

    public usernameErrorMessage$ = this.usernameErrorMessage.asObservable();

    public passwordErrorMessage$ = this.passwordErrorMessage.asObservable();

    constructor(private fb: FormBuilder, private store: Store, private toasterService: ToasterService) {
        this.initialize();

        this.initErrorMonitoring();
    }

    /* Getters */
    public get isValidForm(): boolean {
        return this.signInForm.invalid;
    }

    public get isValidPassword(): boolean {
        return this.passwordControl.status === inputValidation.VALID;
    }

    public get isValidUsername(): boolean {
        return this.usernameControl.status === inputValidation.VALID;
    }

    private get passwordControl(): FormControl<string> {
        return this.signInForm.controls.password;
    }

    private get usernameControl(): FormControl<string> {
        return this.signInForm.controls.username;
    }

    /* Methods */
    public emitLoadingLoginButton(state: boolean): void {
        this.isLoadingLoginButton.next(state);
    }

    public resetForm(): void {
        this.signInForm.reset();
    }

    public signIn(): Observable<any> | void {
        if (this.signInForm.invalid) {
            this.toasterService.showToaster('Invalid data in form.');
            return;
        }

        this.emitLoadingLoginButton(true);
        const payload: SigninParams = {
            username: this.signInForm.controls.username.value?.toLowerCase().trim(),
            password: this.signInForm.controls.password.value?.trim(),
        };

        return this.store.dispatch(new Signin(payload)).pipe(
            tap(() => this.signInForm.reset()),
            catchError((error: Error) => {
                this.toasterService.showToaster(error.message);
                this.emitLoadingLoginButton(false);
                this.resetIfError(error);
                return of(error);
            }),
            finalize(() => {
                this.emitLoadingLoginButton(false);
            })
        );
    }

    private resetIfError(error: Error) {
        if (this.checkErrorMessageContents(error, 'password')) {
            this.resetControlOnError(this.passwordControl, 'password', 'wrongPassword');
        }

        if (this.checkErrorMessageContents(error, 'username')) {
            this.resetControlOnError(this.usernameControl, 'username', 'nonexistingUsername');
        }
    }

    /** START RESET HELPERS */
    private checkErrorMessageContents(error: Error, key: 'password' | 'username') {
        return error.message.toLowerCase().includes(key);
    }

    private resetControlOnError(control: FormControl<string>, controlName: 'password' | 'username', error: string) {
        this.signInForm.reset({ ...this.signInForm.value, [controlName]: '' });
        control.markAsTouched();
        control.markAsDirty();
        control.setErrors({ [error]: true });
    }
    /**END RESET HELPERS */

    private initialize(): void {

        this.signInForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[^\s]+$/)]],
        });
    }

    private getUsernameErrorMessage(control: FormControl): string {
        let message = '';

        if (control.hasError('required')) {
            message = 'Username is required';
        }

        if (control.hasError('username')) {
            message = 'Please enter a valid username';
        }

        if (control.hasError('nonexistingUsername')) {
            message = "Username doesn't exist";
        }

        return message;
    }

    private getPasswordErrorMessage(control: FormControl): string {
        let message = '';

        if (control.hasError('required')) {
            message = 'Password is required';
        }

        if (control.hasError('minlength')) {
            message = 'Password must be at least 4 symbols long';
        }

        if (control.hasError('pattern')) {
            message = 'Password should not contain spaces';
        }

        if (control.hasError('wrongPassword')) {
            message = 'Wrong password';
        }

        return message;
    }

    private monitorControlStatusChanges<T extends FormControl>(
        control: T,
        field: BehaviorSubject<string>,
        errorMessagefn: (control: T) => string
    ): void {
        control.statusChanges.pipe(untilDestroyed(this)).subscribe(status => {
            if (!control.touched && control.value) {
                control.markAsTouched();
            }
            if (status === inputValidation.INVALID) {
                field.next(errorMessagefn(control));
            }
        });
    }

    private initErrorMonitoring(): void {
        this.monitorControlStatusChanges(
            this.signInForm.controls.username,
            this.usernameErrorMessage,
            this.getUsernameErrorMessage
        );
        this.monitorControlStatusChanges(
            this.signInForm.controls.password,
            this.passwordErrorMessage,
            this.getPasswordErrorMessage
        );
    }
}
