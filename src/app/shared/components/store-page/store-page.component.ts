import { DialogControllerService } from '@app/shared/services/dialog-controller.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '@app/core/constants/routes.const';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { StoreApiInterface } from '@app/core/dto/store.api.inteface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.scss'],
})
export class StorePageComponent implements OnInit{

    constructor(private router: Router, private route: ActivatedRoute, private dialogService: DialogControllerService) { }

    backIcon = IconEnum.BackIcon;
    cartIcon = IconEnum.ShoppingCartIcon;
    addProductIcon = IconEnum.AddProductIcon;
    routeUsername = "guest";
    isGuest: boolean = this.routeUsername === "guest" ? true : false;
    isAdmin: boolean = this.routeUsername === "admin" ? true : false;

    @Input() store: StoreApiInterface = { store_id: 1, name: "Beresteiskyi Ave, 18, Kyiv, 01135", location: '', address: "Polkovnyka Potjekhina St, 2, Kyiv, 02000" };

    storeName: string | null = null;
    products: ProductApiInterface[] = [
        { product_id: 1, name: 'KitKat', price: 35, description: 'Delicious chocolate wafer', store_id: 1 },
        { product_id: 2, name: 'Oranges', price: 77, description: 'Fresh and juicy oranges', store_id: 1 },
        // Add more products as needed
    ];
    filteredProducts = this.products;
    cart: ProductApiInterface[] = [];
    searchTerm: string = '';
    currentPage: number = 1;
    totalPages: number = Math.ceil(this.products.length / 10);

    ngOnInit(): void {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state) {
            this.storeName = navigation.extras.state['storeName'];
        } else {
            this.route.paramMap.subscribe(params => {
                this.storeName = params.get('storeName');
            });
        }

        this.getRouteUsernameFromUrl();
    }

    addToCart(product: ProductApiInterface) {
        this.cart.push(product);
        console.log('Cart:', this.cart);
    }

    openLists() {
        this.router.navigate([routes.features, routes.user, routes.lists]);
    }

    goBack() {
        if(this.isGuest)
            this.router.navigate([routes.features, routes.guest, routes.storeAddresses, this.storeName]);
        else if(this.isAdmin)
            this.router.navigate([routes.features, routes.admin, routes.storeAddresses, this.storeName]);
        else
            this.router.navigate([routes.features, routes.user, routes.storeAddresses, this.storeName]);
    }

    openCart() {
        this.dialogService.openDialog(ShoppingCartComponent, "", DialogType.bottom, null, '100%', '40%');
    }

    openProductDialog() {
        this.dialogService.openDialog(AddProductComponent, "", DialogType.center, null, '100%', '485px');
    }

    onPageChange(newPage: number) {
        this.currentPage = newPage;
        // Update your store list based on the new page
    }

    searchProducts() {
        this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    getRouteUsernameFromUrl() {
        const url = this.router.url;
        if(url.includes("guest")) {
            this.routeUsername = "guest";
            this.isGuest = true;
            this.isAdmin = false;
        }
        else if(url.includes("user")){
            this.routeUsername = "user";
        }
        else {
            this.routeUsername = "admin";
            this.isAdmin = true;
            this.isGuest = false;
        }

        console.log('Route username:', this.routeUsername);
    }
}
