import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'app/core/constants/routes.const';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    title = 'ShopTrack';
    signinButtonText = 'Sign In';
    signupButtonText = 'Sign Up';
    guestButtonText = 'Enter as Guest';

    constructor(private router: Router) {}

    enterAsGuest() {
        localStorage.setItem('guest', 'true');
        this.router.navigate([routes.home, routes.auth, routes.guest]);
    }

    moveToSignin() {
        this.router.navigate([routes.home, routes.auth, routes.signin]);
    }

    moveToSignup() {
        this.router.navigate([routes.home, routes.auth, routes.signup]);
    }
}
