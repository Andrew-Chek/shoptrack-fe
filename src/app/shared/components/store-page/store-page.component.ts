import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { Observable, concatMap, map, tap, of } from 'rxjs';
import { StoreService } from '@app/core/api/store.service';
import { slideInOutAnimation } from '@app/shared/animations/slideInOutAnimation';
@Component({
    selector: 'app-store-page',
    templateUrl: './store-page.component.html',
    styleUrls: ['./store-page.component.scss'],
    animations: [slideInOutAnimation]
})
export class StorePageComponent implements OnInit {

    @HostBinding('@slideInOutAnimation')
    animatePage = true;

    @ViewChild('inputElem')
    inputElem!: ElementRef<HTMLInputElement>;

    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        private dialogService: DialogControllerService,
        private storeService: StoreService
    ) { }

    backIcon = IconEnum.BackIcon;
    cartIcon = IconEnum.ShoppingCartIcon;
    addProductIcon = IconEnum.AddProductIcon;
    routeUsername = "guest";

    store$!: Observable<StoreApiInterface>;

    storeName: string | null = null;
    totalPages = 0;
    filteredProducts$!: Observable<ProductApiInterface[]>;
    cart: ProductApiInterface[] = [];
    currentPage: number = 1;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.storeName = params.get('storeName');
            this.store$ = this.storeService.getStoreById(params.get('store_id')!);
            const products$ = this.store$.pipe(map(store => store.products));
            this.filteredProducts$ = this.getProductsByPage(products$, this.currentPage);
            this.getTotalPages(products$);
        });

        this.getRouteUsernameFromUrl();
    }

    getTotalPages(products$: Observable<ProductApiInterface[]>) {
        products$.pipe(
            tap(products => {
                this.totalPages = Math.ceil(products.length / 5)
        })).subscribe();
    }

    getProductsByPage(products$: Observable<ProductApiInterface[]>, page: number) {
        return products$.pipe(
            map(products => products.slice((page - 1) * 5, page * 5))
        );
    }

    addToCart(product: ProductApiInterface) {
        this.cart.push(product);
        console.log('Cart:', this.cart);
    }

    openLists() {
        this.router.navigate([routes.features, routes.user, routes.lists]);
    }

    goBack() {
        if(this.routeUsername === 'guest')
            this.router.navigate([routes.features, routes.guest, routes.storeAddresses, this.storeName]);
        else if(this.routeUsername === 'admin')
            this.router.navigate([routes.features, routes.admin, routes.storeAddresses, this.storeName]);
        else
            this.router.navigate([routes.features, routes.user, routes.storeAddresses, this.storeName]);
    }

    openCart() {
        this.dialogService.openDialog(ShoppingCartComponent, "", DialogType.bottom, null, '100%', '40%');
    }

    openProductDialog() {
        const storeId = this.route.snapshot.paramMap.get('store_id')!;

        this.dialogService.openDialog(AddProductComponent, "", DialogType.center, { store_id: storeId }, '100%', '485px');

        this.dialogService.dialogRef.onClose.subscribe((result: boolean) => {
            if(result) {
                this.onProductsChanged();
            }
        });
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        const products$ = this.store$.pipe(map(store => store.products));
        this.filteredProducts$ = this.getProductsByPage(products$, this.currentPage);
    }

    searchProducts() {
        if(this.inputElem.nativeElement.value === '') {
            const products$ = this.store$.pipe(map(store => store.products));
            this.currentPage = 1;
            this.getTotalPages(products$);
            this.filteredProducts$ = this.getProductsByPage(products$, this.currentPage);
            return;
        }
        else {
            const searchedProducts$ = this.store$.pipe(
                map(store => store.products.filter(product => 
                    product.name.toLowerCase().includes(this.inputElem.nativeElement.value.toLowerCase())
                )));
            this.currentPage = 1;
            this.getTotalPages(searchedProducts$);
            console.log('Total Pages:', this.totalPages);
            this.filteredProducts$ = this.getProductsByPage(searchedProducts$, this.currentPage);
        }
    }

    onProductsChanged() {
        const id = this.route.snapshot.paramMap.get('store_id')!;

        this.storeService.getStoreById(id).pipe(
            concatMap(store => {
                this.totalPages = Math.ceil(store.products.length / 5);
                return this.storeService.getStoreById(id).pipe(map(store => store.products));
            })
        ).subscribe(products => {
            this.filteredProducts$ = this.getProductsByPage(of(products), this.currentPage);
        });
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
        }
    }
}
