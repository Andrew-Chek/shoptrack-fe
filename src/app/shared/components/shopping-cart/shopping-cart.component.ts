import { DialogControllerService } from './../../services/dialog-controller.service';
import { Component, OnInit } from '@angular/core';
import { ProductApiInterface } from '@app/core/dto/product.api.interface';
import { DialogType } from '@app/core/enums/dialog-type.enum';
import { IconEnum } from '@app/core/icons.enum';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {

    constructor(private dialogservice: DialogControllerService) { }

    closeIcon = IconEnum.CloseIcon;

    products: ProductApiInterface[] = [
        { product_id: 1, name: 'KitKat', price: 35, description: 'Description 1', store_id: 1},
        { product_id: 2, name: 'Oranges', price: 77, description: 'Description 2', store_id: 1},
        // Add more products as needed
    ];

    productValues = this.products.map(product => {
        return {
            product: product,
            quantity: 1,
        };
    });

    getTotalPrice() {
        return this.productValues.reduce((acc, product) => {
            return acc + product.product.price * product.quantity;
        }, 0);
    }

    closeDialog() {
        this.dialogservice.dialogRef.close();
    }
}
