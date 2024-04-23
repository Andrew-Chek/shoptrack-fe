import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ForgotPasswordComponent,
            },
        ]),
    ],
    declarations: [ForgotPasswordComponent],
    exports: [ForgotPasswordComponent],
})
export class ForgotPasswordModule {}
