import { ShoppingCartComponent } from './../../shared/components/shopping-cart/shopping-cart.component';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '@app/core/api/store.service';
import { routes } from '@app/core/constants/routes.const';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { slideInOutAnimation } from '@app/shared/animations/slideInOutAnimation';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { GuestCartService } from '@app/shared/services/guest-cart.service';
import { Observable, map } from 'rxjs';


@Component({
    selector: 'app-guest',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss'],
    animations: [slideInOutAnimation]
})
export class GuestComponent {

    @HostBinding('@slideInOutAnimation')
    public animatePage = true;

    constructor(
        private router: Router, 
        private dialogService: DialogControllerService, 
        private storeService: StoreService,
        private guestService: GuestCartService
    ) { }

    storeNames$: Observable<string[]> = this.storeService.getStoreNames();
    currentPage = 1;

    filteredStoreNames$: Observable<string[]> = this.getStoreNamesByPage(this.storeNames$, this.currentPage);

    homeIcon = IconEnum.HomeIcon;
    shopIcon = IconEnum.ShopIcon;
    cartIcon = IconEnum.ShoppingCartIcon;
    moveToTheNextIcon = IconEnum.MoveToTheNextIcon;

    goToStoresPage(storeName: string) {
        this.router.navigate([routes.features, routes.guest, routes.storeAddresses, storeName]);
    }

    goToHomePage() {
        this.guestService.clearCart();
        this.router.navigate([routes.home]);
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        this.filteredStoreNames$ = this.getStoreNamesByPage(this.storeNames$, this.currentPage);
    }

    getStoreNamesByPage(storeNames$: Observable<string[]>, page: number): Observable<string[]> {
        return storeNames$.pipe(map(storeNames => storeNames.slice((page - 1) * 5, page * 5)));
    }

    openCart() {
        this.dialogService.openDialog(ShoppingCartComponent, "", DialogType.bottom, null, '100%', '40%');
    }
}
