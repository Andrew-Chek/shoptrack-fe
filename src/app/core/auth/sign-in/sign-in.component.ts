import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputStyle, InputType } from 'app/shared/components/input';
import { Router } from '@angular/router';
import { submitTypeButton, primaryButton } from 'app/core/constants/button.const';
import { routes } from 'app/core/constants/routes.const';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SignInService } from 'app/core/services/sign-in.service';
import { IconEnum } from '@core/icons.enum';
import { VaultService } from '@shared/services/storage.service';
import { filter } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
    public readonly buttonType = submitTypeButton;
    public readonly primaryButton = primaryButton;
    public readonly textInput = InputStyle.inputText;
    public readonly textType = InputType.text;
    public readonly passwordType = InputType.password;
    public readonly inputTextUsername = 'Username';
    public readonly inputIconAt = IconEnum.EmailIcon;
    public readonly inputIconLock = IconEnum.LockInputIcon;

    public isLoadingButton$ = this.signInService.isLoadingLoginButton$;

    constructor(public router: Router, public signInService: SignInService, private vaultService: VaultService) {}

    ngOnInit() {
        this.vaultService.removePrevUserFromLocalStorage();
    }

    ngOnDestroy() {
        this.signInService.resetForm();
    }

    public onSubmit(): void {
        const signIn$ = this.signInService.signIn();

        if (signIn$) {
            signIn$.pipe(filter(Boolean), untilDestroyed(this)).subscribe(async res => {
                if(res.user.user.role === 'User')
                    await this.router.navigate([routes.features, routes.user]);
                else if(res.user.user.role === 'Admin')
                    await this.router.navigate([routes.features, routes.admin]);
            });
        }
    }

    public async redirectToRegistrationPage(): Promise<void> {
        await this.router.navigate([routes.home, routes.auth, routes.signup]);
    }

    public async redirectToForgotPasswordPage(): Promise<void> {
        await this.router.navigate([routes.home, routes.auth, routes.forgotPassword]);
    }

    public async redirectToResetPasswordPage(): Promise<void> {
        await this.router.navigate([routes.home, routes.auth, routes.resetPassword]);
    }

    public async redirectToHomePage(): Promise<void> {
        await this.router.navigate([routes.home]);
    }
}
