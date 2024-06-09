import { ListService } from '@app/core/api/list.service';
import { DialogControllerService } from './../../services/dialog-controller.service';
import { Component, OnInit } from '@angular/core';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { IconEnum } from '@app/core/icons.enum';
import { GuestCartService } from '@app/shared/services/guest-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {

    constructor(
        private dialogservice: DialogControllerService,
        private guestCartService: GuestCartService,
        private dialogService: DialogControllerService,
        private listService: ListService,
    ) { }

    isUser = this.dialogService.dialogConfig.data.isUser;
    list = this.dialogService.dialogConfig.data.list;

    closeIcon = IconEnum.CloseIcon;
    removeIcon = IconEnum.RemoveIcon;

    products: ProductApiInterface[] = this.isUser ? this.list.products : this.guestCartService.getProducts();

    getTotalPrice() {
        return this.guestCartService.getTotalPrice(this.products);
    }

    removeFromCart(product: ProductApiInterface) {
        if(this.isUser) {
            this.listService.removeProductFromList(this.list, product.product_id).subscribe();
            this.products = this.products.filter(p => p.product_id !== product.product_id);
        }
        else {
            this.guestCartService.removeProduct(product);
            this.products = this.guestCartService.getProducts();
        }
    }

    closeDialog() {
        this.dialogservice.dialogRef.close();
    }
}
