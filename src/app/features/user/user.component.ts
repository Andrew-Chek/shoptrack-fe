import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { UserApiInterface } from '@app/core/dto/signin.api.interface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { ShoppingCartComponent } from '@app/shared/components/shopping-cart/shopping-cart.component';
import { WarningDialogComponent } from '@app/shared/components/warning-dialog/warning-dialog.component';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

    constructor(private router: Router, private dialogService: DialogControllerService) { }

    public user: UserApiInterface = {
        userId: 1,
        username: 'User 1',
        email: 'testmail@gmail.com',
        role: 'User',
        token: '',
    }

    locationProvided: boolean = false;

    mockStoreNames: string[] = ["Store 1", "Store 2", "Store 3", "Store 4", "Store 5", "Store 6", "Store 7", "Store 8", "Store 9", "Store 10"];
    currentPage = 1;

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

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        // Update your store list based on the new page
    }

    openLists() {
        this.router.navigate([routes.features, routes.user, routes.lists]);
    }
}
