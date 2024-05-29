import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { AddStoreComponent } from '../add-store/add-store.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent implements OnInit{

    constructor(private router: Router, private route: ActivatedRoute, private dialogService: DialogControllerService) { }

    shopLocation: string = "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17093.567788168126!2d30.49348185056919!3d50.441583937372336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce86098b6587%3A0x266d22c2cee60d05!2z0JDQotCRLdCc0LDRgNC60LXRgg!5e0!3m2!1suk!2sua!4v1715603453839!5m2!1suk!2sua\" width=\"300\" height=\"225\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"

    storeName = "";
    currentPage = 1;
    routeUsername = "guest";

    isGuest = this.routeUsername == "guest" ? true : false;
    isAdmin = this.routeUsername == "admin" ? true : false;

    backIcon = IconEnum.BackIcon;
    cartIcon = IconEnum.ShoppingCartIcon;
    addIcon = IconEnum.AddProductIcon;
    homeIcon = IconEnum.HomeIcon;

    mockStores: StoreApiInterface[] = [
        { store_id: 1, name: "Store 1", location: this.shopLocation, address: "Beresteiskyi Ave, 18, Kyiv, 01135" },
        { store_id: 2, name: "Store 2", location: this.shopLocation, address: "Polkovnyka Potjekhina St, 2, Kyiv, 02000" },
        { store_id: 3, name: "Store 3", location: this.shopLocation, address: "Address 3" },
        { store_id: 4, name: "Store 4", location: this.shopLocation, address: "Address 4" },
        { store_id: 5, name: "Store 5", location: this.shopLocation, address: "Address 5" },
        { store_id: 6, name: "Store 6", location: this.shopLocation, address: "Address 6" },
        { store_id: 7, name: "Store 7", location: this.shopLocation, address: "Address 7" },
        { store_id: 8, name: "Store 8", location: this.shopLocation, address: "Address 8" },
        { store_id: 9, name: "Store 9", location: this.shopLocation, address: "Address 9" },
        { store_id: 10, name: "Store 10", location: this.shopLocation, address: "Address 10" }
    ];

    goToStorePage(store: StoreApiInterface) {
        if(this.routeUsername === "guest") {
            this.router.navigate([routes.features, routes.guest, routes.storeAddresses, this.storeName, routes.storePage, store.store_id], { state: { store } });
        }
        else if(this.routeUsername === "user") {
            this.router.navigate([routes.features, routes.user, routes.storeAddresses, this.storeName, routes.storePage, store.store_id], { state: { store } });
        }
        else {
            this.router.navigate([routes.features, routes.admin, routes.storeAddresses, this.storeName, routes.storePage, store.store_id], { state: { store } });
        }
    }

    goBack() {
        if(this.routeUsername === "guest") {
            this.router.navigate([routes.features, routes.guest]);
        }
        else if(this.routeUsername === "user"){
            this.router.navigate([routes.features, routes.user]);
        }
        else {
            this.router.navigate([routes.features, routes.admin]);
        }
    }

    goHome() {
        this.router.navigate([routes.home]);
    }

    openStoreDialog() {
        this.dialogService.openDialog(AddStoreComponent, "", DialogType.center, null, "100%", "360px");
    }

    openCart() {
        this.dialogService.openDialog(ShoppingCartComponent, "", DialogType.bottom, null, '100%', '40%');
    }

    openLists() {
        this.router.navigate([routes.features, routes.user, routes.lists]);
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        // Update your store list based on the new page
    }

    ngOnInit(): void {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state) {
            this.storeName = navigation.extras.state['storeName'];
        } else {
            // Optionally, handle the case where there is no state
            // For example, you might want to retrieve the store name from the route parameters
            this.route.paramMap.subscribe(params => {
                this.storeName = params.get('storeName')!;
            });

            this.getRouteUsernameFromUrl();
        }
    }

    getRouteUsernameFromUrl() {
        const url = this.router.url;
        if(url.includes("guest")) {
            this.routeUsername = "guest";
            this.isGuest = true;
        }
        else if(url.includes("user")){
            this.routeUsername = "user";
        }
        else {
            this.routeUsername = "admin";
            this.isAdmin = true;
        }
    }
}
