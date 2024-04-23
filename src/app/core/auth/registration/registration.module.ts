import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'app/shared/shared.module';
import { SignUpService } from '@core/services/sign-up.service';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: RegistrationComponent,
            },
        ]),],
    declarations: [RegistrationComponent],
    exports: [RegistrationComponent],
    providers: [SignUpService],
})
export class RegistrationModule {}
