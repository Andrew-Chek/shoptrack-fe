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

    constructor(private router: Router) { }

    @Input() user: UserApiInterface = {
        userId: 1,
        username: 'User 1',
        email: 'test.email@com',
        role: 'User',
        token: '',
    };

    backIcon = IconEnum.BackIcon;

    goBack() {
        this.router.navigate([routes.features, routes.user]);
    }

    // ngOnInit(): void {
    //     // const navigation = this.router.getCurrentNavigation();
    //     // if (navigation?.extras?.state) {
    //     //     this.user = navigation.extras.state['user'];
    //     // } else {
    //     //     // Optionally, handle the case where there is no state
    //     //     // For example, you might want to retrieve the store name from the route parameters
    //     //     this.route.paramMap.subscribe(params => {
    //     //         this.user = JSON.parse(params.get('user')!);
    //     //     });
    //     // }
    // }

}
