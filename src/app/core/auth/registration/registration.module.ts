import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { SharedModule } from 'app/shared/shared.module';
import { SignUpService } from '@core/services/sign-up.service';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        SharedModule,
        IonicModule,
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
