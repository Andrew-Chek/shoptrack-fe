import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/api/auth.service';
import { VaultService } from '@app/shared/services/storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthIntermediateGuard implements CanActivate, CanActivateChild {
    constructor(private vaultService: VaultService, private authService: AuthService) {}

    public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
        // Check if the user is a guest
        const isGuest = this.vaultService.isGuest();

        // If the user is a guest, allow access without authentication
        if (isGuest) {
            return of(true);
        }

        // Check if the user is authenticated
        const isAuthenticated = this.vaultService.getIntermediateToken();

        // If not authenticated, redirect to sign-in
        if (!isAuthenticated) {
            this.authService.redirectToSignIn();
            return of(false);
        }

        return of(true);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(childRoute, state);
    }
}
