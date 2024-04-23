import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Constance
import { routes } from 'app/core/constants/routes.const';


export const routings: Routes = [
    {
        path: routes.signin,
        loadChildren: () => import('app/core/auth/sign-in/sign-in.module').then(mod => mod.SignInModule),
    },
    {
        path: routes.signup,
        loadChildren: () =>
            import('app/core/auth/registration/registration.module').then(mod => mod.RegistrationModule),
    },
    {
        path: routes.forgotPassword,
        loadChildren: () =>
            import('app/core/auth/forgotpassword/forgotpassword.module').then(mod => mod.ForgotPasswordModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routings)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
