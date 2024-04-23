import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { SignInService } from '@app/core/services/sign-in.service';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: SignInComponent,
            },
        ]),
    ],
    declarations: [SignInComponent],
    exports: [SignInComponent],
    providers: [SignInService],
})
export class SignInModule {}
