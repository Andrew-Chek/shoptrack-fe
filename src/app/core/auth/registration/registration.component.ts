import { Component, OnDestroy } from '@angular/core';
import { InputStyle, InputType } from '../../../shared/components/input';
import { secondaryButton, submitTypeButton } from 'app/core/constants/button.const';
import { Router } from '@angular/router';
import { routes } from 'app/core/constants/routes.const';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IconEnum } from '@core/icons.enum';
import { SignUpService } from '@core/services/sign-up.service';
import { StoreService } from '@app/core/api/store.service';

@UntilDestroy()
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnDestroy {
    //Page input
    public readonly textType = InputType.text;
    public readonly checkType = InputType.check;
    public readonly passwordType = InputType.password;
    public readonly textInput = InputStyle.inputText;
    public readonly checkInput = InputStyle.inputCheck;
    public readonly inputTextUsername = 'Username';
    public readonly inputTextEmail = 'Email';
    public readonly inputIconAt = IconEnum.EmailIcon;
    public readonly inputIconLock = IconEnum.LockInputIcon;

    //Page button
    public readonly buttonType = submitTypeButton;
    public readonly primaryButton = secondaryButton;
    public readonly radioInput = InputStyle.inputRadio;
    public readonly switchInput = InputStyle.inputSwitch;

    public storeNames$ = this.storeService.getStoreNames();

    public isLoadingSignUpButton = false;

    constructor(
        public router: Router, 
        public signUpService: SignUpService,
        public storeService: StoreService
    ) {}

    public ngOnDestroy(): void {
        this.signUpService.resetForm();
    }

    /* Getters */
    public get isLoadingSignupButton(): boolean {
        return this.signUpService.isLoadingSignupButton;
    }

    /* Methods */
    public onSubmit(): void {
        const signUp$ = this.signUpService.signUp();

        if (signUp$) {
            signUp$.pipe(untilDestroyed(this)).subscribe(async () => {
                await this.router.navigate([routes.home, routes.auth, routes.signin]);
            });
        }
    }

    public async redirectToLoginPage(): Promise<void> {
        await this.router.navigate([routes.home, routes.auth, routes.signin]);
    }
}
