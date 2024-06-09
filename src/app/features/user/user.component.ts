import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '@app/core/api/store.service';
import { routes } from '@app/core/constants/routes.const';
import { UserApiInterface } from '@app/core/dto/signin.api.interface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { slideInOutAnimation } from '@app/shared/animations/slideInOutAnimation';
import { ShoppingCartComponent } from '@app/shared/components/shopping-cart/shopping-cart.component';
import { WarningDialogComponent } from '@app/shared/components/warning-dialog/warning-dialog.component';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { LogoutUser } from '@app/store/user/user.action';
import { Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [slideInOutAnimation]
})
export class UserComponent {

    @HostBinding('@slideInOutAnimation')
    public animatePage = true;

    constructor(
        private router: Router, 
        private dialogService: DialogControllerService, 
        private storeService: StoreService,
        private store: Store) { }

    public user: UserApiInterface = this.store.selectSnapshot(state => state.user.user);

    locationProvided: boolean = false;

    storeNames$: Observable<string[]> = this.storeService.getStoreNames();
    currentPage = 1;
    filteredStoreNames$: Observable<string[]> = this.getStoreNamesByPage(this.storeNames$, this.currentPage);

    homeIcon = IconEnum.HomeIcon;
    shopIcon = IconEnum.ShopIcon;
    cartIcon = IconEnum.ShoppingCartIcon;
    locationXmarkIcon = IconEnum.LocationXmarkIcon;
    locationCheckIcon = IconEnum.LocationCheckIcon;
    profileIcon = IconEnum.ProfileIcon;
    moveToTheNextIcon = IconEnum.MoveToTheNextIcon;

    goToStoresPage(storeName: string) {
        this.router.navigate([routes.features, routes.user, routes.storeAddresses, storeName], { state: { storeName: storeName, isUser: true }});
    }

    goToHomePage() {
        this.store.dispatch(new LogoutUser());
        this.router.navigate([routes.home]);
    }

    goToProfile() {
        this.router.navigate([routes.features, routes.user, routes.profile], { state: this.user });
    }

    provideLocation() {
        const message = !this.locationProvided 
            ? "The location will be shared in order to provide notifications. Are you sure?" 
            : "The location will not be shared anymore. Are you sure?";
        this.dialogService.openDialog(WarningDialogComponent, "", DialogType.center, { message, locationProvided: this.locationProvided });
        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if (result) {
                this.locationProvided = !this.locationProvided;
            } else {
                this.locationProvided = this.locationProvided;
            }
        });
    }

    getStoreNamesByPage(storeNames$: Observable<string[]>, page: number): Observable<string[]> {
        return storeNames$.pipe(map(storeNames => storeNames.slice((page - 1) * 5, page * 5)));
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        this.filteredStoreNames$ = this.getStoreNamesByPage(this.storeNames$, this.currentPage);
    }

    openLists() {
        this.router.navigate([routes.features, routes.user, routes.lists]);
    }
}
