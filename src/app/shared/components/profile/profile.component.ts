import { Store } from '@ngxs/store';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { UserApiInterface } from '@app/core/dto/signin.api.interface';
import { IconEnum } from '@app/core/icons.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

    constructor(private router: Router, private store: Store) { }

    @Input() user: UserApiInterface = this.store.selectSnapshot(state => state.user.user);;

    backIcon = IconEnum.BackIcon;

    goBack() {
        this.router.navigate([routes.features, routes.user]);
    }
}
