import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';

const routings: Routes = [
    {
        path: routes.admin,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    },
    {
        path: routes.user,
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    },
    {
        path: routes.guest,
        loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule),
    }
];

@NgModule({
  imports: [RouterModule.forChild(routings)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
