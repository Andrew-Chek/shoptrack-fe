import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { AddStoreComponent } from '../add-store/add-store.component';
import { StoreService } from '@app/core/api/store.service';
import { Observable, map } from 'rxjs';
import { slideInOutAnimation } from '@app/shared/animations/slideInOutAnimation';

@Component({
    selector: 'app-stores',
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss'],
    animations: [slideInOutAnimation]
})
export class StoresComponent implements OnInit {

    @HostBinding('@slideInOutAnimation')
    public animatePage = true;

    constructor(private router: Router, private route: ActivatedRoute, private dialogService: DialogControllerService, private storeService: StoreService) { }

    storeName = "";
    currentPage = 1;
    routeUsername = "guest";

    isAdmin = this.routeUsername == "admin" ? true : false;

    backIcon = IconEnum.BackIcon;
    cartIcon = IconEnum.ShoppingCartIcon;
    addIcon = IconEnum.AddProductIcon;
    homeIcon = IconEnum.HomeIcon;
    statsIcon = IconEnum.StatsIcon;

    stores$!: Observable<StoreApiInterface[]>;
    filteredStores$!: Observable<StoreApiInterface[]>;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.storeName = params.get('storeName')!;
        });
        this.stores$ = this.storeService.getStoresByName(this.storeName);
        this.filteredStores$ = this.getStoresByPage(this.stores$, this.currentPage);

        this.getRouteUsernameFromUrl();
    }

    goToStatsPage() {
        this.router.navigate([routes.features, routes.admin, routes.stats, this.storeName]);
    }

    goToStorePage(store: StoreApiInterface) {
        if(this.routeUsername === "guest") {
            this.router.navigate([routes.features, routes.guest, routes.storeAddresses, this.storeName, routes.storePage, store.store_id]);
        }
        else if(this.routeUsername === "user") {
            this.router.navigate([routes.features, routes.user, routes.storeAddresses, this.storeName, routes.storePage, store.store_id]);
        }
        else {
            this.router.navigate([routes.features, routes.admin, routes.storeAddresses, this.storeName, routes.storePage, store.store_id]);
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

    openAddStoreDialog() {
        this.dialogService.openDialog(AddStoreComponent, "", DialogType.center, null, "100%", "360px");

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if (result) {
                this.stores$ = this.storeService.getStoresByName(this.storeName);
                this.filteredStores$ = this.getStoresByPage(this.stores$, this.currentPage);
            }
        });
    }

    onStoresChanged() {
        this.stores$ = this.storeService.getStoresByName(this.storeName);
        this.filteredStores$ = this.getStoresByPage(this.stores$, this.currentPage);
    }

    openCart() {
        this.dialogService.openDialog(ShoppingCartComponent, "", DialogType.bottom, null, '100%', '40%');
    }

    openLists() {
        this.router.navigate([routes.features, routes.user, routes.lists]);
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        this.filteredStores$ = this.getStoresByPage(this.stores$, this.currentPage);
    }

    getStoresByPage(stores$: Observable<StoreApiInterface[]>, page: number): Observable<StoreApiInterface[]> {
        return stores$.pipe(map(stores => stores.slice((page - 1) * 5, page * 5)));
    }

    getRouteUsernameFromUrl() {
        const url = this.router.url;
        if(url.includes("guest")) {
            this.routeUsername = "guest";
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
