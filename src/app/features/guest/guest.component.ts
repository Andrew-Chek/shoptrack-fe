import { ShoppingCartComponent } from './../../shared/components/shopping-cart/shopping-cart.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';


@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent {

    constructor(private router: Router, private dialogService: DialogControllerService) { }

    mockStoreNames: string[] = ["ATB Market", "Silpo", "Eco Market", "Metro", "Auchan", "Billa", "Fozzy", "Fora", "Velyka Kyshenya", "Novus"];
    currentPage = 1;

    homeIcon = IconEnum.HomeIcon;
    shopIcon = IconEnum.ShopIcon;
    cartIcon = IconEnum.ShoppingCartIcon;
    moveToTheNextIcon = IconEnum.MoveToTheNextIcon;

    goToStoresPage(storeName: string) {
        this.router.navigate([routes.features, routes.guest, routes.storeAddresses, storeName], { state: { storeName, isUser: false }});
    }

    goToHomePage() {
        this.router.navigate([routes.home]);
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        // Update your store list based on the new page
    }

    openCart() {
        this.dialogService.openDialog(ShoppingCartComponent, "", DialogType.bottom, null, '100%', '40%');
    }
}
