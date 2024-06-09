import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { inputValidation } from '@core/enums/inputValueValid.enum';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Store } from '@ngxs/store';
import { ToasterService } from '@shared/services/toaster.service';
import { Registration } from '@store/auth/auth.action';
import { RegistrationParams } from '@store/auth/auth.model';
import { Observable, catchError, of, finalize, BehaviorSubject, combineLatest } from 'rxjs';

@UntilDestroy()
@Injectable()
export class SignUpService {
    public isLoadingSignupButton = false;

    public signUpForm!: FormGroup<{ 
        password: FormControl; 
        username: FormControl; 
        email: FormControl; 
        checkBox: FormControl;
        store: FormControl;
    }>;

    private usernameErrorMessage = new BehaviorSubject<string>('');

    private emailErrorMessage = new BehaviorSubject<string>('');

    private passwordErrorMessage = new BehaviorSubject<string>('');

    public usernameErrorMessage$ = this.usernameErrorMessage.asObservable();

    public emailErrorMessage$ = this.emailErrorMessage.asObservable();

    public passwordErrorMessage$ = this.passwordErrorMessage.asObservable();

    public shouldPulse$ = new BehaviorSubject<boolean>(false);

    constructor(private fb: NonNullableFormBuilder, private store: Store, private toasterService: ToasterService) {
        this.initialize();

        this.initErrorMonitoring();

        // this.initCheckboxPulseMonitoring();
    }

    /* Getters */
    public get isValidForm(): boolean {
        return this.signUpForm.invalid;
    }

    public get isValidPassword(): boolean {
        return this.passwordControl.status === inputValidation.VALID;
    }

    public get isValidUsername(): boolean {
        return this.usernameControl.status === inputValidation.VALID;
    }

    public get isValidEmail(): boolean {
        return this.emailControl.status === inputValidation.VALID;
    }

    private get usernameControl(): FormControl {
        return this.signUpForm.controls.username;
    }

    private get emailControl(): FormControl {
        return this.signUpForm.controls.email;
    }

    private get passwordControl(): FormControl {
        return this.signUpForm.controls.password;
    }

    private get storeControl(): FormControl {
        return this.signUpForm.controls.store;
    }

    /* Methods */
    public resetForm(): void {
        this.signUpForm.reset();
    }

    public signUp(): Observable<any> | void {
        if (this.signUpForm.invalid) {
            this.toasterService.showToaster('Invalid data in form.');
            return;
        }

        this.isLoadingSignupButton = true;
        const payload: RegistrationParams = {
            username: this.signUpForm.controls.username.value?.toLowerCase().trim(),
            email: this.signUpForm.controls.email.value?.toLowerCase().trim(),
            password: this.signUpForm.controls.password.value?.trim(),
            roleId: this.signUpForm.controls.checkBox.value ? 1 : 2,
            storeName: this.signUpForm.controls.store.value,
        };

        return this.store.dispatch(new Registration(payload)).pipe(
            catchError((error: Error) => {
                console.error('Error in registration', error);
                this.toasterService.showToaster('Something went wrong.');
                return of(error);
            }),
            finalize(() => {
                this.isLoadingSignupButton = false;
                this.signUpForm.reset();
            })
        );
    }

    public onCheckBoxChange(value: boolean): void {
        this.signUpForm.controls.checkBox.setValue(value);
    }

    private initialize(): void {
        this.signUpForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[^\s]+$/)]],
            checkBox: [false],
            store: [''],
        });
    }

    public getUsernameErrorMessage(control: FormControl): string {
        let message = '';

        if (control.hasError('required')) {
            message = 'Username is required';
        }

        if (control.hasError('minlength')) {
            message = 'Username must be at least 6 symbols long';
        }

        return message;
    }
    
    public getEmailErrorMessage(control: FormControl): string {
        let message = '';

        if (control.hasError('required')) {
            message = 'Email is required';
        }

        if (control.hasError('email')) {
            message = 'Please enter a valid email';
        }

        return message;
    }

    public getPasswordErrorMessage(control: FormControl): string {
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
        this.monitorControlStatusChanges(this.usernameControl, this.usernameErrorMessage, this.getUsernameErrorMessage);
        this.monitorControlStatusChanges(this.emailControl, this.emailErrorMessage, this.getEmailErrorMessage);
        this.monitorControlStatusChanges(this.passwordControl, this.passwordErrorMessage, this.getPasswordErrorMessage);
    }
}
